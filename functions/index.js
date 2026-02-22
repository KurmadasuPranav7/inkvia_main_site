const admin = require('firebase-admin');
const Razorpay = require('razorpay');
const crypto = require('crypto');

const { onRequest } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');

admin.initializeApp();
const db = admin.firestore();

// 🔐 Secrets
const RAZORPAY_KEY_ID = defineSecret('RAZORPAY_KEY_ID');
const RAZORPAY_KEY_SECRET = defineSecret('RAZORPAY_KEY_SECRET');

/**
 * CREATE RAZORPAY ORDER
 */
exports.createRazorpayOrder = onRequest(
  {
    region: 'asia-south1',
    secrets: [RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET],
    cors: true,
  },
  async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }

      const { orderId } = req.body;
      if (!orderId) {
        return res.status(400).json({ error: 'orderId required' });
      }

      const orderDoc = await db.collection('orders').doc(orderId).get();

      if (!orderDoc.exists) {
        return res.status(404).json({ error: 'Order not found' });
      }

      const { totalAmount } = orderDoc.data();

      const razorpay = new Razorpay({
        key_id: RAZORPAY_KEY_ID.value(),
        key_secret: RAZORPAY_KEY_SECRET.value(),
      });

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100, // convert to paise
        currency: 'INR',
        receipt: orderId,
      });

      res.json(razorpayOrder);

    } catch (err) {
      console.error('Create Order Error:', err);
      res.status(500).json({ error: 'Failed to create Razorpay order' });
    }
  }
);


/**
 * VERIFY PAYMENT
 */
exports.verifyPayment = onRequest(
  {
    region: 'asia-south1',
    secrets: [RAZORPAY_KEY_SECRET],
    cors: true,
  },
  async (req, res) => {
    try {
      if (req.method !== 'POST') {
        return res.status(405).send('Method Not Allowed');
      }

      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        receipt,
      } = req.body;

      if (!receipt) {
        return res.status(400).json({ error: 'receipt required' });
      }

      const body = razorpay_order_id + '|' + razorpay_payment_id;

      const expectedSignature = crypto
        .createHmac('sha256', RAZORPAY_KEY_SECRET.value())
        .update(body)
        .digest('hex');

      if (expectedSignature !== razorpay_signature) {
        return res.status(400).json({ status: 'failed', message: 'Invalid signature' });
      }

      const orderRef = db.collection('orders').doc(receipt);

      await orderRef.update({
        status: 'paid',
        paymentId: razorpay_payment_id,
        paidAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      res.json({ status: 'success' });

    } catch (err) {
      console.error('Verify Payment Error:', err);
      res.status(500).json({ error: 'Verification failed' });
    }
  }
);