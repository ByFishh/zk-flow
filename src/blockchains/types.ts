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

type AirdropItem = {
  title: string;
  items: { label: string; checked: boolean }[];
};

type Airdrop = {
  checked: number;
  total: number;
  value: number;
  items: AirdropItem[];
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
  airdrop: Airdrop;
};

enum Blockchain {
  zkSync = 'zkSync',
  scroll = 'scroll',
}

export type ITotalProperty = Interaction | Volume | Fee | Contract | Airdrop;
export type IChangeProperty = Interaction | Volume | Fee | Contract;

export type { Interaction, Volume, Fee, Contract, Token, AdditionalInfo, Protocol, AirdropItem, Airdrop, Wallet };

export { Blockchain };
