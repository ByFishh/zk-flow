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

enum Blockchain {
  zkSync = 'zkSync',
  scroll = 'scroll',
}

export type { Interaction, Volume, Fee, Contract, Token, AdditionalInfo, Protocol, Wallet };

export { Blockchain };
