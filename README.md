# PollStore - Engage your audience, sell your products

A Next.js Base Mini App that enables influencers to create interactive storefronts and leverage polls for product discovery and sales, optimized for Farcaster frames.

## Features

### 🎨 AI-Powered Storefront Design
- Quick generation of professional-looking storefronts
- AI suggestions for layout, color schemes, and product arrangement
- Multiple design themes and customization options

### 🛍️ Product Curation & Linking
- Simple interface for adding products (affiliate links, direct sales, NFTs)
- Support for bulk uploads and easy categorization
- Product management with editing and deletion capabilities

### 📊 Interactive Poll Feature
- Create and embed polls within Farcaster frames or storefronts
- Use polls for product feedback, engagement, or content guidance
- Real-time results and analytics

### 📈 Direct Conversion Tracking
- Track engagement with polls and storefront visits
- Monitor how interactions lead to product clicks and sales
- Clear ROI insights for influencers

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Blockchain**: Base (via OnchainKit & MiniKit)
- **Styling**: Tailwind CSS with custom design system
- **TypeScript**: Full type safety throughout
- **Components**: Custom UI components with shadcn/ui patterns

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- OnchainKit API key for Base integration

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd pollstore
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Fill in your API keys:
- `NEXT_PUBLIC_ONCHAINKIT_API_KEY`: Your OnchainKit API key
- `OPENAI_API_KEY`: OpenAI API key for AI features
- `NEXT_PUBLIC_SUPABASE_URL`: Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: Supabase anonymous key
- `NEYNAR_API_KEY`: Neynar API key for Farcaster integration
- `PINATA_API_KEY`: Pinata API key for IPFS storage

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with providers
│   ├── page.tsx           # Main application page
│   ├── providers.tsx      # MiniKitProvider setup
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── ProductCard.tsx   # Product display component
│   ├── PollCard.tsx      # Poll interaction component
│   └── ...               # Other feature components
├── lib/                  # Utilities and types
│   ├── types.ts          # TypeScript type definitions
│   ├── utils.ts          # Utility functions
│   └── constants.ts      # App constants
└── public/               # Static assets
```

## Key Components

### MiniKit Integration
The app uses MiniKitProvider for Base blockchain integration:

```tsx
<MiniKitProvider
  chain={base}
  apiKey={process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}
>
  {children}
</MiniKitProvider>
```

### Design System
Custom design tokens following the specification:
- Colors: Primary, accent, background, surface, border, muted
- Typography: Display, heading, body, caption styles
- Components: Cards, buttons, inputs with consistent variants
- Motion: Smooth transitions with proper easing

### Data Models
- **Influencer**: User profiles and storefront information
- **Product**: Product details with type classification
- **Poll**: Interactive polls with options and results
- **PollVote**: Individual vote tracking

## Features in Detail

### Storefront Creation
1. Connect Farcaster account via wallet
2. Name your storefront
3. Choose AI-generated design suggestions
4. Customize layout, theme, and colors
5. Publish as shareable Farcaster frame

### Product Management
- Upload product images (IPFS via Pinata)
- Add product details (name, description, price, link)
- Categorize by type (affiliate, NFT, direct sale)
- Edit and manage existing products

### Poll Creation & Interaction
- Create polls with custom questions and options
- Embed in Farcaster frames for maximum reach
- Real-time voting and results display
- Analytics for engagement tracking

## Business Model

- **Freemium**: Basic features free, premium tiers for advanced analytics
- **Pricing**: $5/mo for 10 polls, $15/mo for unlimited polls + analytics
- **Value**: Low-friction engagement with clear ROI for influencers

## Deployment

The app is optimized for deployment on Vercel or similar platforms:

```bash
npm run build
npm start
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions:
- Create an issue in the repository
- Check the documentation
- Join our community discussions

---

Built with ❤️ for the Farcaster and Base ecosystem.
