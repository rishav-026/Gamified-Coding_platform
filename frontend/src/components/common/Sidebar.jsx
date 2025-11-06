import React from 'react';
import { Link } from 'react-router-dom';
import { FaTh, FaGraduationCap, FaTrophy, FaChartLine, FaUser, FaCog } from 'react-icons/fa';

const Sidebar = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <FaTh />, label: 'Dashboard', path: '/dashboard' },
    { icon: <FaGraduationCap />, label: 'Quests', path: '/quests' },
    { icon: <FaTrophy />, label: 'Leaderboard', path: '/leaderboard' },
    { icon: <FaChartLine />, label: 'Analytics', path: '/analytics' },
    { icon: <FaUser />, label: 'Profile', path: '/profile' },
    { icon: <FaCog />, label: 'Settings', path: '/settings' },
  ];

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed left-0 top-0 h-screen w-64 bg-gray-900 text-white transform transition-transform duration-300 z-50 ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } lg:relative lg:translate-x-0 lg:w-64 overflow-y-auto`}
      >
        <div className="p-6">
          <h2 className="text-2xl font-bold text-primary-400 mb-8">CodeQuest</h2>
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                to={item.path}
                onClick={onClose}
                className="flex items-center space-x-3 px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors text-gray-300 hover:text-white"
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
