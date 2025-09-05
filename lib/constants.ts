export const DESIGN_THEMES = {
  modern: {
    name: 'Modern',
    description: 'Clean lines and contemporary aesthetics',
    colors: ['bg-gradient-to-br from-slate-50 to-blue-50', 'text-slate-900'],
  },
  minimal: {
    name: 'Minimal',
    description: 'Simple and focused design',
    colors: ['bg-white', 'text-gray-900'],
  },
  vibrant: {
    name: 'Vibrant',
    description: 'Bold colors and dynamic layouts',
    colors: ['bg-gradient-to-br from-purple-50 to-pink-50', 'text-purple-900'],
  },
} as const;

export const COLOR_SCHEMES = {
  blue: {
    primary: 'bg-blue-600',
    secondary: 'bg-blue-100',
    accent: 'text-blue-600',
    gradient: 'from-blue-400 to-blue-600',
  },
  purple: {
    primary: 'bg-purple-600',
    secondary: 'bg-purple-100',
    accent: 'text-purple-600',
    gradient: 'from-purple-400 to-purple-600',
  },
  pink: {
    primary: 'bg-pink-600',
    secondary: 'bg-pink-100',
    accent: 'text-pink-600',
    gradient: 'from-pink-400 to-pink-600',
  },
  green: {
    primary: 'bg-green-600',
    secondary: 'bg-green-100',
    accent: 'text-green-600',
    gradient: 'from-green-400 to-green-600',
  },
} as const;

export const PRODUCT_TYPES = {
  affiliate: {
    name: 'Affiliate Link',
    description: 'Earn commission from sales',
    icon: '🔗',
  },
  nft: {
    name: 'NFT',
    description: 'Digital collectible',
    icon: '🎨',
  },
  direct: {
    name: 'Direct Sale',
    description: 'Sell directly to customers',
    icon: '💰',
  },
} as const;

export const POLL_TYPES = {
  product_preference: {
    name: 'Product Preference',
    description: 'Let your audience choose their favorite products',
  },
  content_idea: {
    name: 'Content Idea',
    description: 'Get feedback on content ideas',
  },
} as const;
