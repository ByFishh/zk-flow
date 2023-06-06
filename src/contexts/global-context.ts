import { createContext } from 'react';
import { ProtocolState } from '../components/ProtocolsCard';
import { Token } from '../services/explorer';

export interface GlobalContextType {
  token: Token[] | undefined;
  setToken: (value: Token[] | undefined) => void;
  protocols: ProtocolState[] | undefined;
  setProtocols: (value: ProtocolState[] | undefined) => void;
}

export const GlobalContext = createContext<GlobalContextType>({
  token: [],
  setToken: () => {},
  protocols: [],
  setProtocols: () => {},
});
