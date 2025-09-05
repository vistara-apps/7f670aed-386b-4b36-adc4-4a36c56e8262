'use client';

import { useState } from 'react';
import { StorefrontDesign } from '@/lib/types';
import { DESIGN_THEMES, COLOR_SCHEMES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Sparkles, Palette, Layout } from 'lucide-react';

interface CreateStorefrontFormProps {
  onSubmit: (name: string, design: StorefrontDesign) => void;
  isLoading?: boolean;
}

export function CreateStorefrontForm({ onSubmit, isLoading }: CreateStorefrontFormProps) {
  const [storefrontName, setStorefrontName] = useState('');
  const [design, setDesign] = useState<StorefrontDesign>({
    layout: 'grid',
    colorScheme: 'blue',
    theme: 'modern',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (storefrontName.trim()) {
      onSubmit(storefrontName.trim(), design);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-blue-600" />
            Create Your Storefront
          </CardTitle>
          <p className="text-gray-600">
            Set up your interactive storefront in minutes with AI-powered design
          </p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Storefront Name */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Storefront Name
              </label>
              <Input
                placeholder="My Awesome Store"
                value={storefrontName}
                onChange={(e) => setStorefrontName(e.target.value)}
                required
              />
            </div>

            {/* Layout Selection */}
            <div>
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Layout className="w-4 h-4" />
                Layout Style
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['grid', 'masonry', 'carousel'] as const).map((layout) => (
                  <button
                    key={layout}
                    type="button"
                    className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                      design.layout === layout
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setDesign({ ...design, layout })}
                  >
                    <div className="font-medium capitalize">{layout}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div>
              <label className="block text-sm font-medium mb-3">
                Design Theme
              </label>
              <div className="space-y-2">
                {Object.entries(DESIGN_THEMES).map(([key, theme]) => (
                  <button
                    key={key}
                    type="button"
                    className={`w-full p-3 border rounded-lg text-left transition-all duration-200 ${
                      design.theme === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setDesign({ ...design, theme: key as any })}
                  >
                    <div className="font-medium">{theme.name}</div>
                    <div className="text-sm text-gray-600">{theme.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Color Scheme */}
            <div>
              <label className="block text-sm font-medium mb-3 flex items-center gap-2">
                <Palette className="w-4 h-4" />
                Color Scheme
              </label>
              <div className="grid grid-cols-4 gap-3">
                {Object.entries(COLOR_SCHEMES).map(([key, scheme]) => (
                  <button
                    key={key}
                    type="button"
                    className={`p-3 border rounded-lg text-center transition-all duration-200 ${
                      design.colorScheme === key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setDesign({ ...design, colorScheme: key as any })}
                  >
                    <div className={`w-8 h-8 rounded-full mx-auto mb-2 bg-gradient-to-r ${scheme.gradient}`} />
                    <div className="text-sm font-medium capitalize">{key}</div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              disabled={!storefrontName.trim() || isLoading}
            >
              {isLoading ? 'Creating...' : 'Create Storefront'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
