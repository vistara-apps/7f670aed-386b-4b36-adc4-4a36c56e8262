'use client';

import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'purple' | 'green' | 'orange' | 'red' | 'indigo';
  className?: string;
}

const colorClasses = {
  blue: {
    icon: 'bg-primary-100 text-primary-600',
    trend: 'text-primary-600',
  },
  purple: {
    icon: 'bg-accent-100 text-accent-600',
    trend: 'text-accent-600',
  },
  green: {
    icon: 'bg-success-100 text-success-600',
    trend: 'text-success-600',
  },
  orange: {
    icon: 'bg-warning-100 text-warning-600',
    trend: 'text-warning-600',
  },
  red: {
    icon: 'bg-error-100 text-error-600',
    trend: 'text-error-600',
  },
  indigo: {
    icon: 'bg-indigo-100 text-indigo-600',
    trend: 'text-indigo-600',
  },
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  color = 'blue',
  className,
}: StatsCardProps) {
  const colors = colorClasses[color];

  return (
    <Card className={cn('stats-card group', className)}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium text-neutral-600 mb-1">
              {title}
            </p>
            <div className="flex items-baseline space-x-2">
              <p className="text-3xl font-bold text-neutral-900">
                {typeof value === 'number' ? value.toLocaleString() : value}
              </p>
              {trend && (
                <span
                  className={cn(
                    'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium',
                    trend.isPositive
                      ? 'bg-success-100 text-success-800'
                      : 'bg-error-100 text-error-800'
                  )}
                >
                  <svg
                    className={cn(
                      'w-3 h-3 mr-1',
                      trend.isPositive ? 'rotate-0' : 'rotate-180'
                    )}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L6.707 7.707a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {Math.abs(trend.value)}%
                </span>
              )}
            </div>
            {description && (
              <p className="text-sm text-neutral-500 mt-1">
                {description}
              </p>
            )}
          </div>
          
          <div className={cn(
            'p-3 rounded-xl transition-all duration-200 group-hover:scale-110',
            colors.icon
          )}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Specialized stats cards
export function ProductStatsCard({ count }: { count: number }) {
  return (
    <StatsCard
      title="Products"
      value={count}
      icon={({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      )}
      description={`${count} products in your store`}
      color="blue"
    />
  );
}

export function PollStatsCard({ count, totalVotes }: { count: number; totalVotes: number }) {
  return (
    <StatsCard
      title="Active Polls"
      value={count}
      icon={({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )}
      description={`${totalVotes} total votes received`}
      color="purple"
    />
  );
}

export function EngagementStatsCard({ percentage }: { percentage: number }) {
  return (
    <StatsCard
      title="Engagement Rate"
      value={`${percentage}%`}
      icon={({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )}
      description="Average engagement across polls"
      color="green"
      trend={{
        value: 12,
        isPositive: true,
      }}
    />
  );
}

export function RevenueStatsCard({ amount }: { amount: number }) {
  return (
    <StatsCard
      title="Revenue"
      value={`$${amount.toLocaleString()}`}
      icon={({ className }) => (
        <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
        </svg>
      )}
      description="Total revenue this month"
      color="orange"
      trend={{
        value: 8,
        isPositive: true,
      }}
    />
  );
}
