import { FC, useEffect, useState } from 'react';
import { getBalance, getLastInteraction, Token, Transaction, Transfer } from '../services/explorer.ts';
import { getTimeAgo } from '../utils/utils.ts';

import Chart from 'react-apexcharts';
import { ApexOptions } from 'apexcharts';

interface BasicsCardInfo {
  address: string;
  totalInteractions: number;
  totalBalance: string | number;
  totalVolume: string;
  lastActivity: string;
  tokenBalances: Token[];
  activeDays: number;
  activeWeeks: number;
  activeMonths: { [month: string]: number };
}

const getTotalVolume = (transactionList: Transaction[]) => {
  let totalVolume = 0;

  if (transactionList === undefined) return 'Nan';

  transactionList.forEach((transaction: any) => {
    const erc20Transfers = transaction.erc20Transfers.sort((a: Transfer, b: Transfer) => {
      const valueA = parseInt(a.amount, 16) * 10 ** -a.tokenInfo.decimals * a.tokenInfo.usdPrice;
      const valueB = parseInt(b.amount, 16) * 10 ** -b.tokenInfo.decimals * b.tokenInfo.usdPrice;

      return valueB - valueA;
    });

    totalVolume +=
      parseInt(erc20Transfers[0].amount, 16) *
      10 ** -erc20Transfers[0].tokenInfo.decimals *
      erc20Transfers[0].tokenInfo.usdPrice;
  });
  return totalVolume.toFixed(2);
};

interface ActiveTimePeriods {
  activeDays: number;
  activeWeeks: number;
  activeMonths: { [month: string]: number };
}

function getWeek(date: Date): number {
  const tempDate = new Date(date.getTime());
  tempDate.setHours(0, 0, 0, 0);
  tempDate.setDate(tempDate.getDate() + 3 - ((tempDate.getDay() + 6) % 7));
  const week1 = new Date(tempDate.getFullYear(), 0, 4);
  return 1 + Math.round(((tempDate.getTime() - week1.getTime()) / 86400000 - 3 + ((week1.getDay() + 6) % 7)) / 7);
}

const getActiveTimePeriods = (transactionList: any[]): ActiveTimePeriods => {
  const uniqueDates = new Set<string>();
  const uniqueWeeks = new Set<string>();
  const uniqueMonths: { [month: string]: number } = {};

  transactionList.forEach((transaction) => {
    const date = new Date(transaction.receivedAt);
    const dateString = date.toLocaleDateString();
    const weekString = `${date.getFullYear()}-W${getWeek(date)}`;
    const monthString = date.toLocaleString('default', { month: 'long' });

    uniqueDates.add(dateString);
    uniqueWeeks.add(weekString);

    if (uniqueMonths[monthString]) {
      uniqueMonths[monthString]++;
    } else {
      uniqueMonths[monthString] = 1;
    }
  });

  return {
    activeDays: uniqueDates.size,
    activeWeeks: uniqueWeeks.size,
    activeMonths: uniqueMonths,
  };
};

const BasicsCard: FC<{ address: string; transactionList: Transaction[] }> = ({ address, transactionList }) => {
  const [cardInfo, setCardInfo] = useState<BasicsCardInfo>({
    address: address,
    totalInteractions: 0,
    totalBalance: 0,
    totalVolume: 'NaN',
    lastActivity: 'NaN',
    tokenBalances: [],
    activeDays: 0,
    activeWeeks: 0,
    activeMonths: {},
  });

  useEffect(() => {
    const fetchInfo = async () => {
      const tokenBalances = await getBalance(address);
      const totalBalance = tokenBalances.reduce((acc, token) => acc + token.balance, 0);

      setCardInfo({
        address: address,
        totalInteractions: transactionList ? transactionList.length : 0,
        totalBalance,
        totalVolume: getTotalVolume(transactionList),
        lastActivity: getTimeAgo(await getLastInteraction(address)),
        tokenBalances,
        activeDays: getActiveTimePeriods(transactionList).activeDays,
        activeWeeks: getActiveTimePeriods(transactionList).activeWeeks,
        activeMonths: getActiveTimePeriods(transactionList).activeMonths,
      });
    };
    fetchInfo();
  }, [address, transactionList]);
  return (
    <>
      <div className="flex flex-col items-center sm:flex-row sm:space-x-5 mt-5">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <div className="w-52 text-center">
              <h3 className="text-l text-gray-400 dark:text-white">Interactions</h3>
              <div className="text-center pt-7">
                <h3 className="mb-2 text-5xl font-extrabold text-blue-600">{cardInfo.totalInteractions}</h3>
                <div className="text-l text-gray-500 dark:text-gray-400">+50</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">this month</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <div className="w-52 max-w-52 text-center">
              <h3 className="text-l text-gray-900 dark:text-white">Volume in $</h3>
              <div className="text-center pt-7">
                <h3 className="mb-2 text-5xl font-extrabold text-blue-600">{parseInt(cardInfo.totalVolume)}</h3>
                <div className="text-l text-gray-500 dark:text-red-500">-50</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">this month</div>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <div className="w-52 max-w-52 text-center">
              <h3 className="text-l text-gray-900 dark:text-white">Fee spent in $</h3>
              <div className="text-center pt-7">
                <h3 className="mb-2 text-5xl font-extrabold text-blue-600">{parseInt(0)}</h3>
                <div className="text-l text-gray-500 dark:text-green-500">+50</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">this month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:space-x-5 mt-1.5">
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <div className="w-[347px]">
              <ul className="max-w-md divide-y divide-gray-200 dark:divide-gray-700">
                <li className="pb-3 sm:pb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/docs/images/people/profile-picture-1.jpg"
                        alt="Ether"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Ether</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">0.01 ETH</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $320
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img className="w-8 h-8 rounded-full" src="/docs/images/people/profile-picture-3.jpg" alt="ON" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">Onsenswap token</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">20 ON</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $3467
                    </div>
                  </div>
                </li>
                <li className="pt-3 sm:pt-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src="/docs/images/people/profile-picture-3.jpg"
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">zkSwap</p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">1 ZKSP</p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      $3467
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="p-4 mb-4 bg-white border border-gray-200 rounded-lg shadow-sm 2xl:col-span-2 dark:border-gray-700 sm:p-6 dark:bg-gray-800">
          <div className="sm:flex xl:block 2xl:flex sm:space-x-4 xl:space-x-0 2xl:space-x-4">
            <div className="w-[347px] text-center">
              <h3 className="text-l text-gray-400 dark:text-white">Interactions</h3>
              <div className="text-center pt-7">
                <h3 className="mb-2 text-5xl font-extrabold text-blue-600">{cardInfo.totalInteractions}</h3>
                <div className="text-l text-gray-500 dark:text-gray-400">+50</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">this month</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BasicsCard;
