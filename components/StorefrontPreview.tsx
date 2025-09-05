'use client';

import { Product, StorefrontDesign } from '@/lib/types';
import { ProductCard } from '@/components/ProductCard';
import { COLOR_SCHEMES, DESIGN_THEMES } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface StorefrontPreviewProps {
  products: Product[];
  design: StorefrontDesign;
  storefrontName: string;
  onProductClick?: (product: Product) => void;
}

export function StorefrontPreview({ 
  products, 
  design, 
  storefrontName,
  onProductClick 
}: StorefrontPreviewProps) {
  const theme = DESIGN_THEMES[design.theme];
  const colorScheme = COLOR_SCHEMES[design.colorScheme];

  const getLayoutClasses = () => {
    switch (design.layout) {
      case 'grid':
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
      case 'masonry':
        return 'columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6';
      case 'carousel':
        return 'flex gap-6 overflow-x-auto pb-4';
      default:
        return 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6';
    }
  };

  return (
    <div className={cn('min-h-screen p-6', theme.colors[0])}>
      <div className="max-w-screen-lg mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className={cn(
            'font-bold text-3xl md:text-4xl lg:text-5xl mb-4',
            theme.colors[1]
          )}>
            {storefrontName}
          </h1>
          <div className={cn(
            'w-24 h-1 mx-auto rounded-full bg-gradient-to-r',
            colorScheme.gradient
          )} />
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className={getLayoutClasses()}>
            {products.map((product) => (
              <div 
                key={product.productId}
                className={design.layout === 'masonry' ? 'break-inside-avoid' : ''}
              >
                <ProductCard
                  product={product}
                  variant="display"
                  onClick={onProductClick}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="glass-card p-8 rounded-lg max-w-md mx-auto">
              <h3 className="text-xl font-semibold mb-2">No products yet</h3>
              <p className="text-gray-600">
                Add some products to see your storefront come to life!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
