import React from 'react';
import { useTranslation } from 'react-i18next';
import { Package, AlertTriangle, TrendingDown } from 'lucide-react';

const InventoryPage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('navigation.inventory')}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Manage feed, medications, equipment, and supplies
        </p>
      </div>

      {/* Coming soon message */}
      <div className="card p-12 text-center">
        <Package className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Inventory Management
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          This feature is coming soon. You'll be able to track feed, medications, 
          equipment, and other supplies needed for your livestock operation.
        </p>
        <div className="mt-8 space-y-2 text-sm text-gray-400">
          <p>• Feed inventory tracking</p>
          <p>• Medication management</p>
          <p>• Equipment maintenance</p>
          <p>• Low stock alerts</p>
          <p>• Supplier management</p>
        </div>
      </div>

      {/* Placeholder cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Items
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                --
              </dd>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-yellow-100 p-3 rounded-lg">
              <AlertTriangle className="h-6 w-6 text-yellow-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Low Stock Alerts
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                --
              </dd>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-red-100 p-3 rounded-lg">
              <TrendingDown className="h-6 w-6 text-red-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Expired Items
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                --
              </dd>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;