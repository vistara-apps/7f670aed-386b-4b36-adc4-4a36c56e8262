export interface Influencer {
  userId: string;
  farcasterId: string;
  storefrontName: string;
  storefrontUrl: string;
  paymentDetails?: string;
  createdAt: Date;
}

export interface Product {
  productId: string;
  influencerId: string;
  imageUrl: string;
  name: string;
  description: string;
  link: string;
  type: 'affiliate' | 'nft' | 'direct';
  price: number;
  createdAt: Date;
}

export interface Poll {
  pollId: string;
  influencerId: string;
  question: string;
  options: string[];
  createdAt: Date;
  type: 'product_preference' | 'content_idea';
  results: number[];
}

export interface PollVote {
  voteId: string;
  pollId: string;
  voterFarcasterId: string;
  optionIndex: number;
  timestamp: Date;
}

export interface StorefrontDesign {
  layout: 'grid' | 'masonry' | 'carousel';
  colorScheme: 'blue' | 'purple' | 'pink' | 'green';
  theme: 'modern' | 'minimal' | 'vibrant';
}
