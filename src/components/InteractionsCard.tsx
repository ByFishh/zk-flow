import { FC, useEffect, useState } from 'react';
import { Transaction } from '../services/explorer.ts';

interface InteractionsCardProps {
  address: string;
  transactions: Transaction[] | [];
}

const InteractionsCard: FC<InteractionsCardProps> = ({ address, transactions }) => {
  const [interactions, setInteractions] = useState<number>(0);
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    setChange(0);
    setInteractions(0);
    transactions.forEach((transaction) => {
      if (transaction.from.toLowerCase() === address.toLowerCase()) {
        setInteractions((prev) => prev + 1);
        if (new Date(transaction.receivedAt).getTime() >= new Date().getTime() - 86400 * 7 * 1000) {
          setChange((prev) => prev + 1);
        }
      }
    });
  }, [address, transactions]);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
        <div className="w-52 text-center">
          <h3 className="text-l text-gray-400 dark:text-white">Interactions</h3>
          <div className="text-center pt-7">
            <h3 className="mb-2 text-5xl font-extrabold text-blue-600">{interactions}</h3>
            <div
              className={
                'text-l ' + (!change ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400')
              }
            >
              +{change}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">the last 7 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InteractionsCard;
