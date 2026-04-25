import React, { useState, useEffect } from 'react';
import { getMarketPrices } from '../services/marketService';
import { ArrowRight, TrendingUp, Cpu, ShoppingCart, Zap, Sparkles, Loader2 } from 'lucide-react';

const ValueAddition = () => {
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const prices = await getMarketPrices();
        
        // Deduplicate prices by crop name
        const uniquePrices = [];
        const seenCrops = new Set();
        for (const item of prices) {
          if (!seenCrops.has(item.crop)) {
            uniquePrices.push(item);
            seenCrops.add(item.crop);
          }
        }

        // Product lookup table for common crops
        const productLookup = {
          'Tomato': ['Puree', 'Ketchup', 'Sun-dried'],
          'Mango': ['Juice', 'Pickle', 'Amchur'],
          'Potato': ['Chips', 'Starch', 'Fries'],
          'Onion': ['Powder', 'Flakes', 'Oil'],
          'Apple': ['Cider', 'Jam', 'Chips'],
          'Banana': ['Chips', 'Fiber', 'Powder'],
          'Chilli': ['Pickle', 'Powder', 'Paste'],
          'Carrot': ['Juice', 'Pickle', 'Jam'],
        };

        const mappedData = uniquePrices.slice(0, 12).map(item => {
          const rawPrice = item.price;
          const processedPrice = rawPrice * 5;
          return {
            crop: item.crop,
            products: productLookup[item.crop] || ['Extracted Oil', 'Dried Flakes', 'Powder'],
            rawPrice: rawPrice,
            processedPrice: processedPrice,
            profitIncrease: '400%'
          };
        });
        setSuggestions(mappedData);
      } catch (err) {
        console.error('Failed to fetch market data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="space-y-8 pb-10">
      <header className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest transition-colors">
          <Sparkles className="w-4 h-4" />
          Value Addition Engine
        </div>
        <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100">Maximize Your Harvest Profit</h1>
        <p className="text-slate-500 dark:text-slate-400 font-medium">Smart processing suggestions to turn your raw crops into high-value products.</p>
      </header>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 space-y-4">
          <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
          <p className="text-slate-500 font-bold uppercase tracking-widest text-sm">Analyzing Market Opportunities...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {suggestions.map((suggestion, idx) => (
            <div key={idx} className="glass-card overflow-hidden group hover:-translate-y-2 transition-transform duration-300">
              <div className="primary-gradient p-6 text-white h-40 flex flex-col justify-between relative">
                <Zap className="absolute top-6 right-6 w-12 h-12 text-white/10" />
                <h3 className="text-2xl font-black">{suggestion.crop}</h3>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm self-start px-3 py-1 rounded-full border border-white/20">
                  <TrendingUp className="w-4 h-4 text-white" />
                  <span className="text-lg font-black">{suggestion.profitIncrease}</span>
                  <span className="text-[10px] opacity-80 uppercase">Profit Spike</span>
                </div>
              </div>
              
              <div className="p-6 space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 mb-1">Raw Price</p>
                    <p className="text-xl font-bold text-slate-400 dark:text-slate-500">₹{suggestion.rawPrice}/kg</p>
                  </div>
                  <ArrowRight className="w-6 h-6 text-primary-300 dark:text-primary-700" />
                  <div className="text-center">
                    <p className="text-[10px] uppercase font-bold text-primary-500 dark:text-primary-400 mb-1">Processed</p>
                    <p className="text-2xl font-black text-primary-700 dark:text-primary-400">₹{suggestion.processedPrice}/kg</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Cpu className="w-4 h-4" />
                    Suggested Products
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {suggestion.products.map(p => (
                      <span key={p} className="bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 px-3 py-1.5 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-primary-600 text-white rounded-xl font-bold text-sm shadow-xl shadow-slate-200 dark:shadow-none hover:bg-primary-600 dark:hover:bg-primary-500 transition-colors">
                  Explore Plan
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-16 glass-card p-10 primary-gradient text-white border-none flex flex-col md:flex-row items-center gap-10">
        <div className="flex-1 space-y-4">
          <h2 className="text-3xl font-black">Want a Custom Analysis?</h2>
          <p className="text-white/80 font-medium">Upload your harvest details and we'll calculate the best processing strategy for your specific grade and quantity.</p>
          <div className="flex gap-4 pt-4">
            <button className="bg-white text-primary-700 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-colors">
              Get Started
            </button>
            <button className="border border-white/30 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors">
              Read Guides
            </button>
          </div>
        </div>
        <div className="w-full md:w-1/3 bg-white/10 backdrop-blur-xl rounded-3xl p-8 border border-white/10 dark:bg-slate-900/30">
           <div className="space-y-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-6 bg-white/10 dark:bg-white/5 rounded-full w-full animate-pulse"></div>
              ))}
              <div className="h-12 bg-white/20 dark:bg-primary-600/50 rounded-2xl w-2/3 mx-auto mt-8"></div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ValueAddition;
