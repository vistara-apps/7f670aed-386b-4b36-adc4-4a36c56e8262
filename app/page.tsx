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
import { PaymentTest } from '@/components/PaymentTest';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { 
  Store, 
  Plus, 
  BarChart3, 
  Eye, 
  Settings2, 
  TrendingUp,
  Users,
  ShoppingBag,
  CreditCard
} from 'lucide-react';

type AppState = 'welcome' | 'create-storefront' | 'dashboard' | 'add-product' | 'create-poll' | 'preview' | 'payment-test';

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

  // Payment Test
  if (appState === 'payment-test') {
    return (
      <div className="min-h-screen p-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6">
            <Button
              onClick={() => setAppState('dashboard')}
              variant="outline"
              className="gap-2"
            >
              ← Back to Dashboard
            </Button>
          </div>
          
          <PaymentTest />
        </div>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen p-6">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {influencer?.storefrontName || 'My Store'}
            </h1>
            <p className="text-gray-600">Manage your interactive storefront</p>
          </div>
          
          <div className="flex gap-3">
            <Button
              onClick={() => setAppState('payment-test')}
              variant="outline"
              className="gap-2"
            >
              <CreditCard className="w-4 h-4" />
              Test Payments
            </Button>
            
            <Button
              onClick={() => setAppState('preview')}
              variant="outline"
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Preview
            </Button>
            
            <Wallet>
              <ConnectWallet>
                <Avatar className="h-6 w-6" />
                <Name />
              </ConnectWallet>
            </Wallet>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Active Polls</p>
                  <p className="text-2xl font-bold">{polls.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Votes</p>
                  <p className="text-2xl font-bold">
                    {polls.reduce((sum, poll) => sum + poll.results.reduce((a, b) => a + b, 0), 0)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Engagement</p>
                  <p className="text-2xl font-bold">94%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Products Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Products</h2>
              <Button
                onClick={() => setAppState('add-product')}
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </div>
            
            <div className="space-y-4">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard
                    key={product.productId}
                    product={product}
                    variant="editable"
                    onDelete={handleDeleteProduct}
                  />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No products yet</h3>
                  <p className="text-gray-600 mb-4">
                    Add your first product to start building your storefront
                  </p>
                  <Button onClick={() => setAppState('add-product')}>
                    Add Product
                  </Button>
                </Card>
              )}
            </div>
          </div>

          {/* Polls Section */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold">Polls</h2>
              <Button
                onClick={() => setAppState('create-poll')}
                size="sm"
                className="gap-2"
              >
                <Plus className="w-4 h-4" />
                Create Poll
              </Button>
            </div>
            
            <div className="space-y-4">
              {polls.length > 0 ? (
                polls.map((poll) => (
                  <PollCard
                    key={poll.pollId}
                    poll={poll}
                    variant="creator"
                    onVote={handleVote}
                  />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No polls yet</h3>
                  <p className="text-gray-600 mb-4">
                    Create your first poll to engage your audience
                  </p>
                  <Button onClick={() => setAppState('create-poll')}>
                    Create Poll
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
