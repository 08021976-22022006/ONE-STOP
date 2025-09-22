import React from 'react';
import { useAWS } from '../../contexts/AWSContext';
import { useAuth } from '../../contexts/AuthContext';
import StatCard from './StatCard';
import ModelsList from './ModelsList';
import CostChart from './CostChart';
import { DollarSign, Server, TrendingUp, Activity } from 'lucide-react';

export default function Dashboard() {
  const { models, costHistory, predictedCosts } = useAWS();
  const { user } = useAuth();

  const totalCost = models.reduce((sum, model) => sum + model.cost.total, 0);
  const activeModels = models.filter(model => model.status === 'active').length;
  const avgDailyCost = costHistory.length > 0 
    ? costHistory[costHistory.length - 1]?.total || 0 
    : 0;
  const predictedIncrease = predictedCosts.length > 0 
    ? ((predictedCosts[predictedCosts.length - 1]?.total || 0) - avgDailyCost) / avgDailyCost * 100
    : 0;

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.email?.split('@')[0]}
        </h1>
        <p className="text-gray-600 mt-2">
          Monitor your ML models and optimize your AWS costs
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Cost"
          value={`$${totalCost.toFixed(2)}`}
          icon={DollarSign}
          trend="+12.5%"
          trendUp={false}
        />
        <StatCard
          title="Active Models"
          value={activeModels.toString()}
          icon={Server}
          trend="+2"
          trendUp={true}
        />
        <StatCard
          title="Daily Average"
          value={`$${avgDailyCost.toFixed(2)}`}
          icon={Activity}
          trend="+8.2%"
          trendUp={true}
        />
        <StatCard
          title="Predicted Growth"
          value={`${predictedIncrease.toFixed(1)}%`}
          icon={TrendingUp}
          trend="Next 7 days"
          trendUp={predictedIncrease > 0}
        />
      </div>

      {/* Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cost Chart */}
        <div className="lg:col-span-2">
          <CostChart />
        </div>

        {/* Models List */}
        <div>
          <ModelsList />
        </div>
      </div>
    </div>
  );
}