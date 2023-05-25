import { FC, useEffect, useState } from 'react';
import { getBalance, getLastInteraction } from '../services/explorer.ts';

interface BasicsCardInfo {
  address: string;
  totalInteractions: number;
  totalBalance: string;
  totalVolume: number;
  lastActivity: string;
}

const getTotalVolume = (transactionList: any[]) => {
  let totalVolume = 0;

  if (transactionList === undefined) return -1;

  transactionList.forEach((transaction: any) => {
    const erc20Transfers = transaction.erc20Transfers.sort((a: any, b: any) => {
      const valueA = parseInt(a.amount, 16) * 10 ** -a.tokenInfo.decimals * a.tokenInfo.usdPrice;
      const valueB = parseInt(b.amount, 16) * 10 ** -b.tokenInfo.decimals * b.tokenInfo.usdPrice;

      return valueB - valueA;
    });

    totalVolume +=
      parseInt(erc20Transfers[0].amount, 16) *
      10 ** -erc20Transfers[0].tokenInfo.decimals *
      erc20Transfers[0].tokenInfo.usdPrice;
  });

  return totalVolume;
};

const getTimeAgo = (date: string) => {
  const seconds = (new Date().getTime() - new Date(date).getTime()) / 1000;

  if (seconds < 60) {
    return Math.round(seconds) + ' second' + (seconds === 1 ? '' : 's') + ' ago';
  }

  const minutes = seconds / 60;
  if (minutes < 60) {
    return Math.round(minutes) + ' minute' + (minutes === 1 ? '' : 's') + ' ago';
  }

  const hours = minutes / 60;
  if (hours < 24) {
    return Math.round(hours) + ' hour' + (hours === 1 ? '' : 's') + ' ago';
  }

  const days = hours / 24;
  return Math.round(days) + ' day' + (days === 1 ? '' : 's') + ' ago';
};

const BasicsCard: FC<{ address: string; transactionList: any[] }> = ({ address, transactionList }) => {
  const [cardInfo, setCardInfo] = useState<BasicsCardInfo>();

  useEffect(() => {
    const fetchInfo = async () => {
      setCardInfo({
        address: address,
        totalInteractions: transactionList ? transactionList.length : 0,
        totalBalance: await getBalance(address),
        totalVolume: getTotalVolume(transactionList),
        lastActivity: getTimeAgo(await getLastInteraction(address)),
      });
    };
    fetchInfo();
  }, [address, transactionList]);

  return (
    <>
      <div className="block p-6 border rounded-lg shadow bg-gray-800 border-gray-700 text-center">
        <div className="grid max-w-screen-xl grid-cols-4 gap-8 p-4 mx-auto text-white sm:p-8 text-center">
          {cardInfo ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{cardInfo?.totalInteractions}</dt>
                <dd className="text-gray-400">Total interactions</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">${cardInfo?.totalBalance}</dt>
                <dd className="text-gray-400">Balance</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">${cardInfo?.totalVolume.toFixed(2)}</dt>
                <dd className="text-gray-400">Total volume</dd>
              </div>
              <div className="flex flex-col items-center justify-center">
                <dt className="mb-2 text-3xl font-extrabold">{cardInfo?.lastActivity}</dt>
                <dd className="text-gray-400">Last activity</dd>
              </div>
            </>
          ) : (
            <h5>Loading...</h5>
          )}
        </div>
      </div>
    </>
  );
};

export default BasicsCard;
