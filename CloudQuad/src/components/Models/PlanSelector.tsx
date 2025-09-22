import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Crown, Shield, Settings } from 'lucide-react';
import clsx from 'clsx';

export default function PlanSelector() {
  const { user, updatePlan } = useAuth();

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Deployment Target</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Free Plan */}
        <div 
          className={clsx(
            'border-2 rounded-xl p-6 cursor-pointer transition-all',
            user?.plan === 'free' 
              ? 'border-blue-500 bg-blue-50' 
              : 'border-gray-200 hover:border-gray-300'
          )}
          onClick={() => updatePlan('free')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Shield className="h-6 w-6 text-blue-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Free Sandbox</h4>
            </div>
            {user?.plan === 'free' && (
              <div className="h-4 w-4 bg-blue-600 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Deploy to our managed AWS environment</li>
            <li>• No AWS credentials required</li>
            <li>• Limited instance types</li>
            <li>• Shared resources</li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-2xl font-bold text-gray-900">Free</span>
            <span className="text-sm text-gray-500 ml-2">Resource limits apply</span>
          </div>
        </div>

        {/* Premium Plan */}
        <div 
          className={clsx(
            'border-2 rounded-xl p-6 cursor-pointer transition-all',
            user?.plan === 'premium' 
              ? 'border-yellow-500 bg-yellow-50' 
              : 'border-gray-200 hover:border-gray-300'
          )}
          onClick={() => updatePlan('premium')}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Crown className="h-6 w-6 text-yellow-600 mr-2" />
              <h4 className="text-lg font-semibold text-gray-900">Premium</h4>
            </div>
            {user?.plan === 'premium' && (
              <div className="h-4 w-4 bg-yellow-600 rounded-full flex items-center justify-center">
                <div className="h-2 w-2 bg-white rounded-full"></div>
              </div>
            )}
          </div>
          
          <ul className="space-y-2 text-sm text-gray-600">
            <li>• Deploy to your AWS account</li>
            <li>• Full control over resources</li>
            <li>• GPU instances available</li>
            <li>• Dedicated infrastructure</li>
          </ul>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-2xl font-bold text-gray-900">$29</span>
            <span className="text-sm text-gray-500 ml-2">per month</span>
          </div>
        </div>
      </div>

      {user?.plan === 'premium' && (
        <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="flex items-start">
            <Settings className="h-5 w-5 text-yellow-600 mr-2 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-900">AWS Credentials Required</h5>
              <p className="text-sm text-yellow-700 mt-1">
                To deploy to your AWS account, you'll need to provide your AWS credentials in the settings.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}