import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import { UserPlus, Mail, Lock, MapPin, Phone, User, Loader2, AlertCircle, ArrowRight, Sprout, Globe, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    location: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      await register(formData);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-20 relative overflow-hidden">
      {/* Abstract Background Orbs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2"></div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Sidebar Info */}
        <div className="md:w-1/3 bg-primary-600 p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-primary-500/20 to-transparent"></div>
          <div className="relative z-10">
            <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl w-fit mb-6 border border-white/30">
              <Sprout className="w-6 h-6" />
            </div>
            <h2 className="text-3xl font-black italic mb-4 leading-tight">Begin Your <span className="text-primary-200">Journey.</span></h2>
            <p className="text-primary-100 text-sm font-medium leading-relaxed">Join thousands of farmers and traders using intelligence to grow their business.</p>
          </div>

          <div className="relative z-10 mt-12 space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <Globe className="w-5 h-5 text-primary-200" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-primary-300">Global Reach</p>
                <p className="text-[10px] text-primary-100 font-bold">Connect with markets everywhere.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/10">
                <Shield className="w-5 h-5 text-emerald-300" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-emerald-300">Total Privacy</p>
                <p className="text-[10px] text-primary-100 font-bold">Your data is always encrypted.</p>
              </div>
            </div>
          </div>
          
          <div className="relative z-10 mt-20">
             <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">© 2026 HortiSmart AI</p>
          </div>
        </div>

        {/* Registration Form */}
        <div className="flex-1 p-10 lg:p-14">
          <div className="mb-10">
            <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-2 italic tracking-tight">Create Account</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Join our community of modern agriculturalists.</p>
          </div>

          {error && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/30 p-4 rounded-2xl flex items-center gap-3 text-red-600 dark:text-red-400 text-sm font-bold uppercase tracking-tight"
            >
              <AlertCircle className="w-5 h-5" />
              {error}
            </motion.div>
          )}

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    name="name"
                    type="text"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary-500 dark:focus:border-primary-400 transition-all dark:text-white text-sm font-medium"
                    placeholder="Abhinav Kumar"
                    onChange={handleChange}
                  />
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="space-y-2">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone Number</label>
                <div className="relative group">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                  <input
                    name="phone"
                    type="text"
                    required
                    className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary-500 dark:focus:border-primary-400 transition-all dark:text-white text-sm font-medium"
                    placeholder="+91 91234 56789"
                    onChange={handleChange}
                  />
                </div>
              </motion.div>
            </div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  name="email"
                  type="email"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary-500 dark:focus:border-primary-400 transition-all dark:text-white text-sm font-medium"
                  placeholder="name@email.com"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Primary Location</label>
              <div className="relative group">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  name="location"
                  type="text"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary-500 dark:focus:border-primary-400 transition-all dark:text-white text-sm font-medium"
                  placeholder="Jaipur, Rajasthan"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Create Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-800/50 border-2 border-transparent rounded-2xl py-3.5 pl-11 pr-4 outline-none focus:bg-white dark:focus:bg-slate-800 focus:border-primary-500 dark:focus:border-primary-400 transition-all dark:text-white text-sm font-medium"
                  placeholder="Minimum 8 characters"
                  onChange={handleChange}
                />
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 dark:bg-primary-600 text-white font-black uppercase tracking-widest text-xs py-5 rounded-2xl shadow-xl shadow-slate-900/10 dark:shadow-primary-900/10 transition-all flex items-center justify-center gap-3 group disabled:opacity-70 mt-6"
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.button>
          </form>

          <p className="mt-10 text-center text-xs font-bold text-slate-500 dark:text-slate-400">
            Already a member?{' '}
            <Link to="/login" className="text-primary-600 hover:text-primary-700 font-black">
              Sign In Here
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;
