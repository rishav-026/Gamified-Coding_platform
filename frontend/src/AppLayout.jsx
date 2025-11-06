import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import { useAuth } from './hooks/useAuth';

const AppLayout = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Don't show navbar on home page (or show it only for authenticated users)
  const isHomePage = location.pathname === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar - Always show except maybe on home */}
      <Navbar />
      
      {/* Main Content */}
      <main>
        <div className="container-custom py-8">
          {/* Outlet renders the matched page */}
          <Outlet />
        </div>
      </main>

      {/* Footer (optional) */}
      <footer className="bg-gray-900 text-white py-8 mt-12">
        <div className="container-custom text-center">
          <p>&copy; 2024 CodeQuest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default AppLayout;
