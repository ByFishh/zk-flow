import { FC, useEffect, useState } from 'react';
import { Transaction } from '../services/explorer.ts';
import { countAllTransactionPeriods, getTimeAgo } from '../utils/utils.ts';

interface ActivityCardProps {
  address: string;
  transactions: Transaction[] | [];
}

const ActivityCard: FC<ActivityCardProps> = ({ address, transactions }) => {
  const { days, weeks, months } = countAllTransactionPeriods(address, transactions);
  const [lastActivity, setLastActivity] = useState<string>('');

  useEffect(() => {
    if (!transactions || transactions.length === 0) return;
    setLastActivity(getTimeAgo(transactions[0]?.receivedAt));
  }, [transactions]);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800 h-[245px]">
      <div className="block sm:space-x-4 xl:space-x-0 2xl:space-x-4 w-[347px]">
        <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
          <li className="pb-3 sm:pb-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Last activity</p>
              </div>
              <div
                className={
                  'inline-flex items-center text-base font-semibold ' +
                  (new Date(transactions[0]?.receivedAt).getTime() < new Date().getTime() - 86400 * 7 * 1000
                    ? 'text-red-500 dark:text-red-400'
                    : 'text-gray-500 dark:text-white')
                }
              >
                {lastActivity}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Active day(s)</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {days + (days === 1 ? ' day' : ' days')}
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Active week(s)</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {weeks + (weeks === 1 ? ' week' : ' weeks')}
              </div>
            </div>
          </li>
          <li className="pt-3 pb-0 sm:pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Active month(s)</p>
              </div>
              <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                {months + (months === 1 ? ' month' : ' months')}
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ActivityCard;
