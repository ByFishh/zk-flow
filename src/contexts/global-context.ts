import { createContext } from "react";
import { ProtocolState } from "../components/ProtocolsCard";
import { Token } from "../services/explorer";

export interface ContextType {
    token: Token[] | undefined,
    setToken: (value: Token[] | undefined) => void
    protocols: ProtocolState[] | undefined,
    setProtocols: (value: ProtocolState[] | undefined) => void
}


export const MyContext = createContext<ContextType | undefined>(undefined);

