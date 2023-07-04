import axios, { AxiosResponse } from 'axios';

export interface Token {
  price: number | undefined;
  balance: number;
  contractAddress: string;
  decimals: number;
  name: string;
  symbol: string;
  type: string;
}

export interface Transaction {
  hash: string;
  to: string;
  from: string;
  data: string;
  value: string;
  isL1Originated: boolean;
  fee: string;
  nonce: number;
  blockNumber: number;
  l1BatchNumber: number;
  blockHash: string;
  transactionIndex: number;
  receivedAt: string;
  status: string;
  commitTxHash: string;
  executeTxHash: string;
  proveTxHash: string;
  ethValue: number;
}

export const getTokenList = async (address: string): Promise<Token[]> => {
  return axios
    .get(`https://zksync2-mainnet.zkscan.io/api?module=account&action=tokenlist&address=${address}`)
    .then((res) => {
      return res.data.result;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAllTransactions = async (address: string): Promise<Transaction[]> => {
  let url = `https://block-explorer-api.mainnet.zksync.io/transactions?address=${address}&limit=100&page=1`;
  const transactions: Transaction[] = [];

  const ethResponse = await axios.post('https://mainnet.era.zksync.io/', {
    id: 42,
    jsonrpc: '2.0',
    method: 'zks_getTokenPrice',
    params: ['0x0000000000000000000000000000000000000000'],
  });

  // eslint-disable-next-line no-constant-condition
  while (true) {
    try {
      const response: AxiosResponse = await axios.get(url);
      if (response.status === 200) {
        const data = response.data.items;
        transactions.push(...data);

        if (response.data.links.next === '') break;
        url = 'https://block-explorer-api.mainnet.zksync.io/' + response.data.links.next;
      } else {
        console.error('Error occurred while retrieving transactions.');
        break;
      }
    } catch (error) {
      console.error('Error occurred while making the request:', error);
      break;
    }
  }

  transactions.forEach((transaction: Transaction) => {
    transaction.ethValue = ethResponse.data.result;
  });
  return transactions;
};

export { getAllTransactions };
