'use client';

import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { PRODUCT_TYPES } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ExternalLink, Edit3, Trash2 } from 'lucide-react';
import Image from 'next/image';

interface ProductCardProps {
  product: Product;
  variant?: 'display' | 'editable';
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onClick?: (product: Product) => void;
}

export function ProductCard({ 
  product, 
  variant = 'display',
  onEdit,
  onDelete,
  onClick 
}: ProductCardProps) {
  const productType = PRODUCT_TYPES[product.type];

  const handleCardClick = () => {
    if (variant === 'display' && onClick) {
      onClick(product);
    }
  };

  return (
    <Card 
      className={`product-card group ${variant === 'display' ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden rounded-t-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 text-xs font-medium">
            {productType.icon} {productType.name}
          </div>
        </div>
        
        <div className="p-4">
          <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.name}</h3>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
          
          <div className="flex items-center justify-between">
            <span className="text-xl font-bold text-blue-600">
              {formatPrice(product.price)}
            </span>
            
            {variant === 'display' ? (
              <Button size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                View
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(product);
                  }}
                >
                  <Edit3 className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(product.productId);
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
