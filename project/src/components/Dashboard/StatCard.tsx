import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import clsx from 'clsx';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend: string;
  trendUp: boolean;
}

export default function StatCard({ title, value, icon: Icon, trend, trendUp }: StatCardProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="h-12 w-12 bg-blue-50 rounded-lg flex items-center justify-center">
          <Icon className="h-6 w-6 text-blue-600" />
        </div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={clsx(
          'text-sm font-medium',
          trendUp ? 'text-green-600' : 'text-red-600'
        )}>
          {trend}
        </span>
        <span className="text-sm text-gray-500 ml-2">vs last period</span>
      </div>
    </div>
  );
}