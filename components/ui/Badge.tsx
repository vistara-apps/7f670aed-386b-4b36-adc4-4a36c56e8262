'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary-100 text-primary-800 hover:bg-primary-200',
        secondary: 'bg-neutral-100 text-neutral-800 hover:bg-neutral-200',
        success: 'bg-success-100 text-success-800 hover:bg-success-200',
        warning: 'bg-warning-100 text-warning-800 hover:bg-warning-200',
        error: 'bg-error-100 text-error-800 hover:bg-error-200',
        accent: 'bg-accent-100 text-accent-800 hover:bg-accent-200',
        outline: 'border border-neutral-200 text-neutral-700 hover:bg-neutral-50',
        gradient: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white shadow-sm',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-2.5 py-0.5 text-xs',
        lg: 'px-3 py-1 text-sm',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  icon?: React.ReactNode;
  removable?: boolean;
  onRemove?: () => void;
}

export function Badge({
  className,
  variant,
  size,
  icon,
  removable,
  onRemove,
  children,
  ...props
}: BadgeProps) {
  return (
    <div
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    >
      {icon && <span className="mr-1">{icon}</span>}
      {children}
      {removable && onRemove && (
        <button
          onClick={onRemove}
          className="ml-1 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-black/10 transition-colors"
          aria-label="Remove badge"
        >
          <svg
            className="w-3 h-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

// Specialized badge components
export function StatusBadge({ 
  status, 
  className, 
  ...props 
}: { 
  status: 'active' | 'inactive' | 'pending' | 'completed' | 'error';
  className?: string;
} & Omit<BadgeProps, 'variant'>) {
  const statusConfig = {
    active: { variant: 'success' as const, text: 'Active' },
    inactive: { variant: 'secondary' as const, text: 'Inactive' },
    pending: { variant: 'warning' as const, text: 'Pending' },
    completed: { variant: 'success' as const, text: 'Completed' },
    error: { variant: 'error' as const, text: 'Error' },
  };

  const config = statusConfig[status];

  return (
    <Badge variant={config.variant} className={className} {...props}>
      {config.text}
    </Badge>
  );
}

export function ProductTypeBadge({ 
  type, 
  className, 
  ...props 
}: { 
  type: 'affiliate' | 'direct' | 'nft';
  className?: string;
} & Omit<BadgeProps, 'variant' | 'children'>) {
  const typeConfig = {
    affiliate: { 
      variant: 'default' as const, 
      text: 'Affiliate',
      icon: '🔗'
    },
    direct: { 
      variant: 'success' as const, 
      text: 'Direct Sale',
      icon: '💰'
    },
    nft: { 
      variant: 'accent' as const, 
      text: 'NFT',
      icon: '🎨'
    },
  };

  const config = typeConfig[type];

  return (
    <Badge 
      variant={config.variant} 
      className={className} 
      icon={<span className="text-xs">{config.icon}</span>}
      {...props}
    >
      {config.text}
    </Badge>
  );
}

export function PollTypeBadge({ 
  type, 
  className, 
  ...props 
}: { 
  type: 'product_preference' | 'content_idea' | 'feedback' | 'general';
  className?: string;
} & Omit<BadgeProps, 'variant' | 'children'>) {
  const typeConfig = {
    product_preference: { 
      variant: 'default' as const, 
      text: 'Product Poll',
      icon: '🛍️'
    },
    content_idea: { 
      variant: 'accent' as const, 
      text: 'Content Poll',
      icon: '💡'
    },
    feedback: { 
      variant: 'warning' as const, 
      text: 'Feedback',
      icon: '📝'
    },
    general: { 
      variant: 'secondary' as const, 
      text: 'General',
      icon: '❓'
    },
  };

  const config = typeConfig[type];

  return (
    <Badge 
      variant={config.variant} 
      className={className} 
      icon={<span className="text-xs">{config.icon}</span>}
      {...props}
    >
      {config.text}
    </Badge>
  );
}
