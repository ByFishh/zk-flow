import { FC, useEffect, useState } from 'react';
import { getBalance, getLastInteraction, Token } from '../services/explorer.ts';
import { getTimeAgo } from '../utils/utils.ts';

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

const getTotalVolume = (transactionList: any[]) => {
  let totalVolume = 0;

  if (transactionList === undefined) return 'Nan';

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

const BasicsCard: FC<{ address: string; transactionList: any[] }> = ({ address, transactionList }) => {
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
    <div className="block p-6 border rounded-lg shadow bg-gray-800 border-gray-700 text-center">
      <div className="grid max-w-screen-xl grid-cols-4 gap-8 p-4 mx-auto text-white sm:p-8 text-center">
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
            <dt className="mb-2 text-3xl font-extrabold">${cardInfo?.totalVolume}</dt>
            <dd className="text-gray-400">Total volume</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{cardInfo?.lastActivity}</dt>
            <dd className="text-gray-400">Last activity</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{cardInfo?.activeDays}</dt>
            <dd className="text-gray-400">Active Days</dd>
          </div>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{cardInfo?.activeWeeks}</dt>
            <dd className="text-gray-400">Active Weeks</dd>
          </div>
          <br></br>
          <div className="flex flex-col items-center justify-center">
            <dt className="mb-2 text-3xl font-extrabold">{Object.keys(cardInfo?.activeMonths).length}</dt>
            <dd className="text-gray-400">Active Months</dd>
          </div>
          {cardInfo.tokenBalances.map((token) => (
            <div key={token.symbol} className="flex flex-col items-center justify-center">
              <dt className="mb-2 text-3xl font-extrabold">${Number(token.balance).toFixed(2)}</dt>
              <dd className="text-gray-400">{token.symbol} Balance</dd>
            </div>
          ))}
        </>
      </div>
    </div>
  );
};

export default BasicsCard;
