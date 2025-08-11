import React from 'react';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from '../store/hooks';
import { Users, TrendingUp, AlertCircle, Plus } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { t } = useTranslation();
  const { animals } = useAppSelector(state => state.animals);
  const { pendingOperations } = useAppSelector(state => state.sync);

  const stats = [
    {
      name: t('dashboard.totalAnimals'),
      value: animals.length,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      name: 'Pending Sync',
      value: pendingOperations.length,
      icon: TrendingUp,
      color: 'text-yellow-600',
      bg: 'bg-yellow-100',
    },
  ];

  const quickActions = [
    {
      name: t('animals.addAnimal'),
      href: '/animals?action=add',
      icon: Plus,
      color: 'bg-primary-500 hover:bg-primary-600',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Welcome to your livestock management dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.name} className="card p-6">
              <div className="flex items-center">
                <div className={`flex-shrink-0 ${item.bg} p-3 rounded-lg`}>
                  <Icon className={`h-6 w-6 ${item.color}`} />
                </div>
                <div className="ml-4">
                  <dt className="text-sm font-medium text-gray-500 truncate">
                    {item.name}
                  </dt>
                  <dd className="text-2xl font-bold text-gray-900">
                    {item.value}
                  </dd>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('dashboard.quickActions')}
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <a
                key={action.name}
                href={action.href}
                className={`${action.color} text-white p-4 rounded-lg flex items-center space-x-3 transition-colors`}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{action.name}</span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">
          {t('dashboard.recentActivity')}
        </h2>
        <div className="text-sm text-gray-500">
          {animals.length === 0 ? (
            <p>No animals added yet. Add your first animal to get started!</p>
          ) : (
            <div className="space-y-3">
              {animals.slice(0, 5).map((animal) => (
                <div key={animal.id} className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{animal.name}</p>
                    <p className="text-gray-500">
                      {animal.species} • {animal.breed}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Alerts */}
      {pendingOperations.length > 0 && (
        <div className="card p-6 border-l-4 border-yellow-400">
          <div className="flex items-center">
            <AlertCircle className="h-5 w-5 text-yellow-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-gray-900">
                Pending Sync Operations
              </h3>
              <p className="text-sm text-gray-500">
                {pendingOperations.length} operations waiting to be synced when online.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;