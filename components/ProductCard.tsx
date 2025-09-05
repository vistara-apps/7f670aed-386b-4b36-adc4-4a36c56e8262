'use client';

import { Product } from '@/lib/types';
import { formatPrice } from '@/lib/utils';
import { PRODUCT_TYPES } from '@/lib/constants';
import { Card, CardContent } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { ProductTypeBadge } from '@/components/ui/Badge';
import { ExternalLink, Edit3, Trash2, Heart, Share2 } from 'lucide-react';
import Image from 'next/image';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  variant?: 'display' | 'editable';
  onEdit?: (product: Product) => void;
  onDelete?: (productId: string) => void;
  onClick?: (product: Product) => void;
  showActions?: boolean;
}

export function ProductCard({ 
  product, 
  variant = 'display',
  onEdit,
  onDelete,
  onClick,
  showActions = true
}: ProductCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleCardClick = () => {
    if (variant === 'display' && onClick) {
      onClick(product);
    }
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: product.link,
      });
    }
  };

  return (
    <Card 
      className={`product-card group animate-fade-in ${variant === 'display' ? 'cursor-pointer' : ''}`}
      onClick={handleCardClick}
    >
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden rounded-t-xl">
          {imageLoading && (
            <div className="absolute inset-0 bg-neutral-200 animate-pulse" />
          )}
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            onLoad={() => setImageLoading(false)}
            onError={() => setImageLoading(false)}
          />
          
          {/* Product Type Badge */}
          <div className="absolute top-3 left-3">
            <ProductTypeBadge type={product.type} />
          </div>
          
          {/* Action Buttons */}
          {showActions && variant === 'display' && (
            <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              <IconButton
                icon={<Heart className={`w-4 h-4 ${isLiked ? 'fill-current text-error-500' : ''}`} />}
                aria-label="Like product"
                variant="secondary"
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={handleLike}
              />
              <IconButton
                icon={<Share2 className="w-4 h-4" />}
                aria-label="Share product"
                variant="secondary"
                size="sm"
                className="bg-white/90 backdrop-blur-sm hover:bg-white"
                onClick={handleShare}
              />
            </div>
          )}
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        
        {/* Content Section */}
        <div className="p-6">
          <div className="mb-4">
            <h3 className="heading-3 mb-2 line-clamp-2 group-hover:text-primary-700 transition-colors">
              {product.name}
            </h3>
            <p className="body-small text-neutral-600 line-clamp-2 mb-3">
              {product.description}
            </p>
          </div>
          
          {/* Price and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-2xl font-bold text-gradient">
                {formatPrice(product.price)}
              </span>
              {product.type === 'nft' && (
                <span className="text-xs text-neutral-500">ETH</span>
              )}
            </div>
            
            {variant === 'display' ? (
              <Button 
                size="sm" 
                variant="gradient"
                rightIcon={<ExternalLink className="w-4 h-4" />}
                className="shadow-lg hover:shadow-xl"
              >
                View
              </Button>
            ) : (
              <div className="flex gap-2">
                <IconButton
                  icon={<Edit3 className="w-4 h-4" />}
                  aria-label="Edit product"
                  variant="outline"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit?.(product);
                  }}
                />
                <IconButton
                  icon={<Trash2 className="w-4 h-4" />}
                  aria-label="Delete product"
                  variant="destructive"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    onDelete?.(product.productId);
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Loading state for ProductCard
export function ProductCardSkeleton() {
  return (
    <Card className="product-card">
      <CardContent className="p-0">
        <div className="aspect-square bg-neutral-200 animate-pulse rounded-t-xl" />
        <div className="p-6 space-y-4">
          <div className="space-y-2">
            <div className="h-6 bg-neutral-200 animate-pulse rounded w-3/4" />
            <div className="h-4 bg-neutral-200 animate-pulse rounded w-full" />
            <div className="h-4 bg-neutral-200 animate-pulse rounded w-2/3" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-8 bg-neutral-200 animate-pulse rounded w-20" />
            <div className="h-8 bg-neutral-200 animate-pulse rounded w-16" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
