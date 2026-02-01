import { ArrowRight, Box, Clock, Truck, CheckCircle, TrendingUp } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="space-y-10 pb-20">
      
      {/* Hero / Welcome Section */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 p-8 md:p-12 text-white shadow-2xl shadow-blue-900/20">
        <div className="relative z-10 max-w-2xl space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-blue-100">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
            System Operational
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Track your logistics <br/>
            <span className="text-blue-200">at the speed of business.</span>
          </h1>
          <p className="text-lg text-blue-100/80 leading-relaxed max-w-xl">
            Real-time insights into your global supply chain. Monitor shipments, predict delays, and optimize delivery routes instantly.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
             <button className="px-6 py-3 bg-white text-blue-700 font-bold rounded-xl hover:bg-blue-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-black/10 flex items-center gap-2">
               View Live Map <ArrowRight className="w-4 h-4" />
             </button>
             <button className="px-6 py-3 bg-blue-800/50 backdrop-blur-sm border border-white/10 text-white font-semibold rounded-xl hover:bg-blue-800/70 transition-all duration-300">
               Download Report
             </button>
          </div>
        </div>
        
        {/* Abstract decoration */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-64 h-64 bg-indigo-500/30 rounded-full blur-2xl"></div>
      </div>

      {/* Metric Cards - Glassmorphism Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: 'Total Shipments', value: '1,284', change: '+12.5%', icon: Box, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'In Transit', value: '432', change: '+3.2%', icon: Truck, color: 'text-orange-600', bg: 'bg-orange-50' },
          { label: 'Avg. Delivery Time', value: '2.4 Days', change: '-10%', icon: Clock, color: 'text-purple-600', bg: 'bg-purple-50' },
          { label: 'Delivered (This Week)', value: '845', change: '+24%', icon: CheckCircle, color: 'text-green-600', bg: 'bg-green-50' }
        ].map((stat, i) => (
          <div key={i} className="group relative overflow-hidden bg-white border border-slate-100 rounded-2xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
             <div className="flex items-start justify-between">
                <div>
                   <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                   <h3 className="text-3xl font-bold text-slate-800 mt-2">{stat.value}</h3>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform duration-300`}>
                   <stat.icon className="w-6 h-6" />
                </div>
             </div>
             <div className="mt-4 flex items-center gap-2">
                <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${stat.change.startsWith('+') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                  {stat.change}
                </span>
                <span className="text-xs text-slate-400">vs last month</span>
             </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Chart Area Placeholder */}
        <div className="lg:col-span-2 bg-white border border-slate-100 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold text-slate-800">Shipment Volume</h3>
            <button className="p-2 hover:bg-slate-50 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
              <TrendingUp className="w-5 h-5" />
            </button>
          </div>
          <div className="h-64 w-full bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Interactive Chart Component Loading...</p>
            </div>
          </div>
        </div>

        {/* Recent Shipments List */}
        <div className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Recent Updates</h3>
          <div className="space-y-6 flex-1 overflow-y-auto max-h-[400px] pr-2 scrollbar-thin scrollbar-thumb-slate-200">
            {[1, 2, 3, 4, 5].map((item) => (
              <div key={item} className="flex gap-4 group cursor-pointer hover:bg-slate-50 p-2 rounded-lg transition-colors -mx-2">
                <div className="relative flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100 z-10 relative">
                    <Package className="w-5 h-5" />
                  </div>
                  {item !== 5 && <div className="absolute top-10 left-1/2 -ml-px w-0.5 h-full bg-slate-100"></div>}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">Shipment #TRK-892{item}</p>
                  <p className="text-xs text-slate-500 mt-1">Arrived at sorting facility in Chicago, IL</p>
                  <p className="text-[10px] font-semibold text-slate-400 mt-2 uppercase tracking-wide">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 border border-slate-200 text-slate-600 font-semibold rounded-xl hover:bg-slate-50 transition-colors text-sm">
            View All History
          </button>
        </div>
      </div>
    </div>
  );
}
