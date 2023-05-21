import axios from 'axios';

export interface Token {
  balance: number;
  contractAddress: string;
  decimals: number;
  name: string;
  symbol: string;
  type: string;
}

const getTokenList = async (address: string): Promise<Token[]> => {
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

const getTransactionCount = async (address: string): Promise<number> => {
  return axios
    .get(`https://zksync2-mainnet-explorer.zksync.io/address/${address}`)
    .then((res) => {
      return res.data.info.sealedNonce;
    })
    .catch((err) => {
      console.log(err);
    });
};

const getBalance = async (address: string): Promise<string | void> => {
  return axios
    .get(`https://zksync2-mainnet-explorer.zksync.io/address/${address}`)
    .then((res) => {
      const balance = res.data.info.balances['0x0000000000000000000000000000000000000000'];
      const ethBalance = parseInt(balance.balance, 16) * 10 ** -balance.tokenInfo.decimals;
      return (ethBalance * balance.tokenInfo.usdPrice).toFixed(2);
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getERC20, getERC721, getTransactionCount, getBalance };
