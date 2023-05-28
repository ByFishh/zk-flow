import axios, {AxiosResponse} from 'axios';

export interface Token {
  balance: number;
  contractAddress: string;
  decimals: number;
  name: string;
  symbol: string;
  type: string;
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

const getERC20 = async (address: string): Promise<Token[]> => {
  const tokenList = await getTokenList(address);
  return tokenList.filter((token: Token) => token.type === 'ERC-20');
};

const getERC721 = async (address: string): Promise<Token[]> => {
  const tokenList = await getTokenList(address);
  return tokenList.filter((token: Token) => token.type === 'ERC-721');
};

const getBalance = async (address: string): Promise<Token[]> => {
  const response: AxiosResponse = await axios.get(`https://zksync2-mainnet-explorer.zksync.io/address/${address}`);
  const balances = response.data.info.balances;
  const tokenBalances: Token[] = [];
  for (const tokenAddress in balances) {
    const tokenInfo = balances[tokenAddress].tokenInfo;
    const balance = parseFloat((parseInt(balances[tokenAddress].balance, 16) * 10 ** -tokenInfo.decimals * tokenInfo.usdPrice).toFixed(2));
    tokenBalances.push({
      ...tokenInfo,
      balance,
    });
  }
  return tokenBalances;
};


const getLastInteraction = async (address: string): Promise<string> => {
  return axios
    .get(`https://zksync2-mainnet-explorer.zksync.io/transactions?limit=1&direction=older&accountAddress=${address}`)
    .then((res) => {
      const transaction = res.data.list[0];
      if (!transaction) return 'NaN';
      return transaction.receivedAt;
    })
    .catch((err) => {
      console.log(err);
      return 'No interaction yet';
    });
};

const getAllTransactions = async (address: string): Promise<any[]> => {
  const baseUrl = 'https://zksync2-mainnet-explorer.zksync.io/transactions';
  const limit = 100;
  let offset = 0;
  const transactions: any[] = [];

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


export {getERC20, getERC721, getBalance, getLastInteraction, getAllTransactions};
