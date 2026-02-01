import { Outlet, NavLink } from 'react-router-dom';
import { LayoutDashboard, Package, BarChart3, Settings, Bell, Search, Menu, X, ChevronDown, MapPin } from 'lucide-react';
import { useState } from 'react';

export default function AppShell() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-slate-50 overflow-hidden font-sans text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-40 w-72 bg-white border-r border-slate-200 
        transform transition-transform duration-300 ease-in-out flex flex-col shadow-xl md:shadow-none
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="h-20 flex items-center px-8 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-lg shadow-blue-500/30">
              <MapPin className="w-5 h-5" />
            </div>
            <span className="text-xl font-black tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-blue-500">
              TrackFlow
            </span>
          </div>
          <button 
            className="ml-auto md:hidden text-slate-400 hover:text-slate-600"
            onClick={() => setIsSidebarOpen(false)}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4 px-4">Menu</div>
            
            <NavLink 
              to="/" 
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <LayoutDashboard className="w-5 h-5 transition-transform group-hover:scale-110" />
              Dashboard
            </NavLink>

            <NavLink 
              to="/shipments" 
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <Package className="w-5 h-5 transition-transform group-hover:scale-110" />
              Shipments
            </NavLink>

            <NavLink 
              to="/analytics" 
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <BarChart3 className="w-5 h-5 transition-transform group-hover:scale-110" />
              Analytics
            </NavLink>

            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mt-8 mb-4 px-4">System</div>

            <NavLink 
              to="/settings" 
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 group
                ${isActive 
                  ? 'bg-blue-50 text-blue-700 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-900'}
              `}
            >
              <Settings className="w-5 h-5 transition-transform group-hover:scale-110" />
              Settings
            </NavLink>
        </nav>

        <div className="p-6 border-t border-slate-100">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white">
              TF
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate group-hover:text-blue-700 transition-colors">TrackFlow Inc.</p>
              <p className="text-xs text-slate-500 truncate">Enterprise Plan</p>
            </div>
            <ChevronDown className="w-4 h-4 text-slate-400" />
          </div>
        </div>
      </aside>
      
      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative bg-slate-50/50">
        {/* Header */}
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-6 md:px-10 z-20 sticky top-0 transition-all">
           <div className="flex items-center gap-4">
             <button 
               className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-lg transition-colors"
               onClick={() => setIsSidebarOpen(true)}
             >
               <Menu className="w-6 h-6" />
             </button>
             <div className="hidden md:flex flex-col">
               <h2 className="text-lg font-bold text-slate-800 tracking-tight">Dashboard Overview</h2>
               <p className="text-xs text-slate-500 font-medium">Welcome back, Logistics Manager</p>
             </div>
           </div>

           <div className="flex items-center gap-3 md:gap-6">
              {/* Search Bar - Hidden on small mobile */}
              <div className="hidden md:flex items-center px-4 py-2 bg-slate-100/50 hover:bg-slate-100 border border-slate-200 rounded-full w-64 transition-all focus-within:w-80 focus-within:bg-white focus-within:shadow-md focus-within:border-blue-200">
                <Search className="w-4 h-4 text-slate-400 mr-2" />
                <input 
                  type="text" 
                  placeholder="Search tracking #..." 
                  className="bg-transparent border-none outline-none text-sm w-full placeholder:text-slate-400 text-slate-700"
                />
              </div>

              <div className="h-8 w-px bg-slate-200 mx-2 hidden md:block"></div>

              <button className="relative p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-blue-600 transition-all duration-300">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
              </button>
              
              <button className="px-4 py-2 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/20 active:scale-95 transition-all duration-200 hidden md:block">
                + New Shipment
              </button>
           </div>
        </header>

        {/* Scrollable Page Content */}
        <div className="flex-1 overflow-auto scroll-smooth">
           <div className="container mx-auto px-4 py-8 md:p-10 max-w-7xl">
             <Outlet />
           </div>
        </div>
      </main>
    </div>
  );
}
