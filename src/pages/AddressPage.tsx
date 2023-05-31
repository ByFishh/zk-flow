import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DappsCard from '../components/DappsCard.tsx';
import BasicsCard from '../components/BasicsCard.tsx';
import { getAllTransactions, Transaction } from '../services/explorer.ts';
import Header from '../components/Header.tsx';

const AddressPage = () => {
  const address = window.location.pathname.split('/')[2];
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState<Transaction[]>([]);

  useEffect(() => {
    if (!address || address.length !== 42 || address.slice(0, 2) !== '0x') {
      navigate('/zk-flow/');
      return;
    }
    fetchTransactionList();
  }, [address, navigate]);

  const fetchTransactionList = async () => {
    const transactions: Transaction[] = await getAllTransactions(address);
    setTransactionList(transactions);
  };

  return (
    <>
      <Header hasSearchBar />
      <div className="grid mt-20 place-items-center ">
        <div className="grid place-items-center">
          <BasicsCard address={address} transactionList={transactionList} />
        </div>
      </div>
    </>
  );
};

export default AddressPage;
