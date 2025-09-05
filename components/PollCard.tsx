'use client';

import { Poll, PollVote } from '@/lib/types';
import { calculatePollResults } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button, IconButton } from '@/components/ui/Button';
import { PollTypeBadge } from '@/components/ui/Badge';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { useState } from 'react';
import { BarChart3, Users, Share2, Copy, Check, TrendingUp } from 'lucide-react';

interface PollCardProps {
  poll: Poll;
  variant?: 'viewer' | 'creator';
  onVote?: (pollId: string, optionIndex: number) => void;
  hasVoted?: boolean;
  userVote?: number;
  showActions?: boolean;
}

export function PollCard({ 
  poll, 
  variant = 'viewer',
  onVote,
  hasVoted = false,
  userVote,
  showActions = true
}: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(userVote ?? null);
  const [isVoting, setIsVoting] = useState(false);
  const [copied, setCopied] = useState(false);
  
  const totalVotes = poll.results.reduce((sum, count) => sum + count, 0);
  const percentages = calculatePollResults(poll.results, totalVotes);
  const maxVotes = Math.max(...poll.results);

  const handleVote = async (optionIndex: number) => {
    if (hasVoted || isVoting) return;
    
    setIsVoting(true);
    setSelectedOption(optionIndex);
    
    try {
      await onVote?.(poll.pollId, optionIndex);
    } catch (error) {
      console.error('Error voting:', error);
      setSelectedOption(null);
    } finally {
      setIsVoting(false);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: poll.question,
          text: `Vote on this poll: ${poll.question}`,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Share cancelled');
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy:', error);
    }
  };

  return (
    <Card className="w-full glass-card-hover animate-fade-in">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-primary-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-primary-600" />
              </div>
              <PollTypeBadge type={poll.type} />
            </div>
            <CardTitle className="heading-3 text-neutral-900 leading-tight">
              {poll.question}
            </CardTitle>
          </div>
          
          {showActions && (
            <div className="flex gap-2 ml-4">
              <IconButton
                icon={<Share2 className="w-4 h-4" />}
                aria-label="Share poll"
                variant="ghost"
                size="sm"
                onClick={handleShare}
              />
              <IconButton
                icon={copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                aria-label="Copy poll link"
                variant="ghost"
                size="sm"
                onClick={handleCopy}
                className={copied ? 'text-success-600' : ''}
              />
            </div>
          )}
        </div>
        
        {variant === 'creator' && (
          <div className="flex items-center gap-4 pt-2 border-t border-neutral-100">
            <div className="flex items-center gap-2 text-sm text-neutral-600">
              <Users className="w-4 h-4" />
              <span className="font-medium">{totalVotes}</span>
              <span>votes</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-success-600">
              <TrendingUp className="w-4 h-4" />
              <span className="font-medium">Active</span>
            </div>
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {poll.options.map((option, index) => {
          const percentage = percentages[index] || 0;
          const voteCount = poll.results[index] || 0;
          const isSelected = selectedOption === index;
          const showResults = hasVoted || variant === 'creator';
          const isWinning = voteCount === maxVotes && maxVotes > 0;
          
          return (
            <div key={index} className="relative">
              <button
                className={`poll-option w-full text-left transition-all duration-200 ${
                  isSelected ? 'selected' : ''
                } ${hasVoted || isVoting ? 'disabled' : ''} ${
                  isWinning && showResults ? 'ring-2 ring-success-200 bg-success-50' : ''
                }`}
                onClick={() => handleVote(index)}
                disabled={hasVoted || isVoting}
                aria-pressed={isSelected}
                aria-describedby={showResults ? `option-${index}-results` : undefined}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-neutral-900 flex-1">
                    {option}
                  </span>
                  {isVoting && selectedOption === index && (
                    <LoadingSpinner size="sm" className="ml-2" />
                  )}
                  {showResults && (
                    <div className="flex items-center gap-2 ml-2">
                      <span className="text-sm font-bold text-primary-600">
                        {percentage}%
                      </span>
                      <span className="text-xs text-neutral-500">
                        ({voteCount})
                      </span>
                      {isWinning && (
                        <div className="w-2 h-2 bg-success-500 rounded-full" />
                      )}
                    </div>
                  )}
                </div>
                
                {showResults && (
                  <div className="w-full bg-neutral-200 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-3 rounded-full transition-all duration-500 ease-out ${
                        isWinning 
                          ? 'bg-gradient-to-r from-success-500 to-success-600' 
                          : 'bg-gradient-to-r from-primary-500 to-primary-600'
                      }`}
                      style={{ 
                        width: `${percentage}%`,
                        transitionDelay: `${index * 100}ms`
                      }}
                    />
                  </div>
                )}
              </button>
              
              {showResults && (
                <div 
                  id={`option-${index}-results`} 
                  className="sr-only"
                  aria-live="polite"
                >
                  {option} received {voteCount} votes, {percentage}% of total
                </div>
              )}
            </div>
          );
        })}
        
        {!hasVoted && variant === 'viewer' && !isVoting && (
          <div className="pt-4 text-center border-t border-neutral-100">
            <p className="body-small text-neutral-600 mb-2">
              Select an option to see results
            </p>
            <div className="flex items-center justify-center gap-2 text-xs text-neutral-500">
              <Users className="w-3 h-3" />
              <span>{totalVotes} people have voted</span>
            </div>
          </div>
        )}
        
        {hasVoted && variant === 'viewer' && (
          <div className="pt-4 text-center border-t border-neutral-100">
            <p className="body-small text-success-600 font-medium">
              ✓ Thank you for voting!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Loading state for PollCard
export function PollCardSkeleton() {
  return (
    <Card className="w-full glass-card">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-9 h-9 bg-neutral-200 animate-pulse rounded-lg" />
              <div className="w-20 h-6 bg-neutral-200 animate-pulse rounded-full" />
            </div>
            <div className="w-3/4 h-6 bg-neutral-200 animate-pulse rounded" />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 bg-neutral-100 rounded-xl">
            <div className="flex items-center justify-between mb-2">
              <div className="w-32 h-4 bg-neutral-200 animate-pulse rounded" />
              <div className="w-12 h-4 bg-neutral-200 animate-pulse rounded" />
            </div>
            <div className="w-full h-3 bg-neutral-200 animate-pulse rounded-full" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
