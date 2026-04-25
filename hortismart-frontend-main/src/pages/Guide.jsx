import React from 'react';
import { BookOpen, TrendingUp, ShieldCheck, MapPin, Lightbulb, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Guide = () => {
  const navigate = useNavigate();

  const sections = [
    {
      title: "Market Intelligence",
      icon: TrendingUp,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      content: "Use the Price Prediction tool to analyze 12-month forecasts. Our AI models analyze seasonal trends, harvest cycles, and historical mandi data to help you decide the best time to sell."
    },
    {
      title: "Storage Strategy",
      icon: MapPin,
      color: "text-blue-600",
      bg: "bg-blue-50",
      content: "Don't sell in haste during a glut. Use the Storage Locator to find cold storage facilities near you. Storing your produce for just 2-3 weeks can often increase your profit margin by 15-20%."
    },
    {
      title: "Quality Standards",
      icon: ShieldCheck,
      color: "text-amber-600",
      bg: "bg-amber-50",
      content: "Ensure your produce meets 'Fair Average Quality' (FAQ) standards. Sorting and grading your crops at the farm gate can fetch you higher prices than bulk un-sorted selling."
    },
    {
      title: "Value Addition",
      icon: Lightbulb,
      color: "text-purple-600",
      bg: "bg-purple-50",
      content: "Explore the Value Addition tab to learn about simple processing techniques like drying, powdering, or pickling that can turn perishable produce into high-value shelf-stable products."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-12 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-500 hover:text-primary-600 transition-colors mb-8 font-semibold"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Dashboard
      </button>

      <header className="text-center mb-16">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary-600 text-white shadow-xl shadow-primary-200 mb-6">
          <BookOpen className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black text-slate-800 dark:text-slate-100 mb-4 tracking-tight">HortiSmart User Guide</h1>
        <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
          Master the art of smart horticulture marketing with our comprehensive guide to maximizing profits and reducing waste.
        </p>
      </header>

      <div className="grid gap-8">
        {sections.map((section, index) => (
          <div 
            key={index} 
            className="glass-card p-8 group hover:border-primary-200 dark:hover:border-primary-900 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`flex-shrink-0 w-14 h-14 ${section.bg} ${section.color} rounded-2xl flex items-center justify-center`}>
                <section.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-3">{section.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {section.content}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-16 p-8 rounded-3xl bg-slate-900 text-white text-center">
        <h4 className="text-xl font-bold mb-2">Still have questions?</h4>
        <p className="text-slate-400 mb-6">Our support team is available 24/7 to help you with your agricultural needs.</p>
        <button className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-all transform hover:scale-105">
          Contact Support
        </button>
      </footer>
    </div>
  );
};

export default Guide;
