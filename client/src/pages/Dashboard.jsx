import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Package, ClipboardList, Plus, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();

  const quickActions = [
    {
      title: 'View Equipment',
      description: 'Browse all available equipment',
      icon: Package,
      href: '/equipment',
      color: 'bg-blue-500',
    },
    {
      title: 'My Requests',
      description: 'Track your equipment requests',
      icon: ClipboardList,
      href: '/my-requests',
      color: 'bg-green-500',
    },
  ];

  if (user?.role === 'admin') {
    quickActions.push({
      title: 'Admin Dashboard',
      description: 'Manage equipment and requests',
      icon: Plus,
      href: '/admin',
      color: 'bg-purple-500',
    });
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user?.name}!
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what you can do today
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quickActions.map((action, index) => {
          const Icon = action.icon;
          return (
            <Link
              key={index}
              to={action.href}
              className="card hover:shadow-lg transition-shadow duration-200 cursor-pointer group"
            >
              <div className="flex items-center mb-4">
                <div className={`${action.color} p-3 rounded-lg text-white`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {action.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                {action.description}
              </p>
              <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                <span className="text-sm font-medium">Get started</span>
                <ArrowRight className="ml-2 w-4 h-4" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Quick Stats
          </h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Your Role</span>
              <span className="font-medium capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Account Status</span>
              <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                Active
              </span>
            </div>
          </div>
        </div>

        <div className="card">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <p className="text-gray-600">
            No recent activity to display. Start by exploring the available equipment.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
