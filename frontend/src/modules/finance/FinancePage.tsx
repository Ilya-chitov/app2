import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign, TrendingUp, TrendingDown, PieChart } from 'lucide-react';

const FinancePage: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">{t('navigation.finance')}</h1>
        <p className="mt-1 text-sm text-gray-500">
          Track expenses, revenue, and profitability
        </p>
      </div>

      {/* Coming soon message */}
      <div className="card p-12 text-center">
        <DollarSign className="mx-auto h-12 w-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Financial Management
        </h2>
        <p className="text-gray-500 max-w-md mx-auto">
          This feature is coming soon. You'll be able to track all financial aspects 
          of your livestock operation including expenses, revenue, and profitability analysis.
        </p>
        <div className="mt-8 space-y-2 text-sm text-gray-400">
          <p>• Expense tracking</p>
          <p>• Revenue management</p>
          <p>• Profit/loss analysis</p>
          <p>• Budget planning</p>
          <p>• Tax reporting</p>
        </div>
      </div>

      {/* Placeholder cards */}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-green-100 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Total Revenue
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                $--
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
                Total Expenses
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                $--
              </dd>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-blue-100 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Net Profit
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                $--
              </dd>
            </div>
          </div>
        </div>

        <div className="card p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0 bg-purple-100 p-3 rounded-lg">
              <PieChart className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <dt className="text-sm font-medium text-gray-500 truncate">
                Profit Margin
              </dt>
              <dd className="text-2xl font-bold text-gray-900">
                --%
              </dd>
            </div>
          </div>
        </div>
      </div>

      {/* Placeholder chart area */}
      <div className="card p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Financial Trends
        </h3>
        <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center text-gray-500">
            <PieChart className="mx-auto h-8 w-8 mb-2" />
            <p>Charts and analytics coming soon</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinancePage;