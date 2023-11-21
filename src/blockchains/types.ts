type Interaction = {
  change: number;
  total: number;
};

type Volume = {
  change: number;
  total: number;
};

type Fee = {
  change: number;
  total: number;
};

type Contract = {
  change: number;
  total: number;
};

type Token = {
  name: string;
  symbol: string;
  link: string;
  balance: number;
  type: string;
};

type AdditionalInfo = {
  label: string;
  value: string;
};

type Protocol = {
  id: string;
  name: string;
  activeDays: number;
  interactions: number;
  lastActivity: number;
  volume: number;
};

type Wallet = {
  address: string;
  interaction: Interaction;
  volume: Volume;
  fee: Fee;
  contract: Contract;
  tokens: Token[];
  additionalInfos: AdditionalInfo[];
  protocols: Protocol[];
};

enum BlockchainType {
  zkSync = 'zkSync',
  scroll = 'scroll',
  base = 'base',
}

type Blockchain = {
  tokenEndpoint: string;
  apiEndpoint: string;
  explorer: string;
};

const BLOCKCHAINS: { [key in BlockchainType]: Blockchain } = {
  [BlockchainType.zkSync]: {
    tokenEndpoint: 'https://zksync.blockscout.com/api/v2/addresses/%ADDRESS%/token-balances',
    apiEndpoint: 'https://block-explorer-api.mainnet.zksync.io/api',
    explorer: 'https://explorer.zksync.io/address/%ADDRESS%',
  },
  [BlockchainType.scroll]: {
    tokenEndpoint: '',
    apiEndpoint: '',
    explorer: '',
  },
  [BlockchainType.base]: {
    tokenEndpoint: '',
    apiEndpoint: '',
    explorer: '',
  },
};

export type { Interaction, Volume, Fee, Contract, Token, AdditionalInfo, Protocol, Wallet };

export { BlockchainType, BLOCKCHAINS };
