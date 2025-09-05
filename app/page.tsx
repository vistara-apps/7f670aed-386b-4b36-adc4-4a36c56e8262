'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { ConnectWallet, Wallet } from '@coinbase/onchainkit/wallet';
import { Name, Avatar } from '@coinbase/onchainkit/identity';
import { Product, Poll, StorefrontDesign, Influencer } from '@/lib/types';
import { CreateStorefrontForm } from '@/components/CreateStorefrontForm';
import { StorefrontPreview } from '@/components/StorefrontPreview';
import { AddProductForm } from '@/components/AddProductForm';
import { CreatePollForm } from '@/components/CreatePollForm';
import { ProductCard } from '@/components/ProductCard';
import { PollCard } from '@/components/PollCard';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { StatsCard } from '@/components/StatsCard';
import { LoadingSpinner, LoadingCard } from '@/components/ui/LoadingSpinner';
import { 
  Store, 
  Plus, 
  BarChart3, 
  Eye, 
  Settings2, 
  TrendingUp,
  Users,
  ShoppingBag,
  Sparkles,
  ArrowRight
} from 'lucide-react';

type AppState = 'welcome' | 'create-storefront' | 'dashboard' | 'add-product' | 'create-poll' | 'preview';

export default function PollStorePage() {
  const { setFrameReady } = useMiniKit();
  const [appState, setAppState] = useState<AppState>('welcome');
  const [isLoading, setIsLoading] = useState(false);
  
  // Mock data - in a real app, this would come from Supabase
  const [influencer, setInfluencer] = useState<Influencer | null>(null);
  const [products, setProducts] = useState<Product[]>([
    {
      productId: '1',
      influencerId: 'user1',
      name: 'Wireless Headphones',
      description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
      imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop',
      link: 'https://example.com/headphones',
      type: 'affiliate',
      price: 199.99,
      createdAt: new Date(),
    },
    {
      productId: '2',
      influencerId: 'user1',
      name: 'Smart Watch',
      description: 'Fitness tracking smartwatch with heart rate monitor and GPS',
      imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop',
      link: 'https://example.com/smartwatch',
      type: 'direct',
      price: 299.99,
      createdAt: new Date(),
    },
    {
      productId: '3',
      influencerId: 'user1',
      name: 'Digital Art NFT',
      description: 'Exclusive digital artwork collection - limited edition',
      imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=400&fit=crop',
      link: 'https://opensea.io/collection/example',
      type: 'nft',
      price: 0.5,
      createdAt: new Date(),
    },
  ]);
  
  const [polls, setPolls] = useState<Poll[]>([
    {
      pollId: '1',
      influencerId: 'user1',
      question: 'Which product category interests you most?',
      options: ['Tech Gadgets', 'Fashion', 'Home & Garden', 'Fitness'],
      type: 'product_preference',
      results: [45, 32, 18, 25],
      createdAt: new Date(),
    },
    {
      pollId: '2',
      influencerId: 'user1',
      question: 'What content would you like to see next?',
      options: ['Product Reviews', 'Tutorials', 'Behind the Scenes'],
      type: 'content_idea',
      results: [28, 35, 22],
      createdAt: new Date(),
    },
  ]);

  const [storefrontDesign, setStorefrontDesign] = useState<StorefrontDesign>({
    layout: 'grid',
    colorScheme: 'blue',
    theme: 'modern',
  });

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleCreateStorefront = async (name: string, design: StorefrontDesign) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newInfluencer: Influencer = {
        userId: 'user1',
        farcasterId: 'user1',
        storefrontName: name,
        storefrontUrl: name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
        createdAt: new Date(),
      };
      
      setInfluencer(newInfluencer);
      setStorefrontDesign(design);
      setAppState('dashboard');
    } catch (error) {
      console.error('Error creating storefront:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddProduct = async (productData: Omit<Product, 'productId' | 'influencerId' | 'createdAt'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newProduct: Product = {
        ...productData,
        productId: Date.now().toString(),
        influencerId: influencer?.userId || 'user1',
        createdAt: new Date(),
      };
      
      setProducts([...products, newProduct]);
      setAppState('dashboard');
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreatePoll = async (pollData: Omit<Poll, 'pollId' | 'influencerId' | 'createdAt' | 'results'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newPoll: Poll = {
        ...pollData,
        pollId: Date.now().toString(),
        influencerId: influencer?.userId || 'user1',
        results: new Array(pollData.options.length).fill(0),
        createdAt: new Date(),
      };
      
      setPolls([...polls, newPoll]);
      setAppState('dashboard');
    } catch (error) {
      console.error('Error creating poll:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts(products.filter(p => p.productId !== productId));
  };

  const handleVote = async (pollId: string, optionIndex: number) => {
    // Simulate voting
    setPolls(polls.map(poll => {
      if (poll.pollId === pollId) {
        const newResults = [...poll.results];
        newResults[optionIndex] += 1;
        return { ...poll, results: newResults };
      }
      return poll;
    }));
  };

  // Welcome Screen
  if (appState === 'welcome') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <Card className="max-w-md w-full text-center">
          <CardHeader>
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Store className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">Welcome to PollStore</CardTitle>
            <p className="text-gray-600">
              Engage your audience, sell your products with interactive storefronts and polls
            </p>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
            </Wallet>
            
            <div className="space-y-2">
              <Button
                onClick={() => setAppState('create-storefront')}
                className="w-full"
              >
                Create New Storefront
              </Button>
              
              <Button
                onClick={() => {
                  // Simulate existing user
                  setInfluencer({
                    userId: 'user1',
                    farcasterId: 'user1',
                    storefrontName: 'My Awesome Store',
                    storefrontUrl: 'my-awesome-store',
                    createdAt: new Date(),
                  });
                  setAppState('dashboard');
                }}
                variant="outline"
                className="w-full"
              >
                View Demo Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Create Storefront
  if (appState === 'create-storefront') {
    return (
      <div className="min-h-screen py-12">
        <CreateStorefrontForm
          onSubmit={handleCreateStorefront}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Add Product
  if (appState === 'add-product') {
    return (
      <div className="min-h-screen py-12">
        <AddProductForm
          onSubmit={handleAddProduct}
          onCancel={() => setAppState('dashboard')}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Create Poll
  if (appState === 'create-poll') {
    return (
      <div className="min-h-screen py-12">
        <CreatePollForm
          onSubmit={handleCreatePoll}
          onCancel={() => setAppState('dashboard')}
          isLoading={isLoading}
        />
      </div>
    );
  }

  // Storefront Preview
  if (appState === 'preview') {
    return (
      <div className="min-h-screen">
        <div className="fixed top-4 left-4 z-10">
          <Button
            onClick={() => setAppState('dashboard')}
            variant="secondary"
          >
            ← Back to Dashboard
          </Button>
        </div>
        
        <StorefrontPreview
          products={products}
          design={storefrontDesign}
          storefrontName={influencer?.storefrontName || 'My Store'}
          onProductClick={(product) => window.open(product.link, '_blank')}
        />
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen p-6 animate-fade-in">
      <div className="container-responsive">
        {/* Enhanced Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="heading-display text-gradient">
              {influencer?.storefrontName || 'My Store'}
            </h1>
            <p className="body-large text-neutral-600 mt-2">
              Manage your interactive storefront and engage with your audience
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button
              onClick={() => setAppState('preview')}
              variant="outline"
              leftIcon={<Eye className="w-4 h-4" />}
              className="shadow-sm"
            >
              Preview Store
            </Button>
            
            <Button 
              variant="gradient"
              leftIcon={<Sparkles className="w-4 h-4" />}
              className="shadow-lg"
            >
              Upgrade Plan
            </Button>
            
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatsCard
            title="Products"
            value={products.length}
            icon={ShoppingBag}
            description={`${products.length} products in your store`}
            color="blue"
            trend={{
              value: 12,
              isPositive: true,
            }}
          />

          <StatsCard
            title="Active Polls"
            value={polls.length}
            icon={BarChart3}
            description={`${polls.reduce((sum, poll) => sum + poll.results.reduce((a, b) => a + b, 0), 0)} total votes`}
            color="purple"
            trend={{
              value: 8,
              isPositive: true,
            }}
          />

          <StatsCard
            title="Total Votes"
            value={polls.reduce((sum, poll) => sum + poll.results.reduce((a, b) => a + b, 0), 0)}
            icon={Users}
            description="Votes across all polls"
            color="green"
            trend={{
              value: 15,
              isPositive: true,
            }}
          />

          <StatsCard
            title="Engagement"
            value="94%"
            icon={TrendingUp}
            description="Average engagement rate"
            color="orange"
            trend={{
              value: 6,
              isPositive: true,
            }}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Enhanced Products Section */}
          <div className="animate-slide-up">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="heading-2">Products</h2>
                <p className="body-small text-neutral-600 mt-1">
                  Manage your product catalog
                </p>
              </div>
              <Button
                onClick={() => setAppState('add-product')}
                size="sm"
                variant="gradient"
                leftIcon={<Plus className="w-4 h-4" />}
                className="shadow-lg"
              >
                Add Product
              </Button>
            </div>
            
            <div className="space-y-4">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div 
                    key={product.productId}
                    className="animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <ProductCard
                      product={product}
                      variant="editable"
                      onDelete={handleDeleteProduct}
                    />
                  </div>
                ))
              ) : (
                <Card className="glass-card p-8 text-center animate-scale-in">
                  <div className="p-4 bg-primary-100 rounded-full w-fit mx-auto mb-4">
                    <ShoppingBag className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="heading-3 mb-2">No products yet</h3>
                  <p className="body-base text-neutral-600 mb-6">
                    Add your first product to start building your storefront
                  </p>
                  <Button 
                    onClick={() => setAppState('add-product')}
                    variant="gradient"
                    leftIcon={<Plus className="w-4 h-4" />}
                    className="shadow-lg"
                  >
                    Add Your First Product
                  </Button>
                </Card>
              )}
            </div>
          </div>

          {/* Enhanced Polls Section */}
          <div className="animate-slide-up" style={{ animationDelay: '200ms' }}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="heading-2">Polls</h2>
                <p className="body-small text-neutral-600 mt-1">
                  Engage your audience with interactive polls
                </p>
              </div>
              <Button
                onClick={() => setAppState('create-poll')}
                size="sm"
                variant="gradient"
                leftIcon={<Plus className="w-4 h-4" />}
                className="shadow-lg"
              >
                Create Poll
              </Button>
            </div>
            
            <div className="space-y-4">
              {polls.length > 0 ? (
                polls.map((poll, index) => (
                  <div 
                    key={poll.pollId}
                    className="animate-slide-up"
                    style={{ animationDelay: `${(index + 2) * 100}ms` }}
                  >
                    <PollCard
                      poll={poll}
                      variant="creator"
                      onVote={handleVote}
                    />
                  </div>
                ))
              ) : (
                <Card className="glass-card p-8 text-center animate-scale-in">
                  <div className="p-4 bg-accent-100 rounded-full w-fit mx-auto mb-4">
                    <BarChart3 className="w-8 h-8 text-accent-600" />
                  </div>
                  <h3 className="heading-3 mb-2">No polls yet</h3>
                  <p className="body-base text-neutral-600 mb-6">
                    Create your first poll to engage your audience and gather insights
                  </p>
                  <Button 
                    onClick={() => setAppState('create-poll')}
                    variant="gradient"
                    leftIcon={<Plus className="w-4 h-4" />}
                    className="shadow-lg"
                  >
                    Create Your First Poll
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
