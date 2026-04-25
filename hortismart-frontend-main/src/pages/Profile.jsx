import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProfile, updateProfile, logout } from '../services/authService';
import { User as UserIcon, Mail, MapPin, Bell, Shield, LogOut, ChevronRight, Settings, Sprout, Loader2, CheckCircle, AlertCircle, Phone } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    preferredCrops: [],
    alertEmail: '',
    dailyTipsEnabled: false
  });
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [status, setStatus] = useState(null); // 'success' | 'error'

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getProfile();
        setFormData(data);
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const handleUpdate = async () => {
    try {
      setUpdating(true);
      await updateProfile(formData);
      setStatus('success');
      setTimeout(() => setStatus(null), 3000);
    } catch (err) {
      setStatus('error');
      console.error(err);
    } finally {
      setUpdating(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleCrop = (crop) => {
    setFormData(prev => ({
      ...prev,
      preferredCrops: prev.preferredCrops.includes(crop)
        ? prev.preferredCrops.filter(c => c !== crop)
        : [...prev.preferredCrops, crop]
    }));
  };
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <Loader2 className="w-10 h-10 text-primary-600 animate-spin" />
        <p className="mt-4 text-slate-500 font-bold uppercase tracking-widest text-xs">Syncing Identity...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-top-4 duration-500">
      <header className="flex items-center gap-6 pb-8 border-b border-slate-100 dark:border-slate-800 transition-colors">
        <div className="w-24 h-24 rounded-3xl bg-primary-600 flex items-center justify-center text-white shadow-2xl shadow-primary-200 relative group overflow-hidden">
          <UserIcon className="w-12 h-12" />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
            <Settings className="w-6 h-6 text-white" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-slate-100 italic">{formData.name}</h1>
          <p className="text-slate-500 dark:text-slate-400 font-bold flex items-center gap-2 uppercase tracking-tighter text-xs mt-1">
            <MapPin className="w-3.5 h-3.5" /> {formData.location}
          </p>
          <div className="flex gap-2 mt-4">
             <span className="bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-primary-100 dark:border-primary-800">Verified Farmer</span>
             <span className="bg-amber-50 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100 dark:border-amber-800">Pro Member</span>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Account Settings */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Account settings</h2>
          <div className="glass-card divide-y divide-slate-50 dark:divide-slate-800 overflow-hidden">
            {[
              { icon: Mail, label: 'Email Address', value: formData.email, color: 'text-blue-500' },
              { icon: Phone, label: 'Phone Number', value: formData.phone || 'Not set', color: 'text-emerald-600' },
              { icon: Shield, label: 'Security Status', value: 'Identity Verified', color: 'text-primary-600' },
              { icon: Sprout, label: 'Active Preferences', value: formData.preferredCrops?.join(', ') || 'None', color: 'text-amber-500' },
            ].map((item, idx) => (
              <button key={idx} className="w-full flex items-center justify-between p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-800 group-hover:bg-white dark:group-hover:bg-slate-700 transition-colors`}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                  </div>
                  <div className="text-left">
                    <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-tighter">{item.label}</p>
                    <p className="text-sm font-bold text-slate-700 dark:text-slate-200">{item.value}</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 group-hover:text-primary-600 dark:group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>
        </section>

        {/* Subscription / Preferences */}
        <section className="space-y-4">
          <h2 className="text-sm font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest ml-1">Daily Alerts Subscription</h2>
          <div className="glass-card p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 ml-1">Your Name</label>
                <input 
                  type="text" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-1 ml-1">Alert Email Address (for Tips)</label>
                <input 
                  type="email" 
                  placeholder="Where should we send tips?"
                  value={formData.alertEmail}
                  onChange={(e) => setFormData({...formData, alertEmail: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-800 border-none rounded-xl px-4 py-3 text-sm font-bold text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-primary-500 transition-all"
                />
              </div>
              
              <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-100 dark:border-slate-700">
                <div>
                  <p className="text-xs font-black text-slate-700 dark:text-slate-200 uppercase tracking-tighter">Daily Buy/Sell Tips</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Sent every morning at 6 AM</p>
                </div>
                <button 
                  onClick={() => setFormData({...formData, dailyTipsEnabled: !formData.dailyTipsEnabled})}
                  className={`w-12 h-6 rounded-full transition-all relative ${formData.dailyTipsEnabled ? 'bg-primary-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                >
                  <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.dailyTipsEnabled ? 'left-7' : 'left-1'}`} />
                </button>
              </div>

              <div>
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block mb-3 ml-1">Preferred Crops</label>
                <div className="flex flex-wrap gap-2">
                  {['Tomato', 'Potato', 'Onion', 'Mango', 'Chilli'].map(crop => (
                    <button
                      key={crop}
                      onClick={() => toggleCrop(crop)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        formData.preferredCrops.includes(crop)
                          ? 'bg-primary-600 text-white shadow-md shadow-primary-200'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {crop}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleUpdate}
              disabled={updating}
              className={`w-full flex items-center justify-center gap-2 p-4 rounded-2xl font-black uppercase tracking-widest text-xs transition-all ${
                status === 'success' ? 'bg-emerald-500 text-white' : 
                status === 'error' ? 'bg-red-500 text-white' : 
                'bg-slate-900 dark:bg-primary-600 text-white hover:bg-primary-600 dark:hover:bg-primary-500'
              }`}
            >
              {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : 
               status === 'success' ? <CheckCircle className="w-4 h-4" /> : 
               status === 'error' ? <AlertCircle className="w-4 h-4" /> : null}
              {status === 'success' ? 'Updated!' : status === 'error' ? 'Update Failed' : 'Save Changes'}
            </button>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 p-4 text-red-500 font-black uppercase tracking-widest text-xs border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-2xl hover:bg-red-50 dark:hover:bg-red-950/20 hover:border-red-100 dark:hover:border-red-900/50 transition-all mt-4"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </section>
      </div>
    </div>
  );
};

export default Profile;
