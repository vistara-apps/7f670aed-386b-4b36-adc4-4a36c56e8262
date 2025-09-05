'use client';

import { useState } from 'react';
import { Product } from '@/lib/types';
import { PRODUCT_TYPES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Plus, Upload } from 'lucide-react';

interface AddProductFormProps {
  onSubmit: (product: Omit<Product, 'productId' | 'influencerId' | 'createdAt'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function AddProductForm({ onSubmit, onCancel, isLoading }: AddProductFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    link: '',
    type: 'affiliate' as Product['type'],
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.description && formData.price && formData.link && formData.imageUrl) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
      });
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // In a real app, you would upload to Pinata/IPFS here
      // For demo purposes, we'll use a placeholder
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData({ ...formData, imageUrl: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Add New Product
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Product Image */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              {formData.imageUrl ? (
                <div className="relative">
                  <img
                    src={formData.imageUrl}
                    alt="Product preview"
                    className="max-w-full h-48 object-cover mx-auto rounded-lg"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => setFormData({ ...formData, imageUrl: '' })}
                  >
                    Change Image
                  </Button>
                </div>
              ) : (
                <div>
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-blue-600 hover:text-blue-700"
                  >
                    Click to upload image
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <Input
              placeholder="Amazing Product"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              className="input-field min-h-[100px] resize-none"
              placeholder="Describe your product..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>

          {/* Product Type */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Type
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(PRODUCT_TYPES).map(([key, type]) => (
                <button
                  key={key}
                  type="button"
                  className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                    formData.type === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, type: key as Product['type'] })}
                >
                  <div className="text-2xl mb-1">{type.icon}</div>
                  <div className="text-sm font-medium">{type.name}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Price (USD)
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              placeholder="29.99"
              value={formData.price}
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              required
            />
          </div>

          {/* Product Link */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Link
            </label>
            <Input
              type="url"
              placeholder="https://example.com/product"
              value={formData.link}
              onChange={(e) => setFormData({ ...formData, link: e.target.value })}
              required
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Adding...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
