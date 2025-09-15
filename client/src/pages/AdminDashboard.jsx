import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import DashSidebar from '../components/DashSidebar.jsx';
import DashPosts from '../components/DashPosts.jsx';
import DashUsers from '../components/DashUsers.jsx';
import DashTutorials from '../components/DashTutorials.jsx';
import DashQuizzes from '../components/DashQuizzes.jsx';
import DashComments from '../components/DashComments.jsx';
import DashProfile from '../components/DashProfile.jsx';
import Dashboard from './Dashboard.jsx';

export default function AdminDashboard() {
  const location = useLocation();
  const [tab, setTab] = useState('dash');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

  const renderTab = () => {
    switch (tab) {
      case 'posts':
        return <DashPosts />;
      case 'users':
        return <DashUsers />;
      case 'tutorials':
        return <DashTutorials />;
      case 'quizzes':
        return <DashQuizzes />;
      case 'comments':
        return <DashComments />;
      case 'profile':
        return <DashProfile />;
      case 'dash':
      default:
        return <Dashboard />;
    }
  };

  return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="md:w-56">
          <DashSidebar />
        </div>
        <div className="flex-1 p-4">
          {renderTab()}
        </div>
      </div>
  );
}