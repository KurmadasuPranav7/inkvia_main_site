import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Phone,
  CreditCard,
  Home,
  School,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { toast } from 'sonner';
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  getDoc,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';

type DeliveryOption = 'home' | 'college';

const CREATE_ORDER_URL =
  'https://us-central1-inkvia-b31c1.cloudfunctions.net/createRazorpayOrder';
const VERIFY_PAYMENT_URL =
  'https://us-central1-inkvia-b31c1.cloudfunctions.net/verifyPayment';

const normalizeCartItems = (items: any[]) =>
  items.map((item) => ({
    productId: item.id,
    name: item.title ?? '',
    price: item.price,
    quantity: item.quantity ?? 1,
    image: item.image ?? '',
    size: item.size ?? null,
  }));

const CheckoutPage: React.FC = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deliveryOption, setDeliveryOption] =
    useState<DeliveryOption>('home');

  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState(0);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    collegeName: 'VNRVJIET',
    collegeAddress: 'VNRVJIET, Bachupally, Hyderabad',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  /* =========================
     COUPON VALIDATION
  ========================= */

  const handleApplyCoupon = async () => {
  if (!couponCode.trim()) {
    toast.error('Please enter a coupon code');
    return;
  }

  try {
    const couponRef = doc(db, 'coupons', couponCode.toUpperCase());
    const snap = await getDoc(couponRef);

    if (!snap.exists()) {
      toast.error('Invalid coupon code');
      return;
    }

    const data = snap.data();

    if (!data.isActive) {
      toast.error('Coupon inactive');
      return;
    }

    if (data.expiryDate?.toDate() < new Date()) {
      toast.error('Coupon expired');
      return;
    }

    if (data.usageLimit && data.usedCount >= data.usageLimit) {
      toast.error('Coupon usage limit reached');
      return;
    }

    if (totalPrice < (data.minOrderAmount || 0)) {
      toast.error(`Minimum order ₹${data.minOrderAmount} required`);
      return;
    }

    let discount = 0;

    if (data.type === 'percentage') {
      discount = (totalPrice * data.value) / 100;
      if (data.maxDiscount)
        discount = Math.min(discount, data.maxDiscount);
    } else {
      discount = data.value;
    }

    setCouponDiscount(Math.floor(discount));
    setAppliedCoupon(couponCode.toUpperCase());

    toast.success('Coupon applied!');
  } catch (err) {
    toast.error('Failed to apply coupon');
  }
};

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode('');
    setCouponDiscount(0);
    toast.info('Coupon removed');
  };

  /* =========================
     CALCULATIONS
  ========================= */

  const shippingCost =
    deliveryOption === 'home' && totalPrice < 299 ? 50 : 0;

  const finalTotal =
    totalPrice + shippingCost - couponDiscount;

  /* =========================
     RAZORPAY
  ========================= */

  const openRazorpay = async (orderId: string) => {
    const res = await fetch(CREATE_ORDER_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        orderId,
        amount: finalTotal,
      }),
    });

    const razorpayOrder = await res.json();

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: razorpayOrder.amount,
      currency: 'INR',
      name: 'INKVIA',
      description: 'Order Payment',
      order_id: razorpayOrder.id,

      handler: async (response: any) => {
        await fetch(VERIFY_PAYMENT_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...response,
            receipt: orderId,
          }),
        });

        toast.success('Payment successful!');
        clearCart();
        navigate('/');
      },

      modal: {
        ondismiss: () => {
          toast.info('Payment cancelled');
          setIsSubmitting(false);
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) {
      toast.error('Your cart is empty');
      return;
    }

    setIsSubmitting(true);

    try {
      const deliveryDetails =
        deliveryOption === 'home'
          ? {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              address: formData.address,
              city: formData.city,
              pincode: formData.pincode,
            }
          : {
              name: formData.name,
              phone: formData.phone,
              email: formData.email,
              collegeName: formData.collegeName,
              collegeAddress: formData.collegeAddress,
            };

      const orderRef = await addDoc(
        collection(db, 'orders'),
        {
          items: normalizeCartItems(items),
          subtotal: totalPrice,
          shippingCost,
          discount: couponDiscount,
          totalAmount: finalTotal,
          couponCode: appliedCoupon || null,
          deliveryOption,
          deliveryDetails,
          status: 'pending',
          createdAt: serverTimestamp(),
        }
      );

      await openRazorpay(orderRef.id);
    } catch (err) {
      console.error(err);
      toast.error('Failed to place order');
      setIsSubmitting(false);
    }
  };


  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-8 pb-16 flex items-center justify-center bg-background">
        <div className="text-center comic-panel bg-card p-8">
          <h1 className="font-comic text-2xl text-foreground mb-4">Your cart is empty!</h1>
          <p className="text-muted-foreground mb-6">Add some awesome items to get started.</p>
          <Button variant="default" onClick={() => navigate('/shop')}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <h1 className="font-comic text-3xl lg:text-4xl text-foreground">
            Checkout
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Summary */}
          <div className="comic-panel bg-comic-yellow p-6 h-fit order-2 lg:order-1">
            <h2 className="font-comic text-xl text-foreground mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Order Summary
            </h2>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 comic-panel-sm bg-card p-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-foreground flex-shrink-0">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-sm text-foreground">{item.title}</h3>
                    <p className="text-muted-foreground text-sm">
                      Qty: {item.quantity}
                    </p>
                  </div>
                  <p className="font-comic text-lg text-primary">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>
            <div className="border-t-2 border-foreground mt-4 pt-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-foreground/80">Subtotal</span>
                <span className="font-bold">₹{totalPrice.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-foreground/80">Shipping</span>
                {(deliveryOption === 'home' && totalPrice < 299) ? (
                  <span className="sticker bg-comic-red text-foreground text-xs py-1 px-2">₹50</span>
                ) :( 
                  <span className="sticker bg-comic-mint text-foreground text-xs py-1 px-2">FREE</span>
                )}
              </div>
              <div className="mt-4 pt-4 border-t-2 border-foreground/30">
                <Label className="font-bold flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4" />
                  Coupon Code
                </Label>
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-comic-mint/30 border-2 border-foreground rounded-xl px-4 py-2">
                    <span className="font-bold text-sm text-foreground">{appliedCoupon}</span>
                    <button
                      type="button"
                      onClick={handleRemoveCoupon}
                      className="text-destructive font-bold text-xs hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Enter code"
                      className="flex-1 border-2 border-foreground"
                    />
                    <Button
                      type="button"
                      variant="default"
                      onClick={handleApplyCoupon}
                      className="shrink-0"
                    >
                      Apply
                    </Button>
                  </div>
                )}
              </div>
              
              <div className="flex items-center justify-between text-xl font-bold mt-4 pt-4 border-t-2 border-foreground">
                <span>Total</span>
                <span className="font-comic text-2xl text-primary">₹{finalTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery Form */}
          <form onSubmit={handleSubmit} className="space-y-6 order-1 lg:order-2">
            {/* Delivery Option Selection */}
            <div className="comic-panel bg-card p-6">
              <h2 className="font-comic text-xl text-foreground mb-4">Delivery Option</h2>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setDeliveryOption('home')}
                  className={`p-4 rounded-xl border-2 border-foreground transition-all ${
                    deliveryOption === 'home'
                      ? 'bg-primary text-primary-foreground shadow-comic'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <Home className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-bold text-sm">Home Delivery</span>
                </button>
                <button
                  type="button"
                  onClick={() => setDeliveryOption('college')}
                  className={`p-4 rounded-xl border-2 border-foreground transition-all ${
                    deliveryOption === 'college'
                      ? 'bg-primary text-primary-foreground shadow-comic'
                      : 'bg-secondary hover:bg-secondary/80'
                  }`}
                >
                  <School className="w-6 h-6 mx-auto mb-2" />
                  <span className="font-bold text-sm">College Pickup</span>
                </button>
              </div>
            </div>

            <div className="comic-panel bg-card p-6">
              <h2 className="font-comic text-xl text-foreground mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                {deliveryOption === 'home' ? 'Delivery Details' : 'College Pickup Details'}
              </h2>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name" className="font-bold">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                    className="mt-1 border-2 border-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="font-bold flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+91 9999999999"
                    required
                    className="mt-1 border-2 border-foreground"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="font-bold flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    E-mail
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="example@gmail.com"
                    required
                    className="mt-1 border-2 border-foreground"
                  />
                </div>

                {deliveryOption === 'home' ? (
                  <>
                    <div>
                      <Label htmlFor="address" className="font-bold">Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street address, apartment, etc."
                        required
                        className="mt-1 border-2 border-foreground"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="font-bold">City</Label>
                        <Input
                          id="city"
                          name="city"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="City"
                          required
                          className="mt-1 border-2 border-foreground"
                        />
                      </div>
                      <div>
                        <Label htmlFor="pincode" className="font-bold">Pincode</Label>
                        <Input
                          id="pincode"
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleChange}
                          placeholder="6 digit pincode"
                          required
                          className="mt-1 border-2 border-foreground"
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div>
                      <Label htmlFor="collegeName" className="font-bold">College Name</Label>
                      <Input
                        id="collegeName"
                        name="collegeName"
                        value={formData.collegeName}
                        onChange={handleChange}
                        placeholder="Your college name"
                        required
                        disabled
                        className="mt-1 border-2 border-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="collegeAddress" className="font-bold">College Address</Label>
                      <Input
                        id="collegeAddress"
                        name="collegeAddress"
                        value={formData.collegeAddress}
                        onChange={handleChange}
                        placeholder="College address or city"
                        required
                        disabled
                        className="mt-1 border-2 border-foreground"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="comic"
              size="xl"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Proceed to Payment'}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              Secure payment powered by Razorpay
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
