import { ProtocolState } from '../components/ProtocolsCard';
import { Token } from '../services/explorer';

const parseTokens = (tokens: Token[] | undefined): string[] => {
  if (!tokens) return [];
  return tokens.map((item) => {
    const amount: number = item.balance * 10 ** -item.decimals;
    return item.symbol + ';' + amount.toString() + '\n';
  });
};

const parseProtocols = (protocols: ProtocolState[] | undefined): string[] => {
  if (!protocols) return [];
  return protocols.map((item) => {
    return (
      item.name + ';' + item.activeDays + ';' + item.interactions + ';' + item.lastActivity + ';' + item.volume + '\n'
    );
  });
};

const downloadCSV = (value: string, array: string[]): void => {
  const file = new Blob(array, { type: 'text/csv' });
  const element = document.createElement('a');

  element.href = URL.createObjectURL(file);
  element.download = value + '-' + Date.now() + '.csv';
  element.click();
  URL.revokeObjectURL(element.href);
};

export const generateCSV = (tokens: Token[] | undefined, protocols: ProtocolState[] | undefined) => {
  if (tokens) {
    const tokenString: string[] = parseTokens(tokens);
    downloadCSV('Tokens', tokenString);
  }
  if (protocols) {
    const protocolString: string[] = parseProtocols(protocols);
    downloadCSV('Protocols', protocolString);
  }
};
