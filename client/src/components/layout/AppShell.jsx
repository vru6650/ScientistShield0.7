import { useState } from 'react';
import TopNav from './TopNav.jsx';
import Sidebar from './Sidebar.jsx';
import Footer from '../Footer.jsx';
import { Toaster } from 'sonner';

export default function AppShell({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-gray-50">
      <TopNav onMenuClick={() => setOpen(true)} />
      <div className="flex">
        <Sidebar open={open} onClose={() => setOpen(false)} />
        <main className="flex-1 pt-16 md:ml-64">
          <div className="mx-auto max-w-7xl p-4 md:p-8">{children}</div>
        </main>
      </div>
      <Footer />
      <Toaster position="top-right" richColors />
    </div>
  );
}
