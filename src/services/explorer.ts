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

export interface TokenInfo {
  l1Address: string;
  l2Address: string;
  address: string;
  symbol: string;
  name: string;
  decimals: number;
  usdPrice: number;
}

export interface Transfer {
  tokenInfo: TokenInfo;
  from: string;
  to: string;
  amount: string;
}

export interface BalanceChanges {
  tokenInfo: TokenInfo;
  from: string;
  to: string;
  amount: string;
  type: 'fee' | 'transfer' | string;
}

export interface Transaction {
  transactionHash: string;
  data: any;
  isL1Originated: boolean;
  status: 'verified' | string;
  fee: string;
  nonce: number;
  blockNumber: number;
  l1BatchNumber: number;
  blockHash: string;
  indexInBlock: number;
  initiatorAddress: string;
  receivedAt: string;
  ethCommitTxHash: string;
  ethProveTxHash: string;
  ethExecuteTxHash: string;
  erc20Transfers: Transfer[];
  transfer: Transfer[];
  balanceChanges: BalanceChanges[];
  type: number;
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
  const baseUrl = 'https://zksync2-mainnet-explorer.zksync.io/transactions';
  const limit = 100;
  let offset = 0;
  const transactions: Transaction[] = [];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const params = {
      limit,
      direction: 'older',
      accountAddress: address,
      offset,
    };

    try {
      const response: AxiosResponse = await axios.get(baseUrl, { params });
      if (response.status === 200) {
        const data = response.data.list;
        transactions.push(...data);

        if (data.length < limit) break;
        offset += limit;
      } else {
        console.error('Error occurred while retrieving transactions.');
        break;
      }
    } catch (error) {
      console.error('Error occurred while making the request:', error);
      break;
    }
  }
  return transactions;
};

export { getAllTransactions };
