'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  color?: 'primary' | 'secondary' | 'white';
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const colorClasses = {
  primary: 'border-primary-200 border-t-primary-600',
  secondary: 'border-neutral-200 border-t-neutral-600',
  white: 'border-white/30 border-t-white',
};

export function LoadingSpinner({ 
  size = 'md', 
  className,
  color = 'primary' 
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        'loading-spinner border-2 rounded-full',
        sizeClasses[size],
        colorClasses[color],
        className
      )}
      role="status"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

// Loading skeleton component for content placeholders
interface LoadingSkeletonProps {
  className?: string;
  width?: string;
  height?: string;
  rounded?: boolean;
}

export function LoadingSkeleton({ 
  className, 
  width = 'w-full', 
  height = 'h-4',
  rounded = true 
}: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'loading-skeleton',
        width,
        height,
        rounded && 'rounded',
        className
      )}
      role="status"
      aria-label="Loading content"
    />
  );
}

// Loading card component for card placeholders
export function LoadingCard() {
  return (
    <div className="glass-card p-6 rounded-xl animate-pulse">
      <div className="flex items-center space-x-4">
        <LoadingSkeleton width="w-12" height="h-12" className="rounded-full" />
        <div className="space-y-2 flex-1">
          <LoadingSkeleton width="w-3/4" height="h-4" />
          <LoadingSkeleton width="w-1/2" height="h-3" />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <LoadingSkeleton width="w-full" height="h-3" />
        <LoadingSkeleton width="w-5/6" height="h-3" />
        <LoadingSkeleton width="w-4/6" height="h-3" />
      </div>
    </div>
  );
}

// Loading button component
interface LoadingButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingButton({
  children,
  isLoading = false,
  className,
  disabled,
  onClick,
  variant = 'primary',
  size = 'md',
}: LoadingButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    outline: 'btn-outline',
  };
  
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  return (
    <button
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-disabled={disabled || isLoading}
    >
      {isLoading && (
        <LoadingSpinner 
          size="sm" 
          color={variant === 'primary' ? 'white' : 'primary'}
          className="mr-2" 
        />
      )}
      <span className={isLoading ? 'opacity-70' : ''}>
        {children}
      </span>
    </button>
  );
}
