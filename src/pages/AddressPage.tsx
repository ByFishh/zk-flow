import { useEffect, useState } from 'react';
import { getTransactionsList, Token, Transaction } from '../services/explorer.ts';
import Header from '../components/Header.tsx';
import InteractionsCard from '../components/InteractionsCard.tsx';
import VolumeCard from '../components/VolumeCard.tsx';
import FeeCard from '../components/FeeCard.tsx';
import TokensCard from '../components/TokensCard.tsx';
import ActivityCard from '../components/ActivityCard.tsx';
import ZkLiteActivityCard from '../components/ZkLiteActivityCard.tsx';
import ProtocolsCard, { ProtocolState } from '../components/ProtocolsCard.tsx';
import { GlobalContext } from '../contexts/global-context.ts';

const AddressPage = () => {
  const address = window.location.search.split('=')[1];
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);
  const [protocols, setProtocols] = useState<ProtocolState[] | undefined>(undefined);
  const [token, setToken] = useState<Token[] | undefined>(undefined);

  useEffect(() => {
    if (!address || address.length !== 42 || address.slice(0, 2) !== '0x') {
      window.location.search = '';
      return;
    }
    fetchTransactionList();
  }, [address]);

  const fetchTransactionList = async () => {
    const transactions: Transaction[] = await getTransactionsList(address);
    setTransactionList(transactions);
  };

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
          <GlobalContext.Provider value={{ token, setToken, protocols, setProtocols }}>
            <div className="flex items-center flex-row space-x-5 mt-1.5">
              <TokensCard address={address} />
              <ActivityCard address={address} transactions={transactionList} />
            </div>
            <ZkLiteActivityCard address={address} />
            <ProtocolsCard address={address} transactions={transactionList} />
          </GlobalContext.Provider>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
