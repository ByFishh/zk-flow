import { useEffect, useState } from 'react';
import { getAllTransactions } from '../services/explorer.ts';
import BasicsCard from '../components/BasicsCard.tsx';

const AddressPage = () => {
  const address = window.location.search.split('=')[1];
  const [transactionList, setTransactionList] = useState<any[]>();

  const fetchTransactionList = async () => {
    const transactions: any[] = await getAllTransactions(address);
    setTransactionList(transactions);
    console.log(transactions);
  };

  useEffect(() => {
    if (address === '' || address.length !== 42 || !address.startsWith('0x')) {
      window.location.search = '';
      return;
    }
    fetchTransactionList();
  }, [address]);

  return (
    <>
      <div className="grid mt-20 place-items-center">
        <div className="grid place-items-center">
          <h1 className="font-bold text-6xl text-white mb-10">zkFlow</h1>
          <BasicsCard address={address} transactionList={transactionList} />
        </div>
      </div>
    </>
  );
};

export default AddressPage;
