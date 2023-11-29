import { Token } from '../types.ts';
import axios from 'axios';

const tokenEndpoint = 'https://zksync.blockscout.com/api/v2/addresses/%ADDRESS%/token-balances';
const explorer = 'https://explorer.zksync.io/address/%ADDRESS%';
const apiEndpoint = 'https://block-explorer-api.mainnet.zksync.io/api';

const getNativeBalance = async (address: string): Promise<Token> => {
  const response = await axios.get(apiEndpoint, {
    params: {
      module: 'account',
      action: 'balance',
      address,
    },
  });

  if (response.data.status === '0') {
    console.error('Error occurred while retrieving native token:', response.data.message);
    return {
      name: 'Ethereum',
      symbol: 'ETH',
      link: explorer.replace('%ADDRESS%', address),
      balance: 0,
      type: 'NATIVE',
    };
  }

  return {
    name: 'Ethereum',
    symbol: 'ETH',
    link: explorer.replace('%ADDRESS%', address),
    balance: Number(response.data.result) * 10 ** -18,
    type: 'NATIVE',
  };
};

const getTokens = async (address: string): Promise<Token[]> => {
  const tokens: Token[] = [];

  try {
    const response = await axios.get(tokenEndpoint.replace('%ADDRESS%', address));

    if (!response.data.status) {
      for (const rawToken of response.data) {
        const token: Token = {
          name: rawToken.token.name,
          symbol: rawToken.token.symbol,
          link: explorer.replace('%ADDRESS%', rawToken.token.address),
          balance: rawToken.value * 10 ** -Number(rawToken.token.decimals),
          type: rawToken.token.type,
        };
        tokens.push(token);
      }
    } else {
      console.error('Error occurred while retrieving tokens:', response.data.message);
    }

    tokens.sort((a) => (a.type === 'ERC-721' ? 1 : -1));
  } catch (e) {
    // @ts-ignore:next-line
    console.error('Error while fetching tokens:', e.message);
  }
  try {
    tokens.unshift(await getNativeBalance(address));
  } catch (e) {
    console.log('Error while fetching native balance');
  }
  return tokens;
};

export { getTokens };
