import React from 'react';
import { TrendingUp, Target, MessageSquare } from 'lucide-react';
import clsx from 'clsx';

interface ModelTypeSelectorProps {
  value: 'linear-regression' | 'xgboost' | 'llm';
  onChange: (value: 'linear-regression' | 'xgboost' | 'llm') => void;
}

export default function ModelTypeSelector({ value, onChange }: ModelTypeSelectorProps) {
  const modelTypes = [
    {
      id: 'linear-regression' as const,
      name: 'Linear Regression',
      icon: TrendingUp,
      description: 'Predict continuous values',
      useCase: 'Sales forecasting, price prediction',
      complexity: 'Simple'
    },
    {
      id: 'xgboost' as const,
      name: 'XGBoost',
      icon: Target,
      description: 'Advanced classification/regression',
      useCase: 'Customer churn, risk analysis',
      complexity: 'Medium'
    },
    {
      id: 'llm' as const,
      name: 'Large Language Model',
      icon: MessageSquare,
      description: 'Text generation and analysis',
      useCase: 'Chatbots, content generation',
      complexity: 'Advanced'
    }
  ];

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Model Type
      </label>
      <div className="space-y-3">
        {modelTypes.map((type) => (
          <div
            key={type.id}
            className={clsx(
              'border-2 rounded-lg p-4 cursor-pointer transition-all',
              value === type.id 
                ? 'border-blue-500 bg-blue-50' 
                : 'border-gray-200 hover:border-gray-300'
            )}
            onClick={() => onChange(type.id)}
          >
            <div className="flex items-start">
              <div className={clsx(
                'p-2 rounded-lg mr-3 mt-0.5',
                value === type.id ? 'bg-blue-100' : 'bg-gray-100'
              )}>
                <type.icon className={clsx(
                  'h-4 w-4',
                  value === type.id ? 'text-blue-600' : 'text-gray-600'
                )} />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{type.name}</h4>
                  <span className={clsx(
                    'text-xs px-2 py-1 rounded-full',
                    type.complexity === 'Simple' ? 'bg-green-100 text-green-800' :
                    type.complexity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  )}>
                    {type.complexity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                <p className="text-xs text-gray-500 mt-1">{type.useCase}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}