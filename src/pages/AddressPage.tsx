import { useEffect, useState } from 'react';
import { getAllTransactions, Token, Transaction } from '../services/explorer.ts';
import Header from '../components/Header.tsx';
import InteractionsCard from '../components/InteractionsCard.tsx';
import VolumeCard from '../components/VolumeCard.tsx';
import FeeCard from '../components/FeeCard.tsx';
import TokensCard from '../components/TokensCard.tsx';
import ActivityCard from '../components/ActivityCard.tsx';
import ProtocolsCard, { ProtocolState } from '../components/ProtocolsCard.tsx';
import { MyContext } from '../contexts/global-context.ts';





const AddressPage = () => {

  const address = window.location.search.split('=')[1];
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [protocols, setProtocols] = useState<ProtocolState[] | undefined>(undefined)
  const [token, setToken] = useState<Token[] | undefined>(undefined)

  useEffect(() => {
    if (!address || address.length !== 42 || address.slice(0, 2) !== '0x') {
      window.location.search = '';
      return;
    }
    fetchTransactionList();
  }, [address]);

  const fetchTransactionList = async () => {
    const transactions: Transaction[] = await getAllTransactions(address);
    setTransactionList(transactions);
  };

  useEffect(() => {
    console.log("prout")
    console.log(token);
  }, [token])
  
  useEffect(() => {
    console.log("prout2")
    console.log(protocols);
  }, [protocols])

  return (
    <>
      <Header hasSearchBar />
      <div className="grid mt-20 place-items-center ">
        <div className="grid place-items-center">
          <div className="flex items-center flex-row space-x-5 mt-5">
            <InteractionsCard address={address} transactions={transactionList} />
            <VolumeCard address={address} transactions={transactionList} />
            <FeeCard address={address} transactions={transactionList} />
          </div>
          <div className="flex items-center flex-row space-x-5 mt-1.5">
            <MyContext.Provider value={{token, setToken, protocols, setProtocols}}>
              <TokensCard address={address} />
            </MyContext.Provider>
            <ActivityCard address={address} transactions={transactionList} />
          </div>
          <MyContext.Provider value={{token, setToken, protocols, setProtocols}}>
            <ProtocolsCard address={address} transactions={transactionList} />
          </MyContext.Provider>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
