import axios from 'axios';
import { Transaction } from './types.ts';
import { BLOCKCHAINS, BlockchainType } from '../types.ts';

const getTransactions = async (address: string, blockchain: BlockchainType): Promise<Transaction[]> => {
  const transactions: Transaction[] = [];
  const offset = 1000;
  let lastBlock = 0;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response = await axios.get(BLOCKCHAINS[blockchain].apiEndpoint, {
        params: {
          module: 'account',
          action: 'txlist',
          address,
          startblock: lastBlock,
          endblock: 99999999999999,
          sort: 'asc',
          offset,
        },
      });
      if (response.status === 200) {
        transactions.push(...response.data.result);
        if (response.data.result.length < offset) {
          return transactions;
        }
        const lastTransaction = response.data.result[response.data.result.length - 1];
        lastBlock = lastTransaction.blockNumber;
      } else {
        console.error('Error occurred while retrieving transactions.');
      }
    } catch (error) {
      console.error('Error occurred while making the request:', error);
      break;
    }
  }

  return transactions;
};

export { getTransactions };
