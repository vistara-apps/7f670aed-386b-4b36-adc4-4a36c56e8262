'use client';

import { Poll, PollVote } from '@/lib/types';
import { calculatePollResults } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useState } from 'react';
import { BarChart3, Users } from 'lucide-react';

interface PollCardProps {
  poll: Poll;
  variant?: 'viewer' | 'creator';
  onVote?: (pollId: string, optionIndex: number) => void;
  hasVoted?: boolean;
  userVote?: number;
}

export function PollCard({ 
  poll, 
  variant = 'viewer',
  onVote,
  hasVoted = false,
  userVote 
}: PollCardProps) {
  const [selectedOption, setSelectedOption] = useState<number | null>(userVote ?? null);
  const [isVoting, setIsVoting] = useState(false);
  
  const totalVotes = poll.results.reduce((sum, count) => sum + count, 0);
  const percentages = calculatePollResults(poll.results, totalVotes);

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

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-blue-600" />
          {poll.question}
        </CardTitle>
        {variant === 'creator' && (
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Users className="w-4 h-4" />
            {totalVotes} votes
          </div>
        )}
      </CardHeader>
      
      <CardContent className="space-y-3">
        {poll.options.map((option, index) => {
          const percentage = percentages[index] || 0;
          const isSelected = selectedOption === index;
          const showResults = hasVoted || variant === 'creator';
          
          return (
            <div key={index} className="relative">
              <button
                className={`poll-option w-full text-left ${
                  isSelected ? 'selected' : ''
                } ${hasVoted ? 'cursor-default' : 'hover:bg-blue-50'}`}
                onClick={() => handleVote(index)}
                disabled={hasVoted || isVoting}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option}</span>
                  {showResults && (
                    <span className="text-sm font-semibold text-blue-600">
                      {percentage}%
                    </span>
                  )}
                </div>
                
                {showResults && (
                  <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-indigo-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                )}
              </button>
            </div>
          );
        })}
        
        {!hasVoted && variant === 'viewer' && (
          <div className="pt-2 text-center">
            <p className="text-sm text-gray-600">
              Select an option to see results
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
