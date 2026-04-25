import React from 'react';
import { TrendingUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';

const StatCard = ({ title, value, subtext, trend, icon: Icon, colorClass }) => {
  return (
    <div className={`glass-card p-6 border-l-4 ${colorClass} transition-all duration-300`}>
      <div className="flex justify-between items-start mb-4">
        <div className="bg-slate-50 dark:bg-slate-800 p-2 rounded-lg">
          <Icon className="w-6 h-6 text-slate-600 dark:text-slate-300" />
        </div>
        {trend && (
           <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-full uppercase tracking-tighter">
             {trend}
           </span>
        )}
      </div>
      <h3 className="text-slate-500 dark:text-slate-400 text-sm font-medium">{title}</h3>
      <div className="flex items-baseline gap-2 mt-1">
        <span className="text-2xl font-bold text-slate-800 dark:text-slate-100">{value}</span>
        {trend && (
          <span className={`text-xs font-bold flex items-center ${trend.startsWith('+') ? 'text-primary-600 dark:text-primary-400' : 'text-red-500 dark:text-red-400'}`}>
            {trend.startsWith('+') ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">{subtext}</p>
    </div>
  );
};

export default StatCard;
