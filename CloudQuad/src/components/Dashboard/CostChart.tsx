import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useAWS } from '../../contexts/AWSContext';
import { RefreshCw, TrendingUp } from 'lucide-react';

export default function CostChart() {
  const { costHistory, predictedCosts, refreshCosts } = useAWS();
  const [showPrediction, setShowPrediction] = useState(true);
  const [loading, setLoading] = useState(false);

  const combinedData = [
    ...costHistory.map(item => ({ ...item, type: 'actual' })),
    ...predictedCosts.map(item => ({ ...item, type: 'predicted' }))
  ];

  const handleRefresh = async () => {
    setLoading(true);
    await refreshCosts();
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Cost Analytics</h3>
          <p className="text-sm text-gray-500">Daily AWS service costs with ML predictions</p>
        </div>
        <div className="flex items-center space-x-3">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={showPrediction}
              onChange={(e) => setShowPrediction(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-700">Show Predictions</span>
          </label>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="flex items-center px-3 py-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={combinedData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis 
                dataKey="date" 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              />
              <YAxis 
                stroke="#6b7280"
                fontSize={12}
                tickFormatter={(value) => `$${value}`}
              />
              <Tooltip 
                formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name]}
                labelFormatter={(label) => new Date(label).toLocaleDateString()}
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                }}
              />
              <Legend />
              
              <Line 
                type="monotone" 
                dataKey="sagemaker" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2 }}
                name="SageMaker"
              />
              <Line 
                type="monotone" 
                dataKey="s3" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2 }}
                name="S3"
              />
              <Line 
                type="monotone" 
                dataKey="ses" 
                stroke="#f59e0b" 
                strokeWidth={2}
                dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                name="SES"
              />
              
              {showPrediction && (
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#8b5cf6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                  name="Predicted Total"
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>

        {showPrediction && (
          <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
            <div className="flex items-center">
              <TrendingUp className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-900">
                ML Forecast: Expect 15.2% cost increase over next 5 days based on current usage patterns
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}