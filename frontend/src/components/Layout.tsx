import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/hooks';
import { 
  Home, 
  Settings, 
  Users, 
  Package, 
  DollarSign, 
  FileText,
  Wifi,
  WifiOff,
  RotateCcw
} from 'lucide-react';

const Layout: React.FC = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const { isOnline, isSyncing, pendingOperations } = useAppSelector(state => state.sync);

  const navigation = [
    { name: t('navigation.dashboard'), href: '/', icon: Home },
    { name: t('navigation.animals'), href: '/animals', icon: Users },
    { name: t('navigation.inventory'), href: '/inventory', icon: Package },
    { name: t('navigation.finance'), href: '/finance', icon: DollarSign },
    { name: t('navigation.reports'), href: '/reports', icon: FileText },
    { name: t('navigation.settings'), href: '/settings', icon: Settings },
  ];

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Livestock Management
              </h1>
            </div>
            
            {/* Status indicators */}
            <div className="flex items-center space-x-4">
              {/* Sync status */}
              <div className="flex items-center space-x-2">
                {isSyncing ? (
                  <RotateCcw className="h-4 w-4 text-blue-500 animate-spin" />
                ) : isOnline ? (
                  <Wifi className="h-4 w-4 text-green-500" />
                ) : (
                  <WifiOff className="h-4 w-4 text-red-500" />
                )}
                <span className="text-sm text-gray-600">
                  {isSyncing ? t('common.syncing') : isOnline ? t('common.online') : t('common.offline')}
                </span>
                {pendingOperations.length > 0 && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">
                    {pendingOperations.length} pending
                  </span>
                )}
              </div>

              {/* Language switcher */}
              <div className="flex space-x-2">
                <button
                  onClick={() => changeLanguage('en')}
                  className={`px-2 py-1 text-xs rounded ${
                    i18n.language === 'en' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => changeLanguage('ua')}
                  className={`px-2 py-1 text-xs rounded ${
                    i18n.language === 'ua' ? 'bg-primary-500 text-white' : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  UA
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-white shadow-sm min-h-screen">
          <div className="px-4 py-6">
            <ul className="space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                return (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className={`flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                        isActive
                          ? 'bg-primary-100 text-primary-700'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <Icon className="mr-3 h-5 w-5" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;