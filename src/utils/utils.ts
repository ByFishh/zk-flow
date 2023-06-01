import { Transfer } from '../services/explorer.ts';

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

const sortTransfer = (a: Transfer, b: Transfer) => {
  const valueA = parseInt(a.amount, 16) * 10 ** -a.tokenInfo.decimals * a.tokenInfo.usdPrice;
  const valueB = parseInt(b.amount, 16) * 10 ** -b.tokenInfo.decimals * b.tokenInfo.usdPrice;

  return valueB - valueA;
};

export { getTimeAgo, sortTransfer };
