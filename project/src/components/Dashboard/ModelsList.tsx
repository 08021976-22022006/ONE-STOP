import React from 'react';
import { useAWS } from '../../contexts/AWSContext';
import { Circle, MoreVertical, Play, Square, Trash2 } from 'lucide-react';
import clsx from 'clsx';

export default function ModelsList() {
  const { models, stopModel, deleteModel } = useAWS();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-50';
      case 'training': return 'text-blue-600 bg-blue-50';
      case 'deploying': return 'text-yellow-600 bg-yellow-50';
      case 'stopped': return 'text-gray-600 bg-gray-50';
      case 'failed': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Recent Models</h3>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {models.slice(0, 5).map((model) => (
            <div key={model.id} className="flex items-center justify-between p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <div className={clsx('p-2 rounded-lg', getStatusColor(model.status))}>
                  <Circle className="h-4 w-4" fill="currentColor" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">{model.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{model.type.replace('-', ' ')}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-900">
                  ${model.cost.total.toFixed(2)}
                </span>
                
                <div className="flex items-center space-x-1">
                  {model.status === 'active' && (
                    <button
                      onClick={() => stopModel(model.id)}
                      className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      title="Stop model"
                    >
                      <Square className="h-4 w-4" />
                    </button>
                  )}
                  {model.status === 'stopped' && (
                    <button
                      onClick={() => {/* Implement start model */}}
                      className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                      title="Start model"
                    >
                      <Play className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteModel(model.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                    title="Delete model"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}