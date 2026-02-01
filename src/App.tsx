import { Routes, Route } from 'react-router-dom';
import AppShell from './components/layout/AppShell';
import Dashboard from './pages/Dashboard';

// Placeholder components for routes that don't exist yet
const Placeholder = ({ title }: { title: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center space-y-4">
    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
      <span className="text-2xl">🚧</span>
    </div>
    <h2 className="text-2xl font-bold text-slate-800">{title}</h2>
    <p className="text-slate-500 max-w-md">This feature is currently under development. Check back soon for updates.</p>
    <button className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors">
      Go Back Home
    </button>
  </div>
);

function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/shipments" element={<Placeholder title="Shipment Management" />} />
        <Route path="/analytics" element={<Placeholder title="Analytics & Reports" />} />
        <Route path="/settings" element={<Placeholder title="System Settings" />} />
        <Route path="*" element={<Placeholder title="404 - Page Not Found" />} />
      </Route>
    </Routes>
  );
}

export default App;
