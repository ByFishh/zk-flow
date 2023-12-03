import axios from 'axios';
import { Transaction, Transfer } from './types.ts';

const apiEndpoint = 'https://api.scrollscan.com/api';

const getTransfers = async (address: string) => {
  const transfers: Transfer[] = [];
  const offset = 1000;
  let page = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response = await axios.get(apiEndpoint, {
        params: {
          module: 'account',
          action: 'tokentx',
          address,
          sort: 'asc',
          offset,
          page,
        },
      });

      if (response.status === 200) {
        transfers.push(...response.data.result);
        if (response.data.result.length < offset) return transfers;
        page++;
      } else {
        console.error('Error occurred while retrieving transactions.');
      }
    } catch (error) {
      console.error('Error occurred while making the request:', error);
      break;
    }
  }
  return transfers;
};

const assignTransfersValue = async (transactions: Transaction[], ethPrice: number) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tokensPrice: any = {
    USDC: 1,
    USDT: 1,
    ZKUSD: 1,
    CEBUSD: 1,
    LUSD: 1,
    ETH: ethPrice,
    WETH: ethPrice,
  };
  for (const transaction of transactions) {
    if (!transaction.transfers) transaction.transfers = [];
    for (const transfer of transaction.transfers) {
      const value = Number(transfer.value) * 10 ** -Number(transfer.tokenDecimal);
      const tokenPrice = tokensPrice[transfer.tokenSymbol.toUpperCase()] || 0;
      transfer.transferPrice = value * tokenPrice;
    }
    const ETH = {
      transferPrice: Number(transaction.value) * 10 ** -18 * ethPrice,
      tokenSymbol: 'ETH',
    };
    transaction.transfers.push(ETH as Transfer);
    transaction.transfers = transaction.transfers.filter((transfer: Transfer) => transfer.transferPrice);
    transaction.transfers = transaction.transfers.sort((a: Transfer, b: Transfer) => b.transferPrice - a.transferPrice);
  }
};

const assignTransfers = async (transactions: Transaction[], address: string) => {
  const transfers = await getTransfers(address);

  for (const transfer of transfers) {
    for (const transaction of transactions) {
      if (transaction.hash === transfer.hash) {
        if (!transaction.transfers) transaction.transfers = [];
        transaction.transfers.push(transfer);
      }
    }
  }
};

export { getTransfers, assignTransfersValue, assignTransfers };
