'use client';

import { cn } from '@/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';
import { LoadingSpinner } from './LoadingSpinner';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform active:scale-[0.98]',
  {
    variants: {
      variant: {
        primary: 'bg-gradient-to-r from-primary-600 to-primary-700 text-white hover:from-primary-700 hover:to-primary-800 shadow-lg hover:shadow-xl hover:scale-[1.02]',
        secondary: 'bg-white text-neutral-700 border border-neutral-200 hover:bg-neutral-50 hover:border-neutral-300 shadow-sm hover:shadow-md hover:scale-[1.02]',
        destructive: 'bg-gradient-to-r from-error-600 to-error-700 text-white hover:from-error-700 hover:to-error-800 shadow-lg hover:shadow-xl hover:scale-[1.02]',
        outline: 'border-2 border-primary-300 text-primary-700 bg-transparent hover:bg-primary-50 hover:border-primary-400 hover:scale-[1.02]',
        ghost: 'text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900',
        link: 'text-primary-600 underline-offset-4 hover:underline hover:text-primary-700',
        success: 'bg-gradient-to-r from-success-600 to-success-700 text-white hover:from-success-700 hover:to-success-800 shadow-lg hover:shadow-xl hover:scale-[1.02]',
        warning: 'bg-gradient-to-r from-warning-600 to-warning-700 text-white hover:from-warning-700 hover:to-warning-800 shadow-lg hover:shadow-xl hover:scale-[1.02]',
        gradient: 'bg-gradient-to-r from-primary-500 to-accent-500 text-white hover:from-primary-600 hover:to-accent-600 shadow-lg hover:shadow-xl hover:scale-[1.02]',
      },
      size: {
        sm: 'h-8 px-3 text-xs',
        md: 'h-10 px-4 py-2',
        lg: 'h-12 px-8 text-base',
        xl: 'h-14 px-10 text-lg',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading = false, leftIcon, rightIcon, children, disabled, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size }), className)}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <LoadingSpinner 
            size="sm" 
            color={variant === 'primary' || variant === 'destructive' || variant === 'success' || variant === 'warning' || variant === 'gradient' ? 'white' : 'primary'}
            className="mr-2" 
          />
        )}
        {!isLoading && leftIcon && (
          <span className="mr-2">{leftIcon}</span>
        )}
        <span className={isLoading ? 'opacity-70' : ''}>
          {children}
        </span>
        {!isLoading && rightIcon && (
          <span className="ml-2">{rightIcon}</span>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

// Specialized button components
export const IconButton = forwardRef<HTMLButtonElement, {
  icon: React.ReactNode;
  'aria-label': string;
} & ButtonProps>(({ icon, 'aria-label': ariaLabel, className, variant = 'ghost', size = 'icon', ...props }, ref) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      aria-label={ariaLabel}
      ref={ref}
      {...props}
    >
      {icon}
    </Button>
  );
});
IconButton.displayName = 'IconButton';

export const FloatingActionButton = forwardRef<HTMLButtonElement, {
  icon: React.ReactNode;
} & Omit<ButtonProps, 'variant' | 'size'>>(({ icon, className, ...props }, ref) => {
  return (
    <Button
      variant="gradient"
      size="icon"
      className={cn(
        'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-2xl hover:shadow-3xl z-50',
        className
      )}
      ref={ref}
      {...props}
    >
      {icon}
    </Button>
  );
});
FloatingActionButton.displayName = 'FloatingActionButton';

export { Button, buttonVariants };
