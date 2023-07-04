import { FC, useEffect, useState } from 'react';
import { Transaction } from '../services/explorer.ts';

interface FeeCardProps {
  address: string;
  transactions: Transaction[] | [];
}

const FeeCard: FC<FeeCardProps> = ({ address, transactions }) => {
  const [fees, setFees] = useState<number>(0);
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    setChange(0);
    setFees(0);
    transactions.forEach((transaction) => {
      const tmpFees = parseInt(transaction.fee, 16) * 10 ** -18 * transaction.ethValue;
      setFees((prev) => prev + tmpFees);
      if (new Date(transaction.receivedAt).getTime() >= new Date().getTime() - 86400 * 7 * 1000) {
        setChange((prev) => prev + tmpFees);
      }
    });
  }, [address, transactions]);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
        <div className="w-52 max-w-52 text-center">
          <h3 className="text-l text-gray-900 dark:text-white">Fee spent</h3>
          <div className="text-center pt-7">
            <h3 className="mb-2 text-5xl font-extrabold text-blue-600">${fees.toFixed(2)}</h3>
            <div
              className={
                'text-l ' + (!change ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400')
              }
            >
              +${change.toFixed(2)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">the last 7 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeeCard;
