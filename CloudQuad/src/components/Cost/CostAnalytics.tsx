import React, { useState } from 'react';
import { useAWS } from '../../contexts/AWSContext';
import { ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { DollarSign, TrendingUp, AlertTriangle, BarChart3 } from 'lucide-react';

export default function CostAnalytics() {
  const { models, costHistory, predictedCosts } = useAWS();
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d');

  const totalCost = models.reduce((sum, model) => sum + model.cost.total, 0);
  const serviceBreakdown = [
    { name: 'SageMaker', value: models.reduce((sum, model) => sum + model.cost.sagemaker, 0), color: '#3b82f6' },
    { name: 'S3', value: models.reduce((sum, model) => sum + model.cost.s3, 0), color: '#10b981' },
    { name: 'SES', value: models.reduce((sum, model) => sum + model.cost.ses, 0), color: '#f59e0b' }
  ];

  const combinedData = [
    ...costHistory.map(item => ({ ...item, type: 'actual' })),
    ...predictedCosts.map(item => ({ ...item, type: 'predicted' }))
  ];

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Cost Analytics</h1>
        <p className="text-gray-600 mt-2">
          Detailed analysis of your AWS ML infrastructure costs
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spend</p>
              <p className="text-2xl font-bold text-gray-900">${totalCost.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Avg Daily</p>
              <p className="text-2xl font-bold text-gray-900">
                ${costHistory.length ? (costHistory[costHistory.length - 1]?.total || 0).toFixed(2) : '0.00'}
              </p>
            </div>
            <BarChart3 className="h-8 w-8 text-green-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Predicted Growth</p>
              <p className="text-2xl font-bold text-green-600">+12.5%</p>
            </div>
            <TrendingUp className="h-8 w-8 text-purple-600" />
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Budget Alert</p>
              <p className="text-2xl font-bold text-yellow-600">78%</p>
            </div>
            <AlertTriangle className="h-8 w-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Cost Trend Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Cost Trends & Predictions</h3>
            <select 
              value={timeRange} 
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
            </select>
          </div>
          
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  stroke="#6b7280"
                  fontSize={12}
                  tickFormatter={(value) => new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                />
                <YAxis stroke="#6b7280" fontSize={12} tickFormatter={(value) => `$${value}`} />
                <Tooltip 
                  formatter={(value, name) => [`$${Number(value).toFixed(2)}`, name]}
                  labelFormatter={(label) => new Date(label).toLocaleDateString()}
                />
                <Legend />
                
                <Bar dataKey="sagemaker" fill="#3b82f6" name="SageMaker" />
                <Bar dataKey="s3" fill="#10b981" name="S3" />
                <Bar dataKey="ses" fill="#f59e0b" name="SES" />
                <Line 
                  type="monotone" 
                  dataKey="total" 
                  stroke="#8b5cf6" 
                  strokeWidth={3}
                  strokeDasharray="5 5"
                  name="Predicted Total"
                  dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Service Breakdown */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Service Breakdown</h3>
          
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={serviceBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {serviceBreakdown.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${Number(value).toFixed(2)}`} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {serviceBreakdown.map((service) => (
              <div key={service.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-3"
                    style={{ backgroundColor: service.color }}
                  />
                  <span className="text-sm text-gray-700">{service.name}</span>
                </div>
                <span className="text-sm font-medium text-gray-900">
                  ${service.value.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Per-Model Cost Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Per-Model Cost Analysis</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Model Name</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">SageMaker</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">S3</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">SES</th>
                <th className="text-right py-3 px-4 font-medium text-gray-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {models.map((model) => (
                <tr key={model.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{model.name}</td>
                  <td className="py-3 px-4 text-gray-600 capitalize">
                    {model.type.replace('-', ' ')}
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
                      model.status === 'active' ? 'bg-green-100 text-green-800' :
                      model.status === 'training' ? 'bg-blue-100 text-blue-800' :
                      model.status === 'stopped' ? 'bg-gray-100 text-gray-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {model.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    ${model.cost.sagemaker.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    ${model.cost.s3.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right text-gray-900">
                    ${model.cost.ses.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">
                    ${model.cost.total.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}