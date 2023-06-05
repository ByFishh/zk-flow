import { ProtocolState } from "../components/ProtocolsCard"
import { Token } from "../services/explorer"

export const DownloadTokensAndProtocols = (tokens:Token[] | undefined, protocols:ProtocolState[] | undefined) => {

    if (tokens != undefined) {
      let TokenString:string[] = parseTokens(tokens)
      SimulateDownload("Tokens", TokenString)
    }

    let ProtocolString:string[] = parseProtocols(protocols)
    SimulateDownload("Protocols", ProtocolString)
}

const parseTokens = (tokens:Token[] | undefined):string[] => {
    return (tokens!.map((item) => {
        const amount:number = item.balance * 10 ** -item.decimals;
        return(item.symbol + ";" + amount.toString() + "\n")
    }))
}

const parseProtocols = (protocols:ProtocolState[] | undefined):string[] => {
    return (protocols!.map((item) => {
        if (item.interactions)
            return (item.name + ";" + item.activeDays + ";" + item.interactions + ";" + item.lastActivity + ";" + item.volume + "\n")
        return ("");
    }))
}


const SimulateDownload = (value: string, array:string[]):void => {
    console.log(value);
    const file = new Blob(array, {type: 'text/csv'});
    const element = document.createElement("a");
    element.href = URL.createObjectURL(file);
    element.download = value + "-" + Date.now() + ".csv";
    document.body.appendChild(element);
    element.click();
    URL.revokeObjectURL(element.href);
}