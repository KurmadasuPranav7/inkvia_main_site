import React, { useEffect, useState } from 'react';
import ProductCard from '@/components/ProductCard';
import { fetchAllProducts } from '@/lib/FetchProducts';
import { Product, ProductCategory } from '@/types/Product';
import { Grid2X2, Grid3X3, LayoutGrid } from 'lucide-react';

type GridLayout = 2 | 3 | 4;

const categories: { id: ProductCategory; name: string; emoji: string }[] = [
  { id: 'posters', name: 'Posters', emoji: '🖼️' },
  { id: 'stickers', name: 'Stickers', emoji: '✨' },
  { id: 'merch', name: 'Merch', emoji: '👕' },
];

const ShopPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>('posters');
  const [gridLayout, setGridLayout] = useState<GridLayout>(4);

  useEffect(() => {
    fetchAllProducts()
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts = products.filter(
    p => p.category === activeCategory
  );

  const gridClasses = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
  };

  return (
    <div className="min-h-screen pt-8 pb-16 bg-background">
      <div className="container mx-auto px-4 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12 lg:mb-16 animate-slide-up">
          <div className="inline-block sticker bg-comic-red text-white mb-6">
            Shop Collection 🛒
          </div>
          <h1 className="font-comic text-4xl md:text-5xl lg:text-6xl mb-4">
            INKVIA Store
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Premium designs crafted to inspire. Limited edition drops you won't find anywhere else.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-6 py-3 rounded-2xl font-bold text-sm uppercase border-2 border-foreground transition-all ${
                activeCategory === cat.id
                  ? 'bg-comic-yellow shadow-comic scale-105'
                  : 'bg-card hover:bg-secondary shadow-comic-sm'
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.name}
            </button>
          ))}
        </div>

        {/* Product Count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-muted-foreground">
            <span className="font-bold text-foreground">
              {filteredProducts.length}
            </span>{' '}
            products
          </p>

          <div className="flex items-center gap-2 bg-card border-2 border-foreground rounded-xl p-1 shadow-comic-sm">
            {[2, 3, 4].map(n => (
              <button
                key={n}
                onClick={() => setGridLayout(n as GridLayout)}
                className={`p-2 rounded-lg ${
                  gridLayout === n
                    ? 'bg-comic-yellow'
                    : 'text-muted-foreground hover:bg-secondary'
                }`}
              >
                {n === 2 && <Grid2X2 />}
                {n === 3 && <Grid3X3 />}
                {n === 4 && <LayoutGrid />}
              </button>
            ))}
          </div>
        </div>

        {/* Loading */}
        {loading && (
          <p className="text-center py-16 text-muted-foreground">
            Loading products…
          </p>
        )}

        {/* Product Grid */}
        {!loading && (
          <div className={`grid ${gridClasses[gridLayout]} gap-6 lg:gap-8`}>
            {filteredProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredProducts.length === 0 && (
          <div className="text-center py-16">
            <div className="comic-panel inline-block bg-comic-yellow p-8">
              <p className="font-comic text-2xl mb-2">Coming Soon!</p>
              <p className="text-muted-foreground">
                New {activeCategory} dropping soon.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
