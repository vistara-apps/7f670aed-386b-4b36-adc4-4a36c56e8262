'use client';

import { useState } from 'react';
import { Poll } from '@/lib/types';
import { POLL_TYPES } from '@/lib/constants';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { BarChart3, Plus, X } from 'lucide-react';

interface CreatePollFormProps {
  onSubmit: (poll: Omit<Poll, 'pollId' | 'influencerId' | 'createdAt' | 'results'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
}

export function CreatePollForm({ onSubmit, onCancel, isLoading }: CreatePollFormProps) {
  const [formData, setFormData] = useState({
    question: '',
    type: 'product_preference' as Poll['type'],
    options: ['', ''],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = formData.options.filter(option => option.trim());
    if (formData.question.trim() && validOptions.length >= 2) {
      onSubmit({
        question: formData.question.trim(),
        type: formData.type,
        options: validOptions,
      });
    }
  };

  const addOption = () => {
    if (formData.options.length < 6) {
      setFormData({
        ...formData,
        options: [...formData.options, ''],
      });
    }
  };

  const removeOption = (index: number) => {
    if (formData.options.length > 2) {
      setFormData({
        ...formData,
        options: formData.options.filter((_, i) => i !== index),
      });
    }
  };

  const updateOption = (index: number, value: string) => {
    const newOptions = [...formData.options];
    newOptions[index] = value;
    setFormData({ ...formData, options: newOptions });
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          Create New Poll
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Poll Question */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Poll Question
            </label>
            <Input
              placeholder="What's your favorite product category?"
              value={formData.question}
              onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              required
            />
          </div>

          {/* Poll Type */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Poll Type
            </label>
            <div className="space-y-2">
              {Object.entries(POLL_TYPES).map(([key, type]) => (
                <button
                  key={key}
                  type="button"
                  className={`w-full p-3 border rounded-lg text-left transition-all duration-200 ${
                    formData.type === key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setFormData({ ...formData, type: key as Poll['type'] })}
                >
                  <div className="font-medium">{type.name}</div>
                  <div className="text-sm text-gray-600">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Poll Options */}
          <div>
            <label className="block text-sm font-medium mb-3">
              Poll Options
            </label>
            <div className="space-y-3">
              {formData.options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => updateOption(index, e.target.value)}
                    required
                  />
                  {formData.options.length > 2 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => removeOption(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
              
              {formData.options.length < 6 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={addOption}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Option
                </Button>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1"
            >
              {isLoading ? 'Creating...' : 'Create Poll'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
