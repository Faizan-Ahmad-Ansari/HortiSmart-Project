import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../services/authService';
import { Mail, Lock, Loader2, AlertCircle, ArrowRight, Sprout, ShieldCheck, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-slate-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Left side: Visual Branding */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="hidden lg:flex lg:w-7/12 relative bg-primary-600 overflow-hidden"
      >
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105 animate-slow-zoom"
          style={{ backgroundImage: 'url("/login-bg.png")' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/90 via-primary-800/60 to-transparent"></div>
        
        {/* Floating background elements */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl animate-pulse delay-700"></div>

        <div className="relative z-10 flex flex-col justify-center px-20 h-full text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl border border-white/30 shadow-2xl">
                <Sprout className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-4xl font-black tracking-tighter">Horti<span className="text-primary-300">Smart</span></h1>
            </div>
            
            <h2 className="text-6xl font-black mb-6 leading-tight max-w-lg italic">
              Empowering <span className="text-primary-400">Agriculture</span> through Intelligence.
            </h2>
            
            <div className="grid grid-cols-2 gap-6 mt-12">
              <div className="bg-[#059669] border-[#10b981]/30 p-6 rounded-[2rem] hover:scale-105 transition-all duration-300 group cursor-default shadow-2xl shadow-black/20">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 border border-white/30 group-hover:bg-white group-hover:text-[#059669] transition-colors">
                  <Zap className="w-6 h-6 text-white transition-colors" />
                </div>
                <h4 className="font-black text-xl mb-1 text-white">Real-time Data</h4>
                <p className="text-sm text-white font-bold opacity-90">Get instant market updates and trends.</p>
              </div>
              <div className="bg-[#059669] border-[#10b981]/30 p-6 rounded-[2rem] hover:scale-105 transition-all duration-300 group cursor-default shadow-2xl shadow-black/20">
                <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 border border-white/30 group-hover:bg-white group-hover:text-[#059669] transition-colors">
                  <ShieldCheck className="w-6 h-6 text-white transition-colors" />
                </div>
                <h4 className="font-black text-xl mb-1 text-white">Secure Insights</h4>
                <p className="text-sm text-white font-bold opacity-90">Advanced encryption for your business data.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 lg:px-24 py-12 bg-slate-50 dark:bg-slate-900/50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-md w-full mx-auto"
        >
          <div className="mb-12">
            <h2 className="text-4xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tight">Welcome Back!</h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">Please enter your details to sign in.</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="mb-8 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm"
              >
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="font-bold uppercase tracking-tight">{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-5">
              <div className="group">
                <label className="block text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-2 ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="email"
                    required
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary-500 dark:focus:border-primary-400 transition-all dark:text-white font-medium shadow-sm"
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="group">
                <div className="flex justify-between items-center mb-2 ml-1">
                  <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">Password</label>
                  <a href="#" className="text-[10px] font-black text-primary-600 uppercase tracking-tighter hover:underline">Forgot?</a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    type="password"
                    required
                    className="w-full bg-white dark:bg-slate-800 border-2 border-slate-100 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-4 outline-none focus:border-primary-500 dark:focus:border-primary-400 transition-all dark:text-white font-medium shadow-sm"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-8 ml-1">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-slate-200 text-primary-600 focus:ring-primary-500" />
              <label htmlFor="remember" className="text-xs font-bold text-slate-500 dark:text-slate-400 cursor-pointer">Remember for 30 days</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-primary-600 hover:bg-black dark:hover:bg-primary-700 text-white font-black uppercase tracking-widest py-5 rounded-2xl shadow-2xl shadow-slate-900/20 dark:shadow-primary-600/20 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 active:scale-[0.98]"
            >
              {loading ? (
                <Loader2 className="w-6 h-6 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-12 text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            Don't have an account?{' '}
            <Link to="/register" className="font-black text-primary-600 hover:text-primary-700 dark:text-primary-400">
              Join the future
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
