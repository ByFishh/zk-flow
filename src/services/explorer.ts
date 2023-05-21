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

const getAddressERC20 = async (address: string): Promise<Token[]> => {
  const tokenList = await getTokenList(address);
  return tokenList.filter((token: Token) => token.type === 'ERC-20');
};

const getAddressERC721 = async (address: string): Promise<Token[]> => {
  const tokenList = await getTokenList(address);
  return tokenList.filter((token: Token) => token.type === 'ERC-721');
};

const getAddressTransactionCount = async (address: string): Promise<number> => {
  return axios
    .get(`https://zksync2-mainnet-explorer.zksync.io/address/${address}`)
    .then((res) => {
      return res.data.info.sealedNonce;
    })
    .catch((err) => {
      console.log(err);
    });
};

export { getAddressERC20, getAddressERC721, getAddressTransactionCount };
