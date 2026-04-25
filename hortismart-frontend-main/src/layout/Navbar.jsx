import React from 'react';
import { Menu, Bell, User, Search, Sprout } from 'lucide-react';
import { Link } from 'react-router-dom';
import ThemeToggle from '../components/ThemeToggle';

const Navbar = ({ onMenuClick }) => {
  const [userName, setUserName] = React.useState('User');
  const [showNotifications, setShowNotifications] = React.useState(false);
  const user = JSON.parse(localStorage.getItem('user'));

  const notifications = [
    { id: 1, message: 'Tomato prices expected to rise by 15% next week.', time: '2h ago', type: 'price' },
    { id: 2, message: 'New cold storage facility opened in Jaipur.', time: '5h ago', type: 'info' },
    { id: 3, message: 'Daily market report is now available.', time: '1d ago', type: 'info' },
  ];
  
  React.useEffect(() => {
    if (user && user.name) setUserName(user.name);
  }, [user]);

  return (
    <nav className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-40 px-4 py-3 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>
        <Link to="/" className="flex items-center gap-2">
          <div className="bg-primary-600 p-1.5 rounded-lg shadow-sm">
            <Sprout className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-slate-800 dark:text-slate-100 tracking-tight hidden sm:block">
            Horti<span className="text-primary-600 dark:text-primary-400">Smart</span>
          </span>
        </Link>
      </div>

      <div className="flex-1 max-w-md mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search crops, regions or storages..."
            className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary-500 dark:focus:ring-primary-400 transition-all dark:text-slate-200 dark:placeholder-slate-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-4">
        <ThemeToggle />
        <div className="relative">
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className={`p-2 relative rounded-lg transition-all group ${showNotifications ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400'}`}
          >
            <Bell className={`w-5 h-5 ${showNotifications ? 'text-primary-600' : 'group-hover:text-primary-600 dark:group-hover:text-primary-400'}`} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-slate-900"></span>
          </button>

          {showNotifications && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowNotifications(false)}
              ></div>
              <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 z-20 py-4 animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                <div className="px-4 mb-4 flex items-center justify-between">
                  <h3 className="font-black text-slate-800 dark:text-slate-100 italic">Notifications</h3>
                  <span className="text-[10px] font-bold bg-primary-100 dark:bg-primary-900/30 text-primary-600 px-2 py-0.5 rounded-full uppercase">3 New</span>
                </div>
                <div className="space-y-1 max-h-96 overflow-y-auto">
                  {notifications.map((note) => (
                    <div key={note.id} className="px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer border-b border-slate-50 dark:border-slate-800 last:border-0">
                      <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{note.message}</p>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{note.time}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-xs font-bold text-primary-600 hover:underline">
                  Mark all as read
                </button>
              </div>
            </>
          )}
        </div>
        <Link 
          to="/profile"
          className="flex items-center gap-2 p-1 pl-1 pr-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors border border-slate-100 dark:border-slate-800"
        >
          <div className="w-8 h-8 rounded-full overflow-hidden bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center border border-primary-200 dark:border-primary-800">
            <img 
              src="/avatar.png" 
              alt="Profile" 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <User className="w-5 h-5 text-primary-700 dark:text-primary-400 hidden" />
          </div>
          <span className="text-sm font-bold text-slate-700 dark:text-slate-300 hidden sm:block">{userName}</span>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
