import { Transaction } from './types.ts';
import { AdditionalInfo } from '../types.ts';
import axios from 'axios';

const getTimeAgo = (date: number) => {
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

const getWeekNumber = (d: Date): number => {
  d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil(((d.getTime() - yearStart.getTime()) / 86400000 + 1) / 7);
  return weekNo;
};

const getUniqueTimePeriods = (address: string, transactions: Transaction[]): AdditionalInfo[] => {
  const daySet = new Set<string>();
  const weekSet = new Set<string>();
  const monthSet = new Set<string>();

  for (const transaction of transactions) {
    if (transaction.to.toLowerCase() === address.toLowerCase()) continue;
    const date = new Date(transaction.timeStamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    const week = getWeekNumber(date);
    daySet.add(`${year}-${month + 1}-${day}`);
    weekSet.add(`${year}-W${week}`);
    monthSet.add(`${year}-${month + 1}`);
  }

  return [
    {
      label: 'Unique days',
      value: daySet.size.toString(),
    },
    {
      label: 'Unique weeks',
      value: weekSet.size.toString(),
    },
    {
      label: 'Unique months',
      value: monthSet.size.toString(),
    },
  ];
};

const getLastActivity = (transactions: Transaction[]): AdditionalInfo => {
  let lastActivity = 0;

  for (const transaction of transactions) {
    if (transaction.timeStamp > lastActivity) {
      lastActivity = transaction.timeStamp;
    }
  }

  return {
    label: 'Last activity',
    value: getTimeAgo(lastActivity * 1000),
  };
};

const getMinitoolkitRank = async (address: string): Promise<AdditionalInfo> => {
  const response = await axios.post('https://minitoolkit.org/api/leaderboard', { addresses: [address] });
  return {
    label: 'Rank - Minitoolkit',
    value: response.data[0].rank.toString(),
  };
};

const getAdditionalInfos = async (address: string, transactions: Transaction[]): Promise<AdditionalInfo[]> => {
  const additionalInfos: AdditionalInfo[] = [];

  additionalInfos.push(getLastActivity(transactions));
  additionalInfos.push(await getMinitoolkitRank(address));
  additionalInfos.push(...getUniqueTimePeriods(address, transactions));

  return additionalInfos;
};

export { getAdditionalInfos };
