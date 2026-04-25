import React from 'react';

const NotificationItem = ({ message, time, type }) => {
  return (
    <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 group hover:border-primary-100 dark:hover:border-primary-900/50 hover:bg-white dark:hover:bg-slate-800 transition-all cursor-pointer">
      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">{message}</p>
      <div className="flex items-center gap-2 mt-2">
        <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest">{time}</span>
        <span className={`w-1 h-1 rounded-full ${type === 'price' ? 'bg-primary-500' : 'bg-amber-500'}`}></span>
      </div>
    </div>
  );
};

export default NotificationItem;
