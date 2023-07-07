import { FC, useEffect, useState } from 'react';
import { Transaction } from '../services/explorer.ts';

interface VolumeCardProps {
  address: string;
  transactions: Transaction[] | [];
}

const VolumeCard: FC<VolumeCardProps> = ({ address, transactions }) => {
  const [volume, setVolume] = useState<number>(0);
  const [change, setChange] = useState<number>(0);

  useEffect(() => {
    setChange(0);
    setVolume(0);
    transactions.forEach((transaction) => {
      const transfers = transaction.transfers.sort(
        (a, b) =>
          parseInt(b.amount) * 10 ** -b.token.decimals * b.token.price -
          parseInt(a.amount) * 10 ** -a.token.decimals * a.token.price,
      );
      if (transfers.length === 0) return;
      const tmpVolume = parseInt(transfers[0].amount) * 10 ** -transfers[0].token.decimals * transfers[0].token.price;
      setVolume((prev) => prev + tmpVolume);
      if (new Date(transaction.receivedAt).getTime() >= new Date().getTime() - 86400 * 7 * 1000) {
        setChange((prev) => prev + tmpVolume);
      }
    });
  }, [address, transactions]);

  return (
    <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
        <div className="w-52 max-w-52 text-center">
          <h3 className="text-l text-gray-900 dark:text-white">Volume</h3>
          <div className="text-center pt-7">
            <h3 className="mb-2 text-5xl font-extrabold text-blue-600">${Math.round(volume)}</h3>
            <div
              className={
                'text-l ' + (!change ? 'text-red-500 dark:text-red-400' : 'text-green-500 dark:text-green-400')
              }
            >
              +${Math.round(change)}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">the last 7 days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolumeCard;
