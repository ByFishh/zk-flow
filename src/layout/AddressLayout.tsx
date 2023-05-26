import { useEffect, useState } from 'react';
import { getAllTransactions } from '../services/explorer.ts';
import BasicsCard from '../components/BasicsCard.tsx';
import DappsCard from '../components/DappsCard.tsx';

const AddressPage = () => {
  const address = window.location.search.split('=')[1];
  const [transactionList, setTransactionList] = useState<any[]>();

  const fetchTransactionList = async () => {
    const transactions: any[] = await getAllTransactions(address);
    setTransactionList(transactions);
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
          <br />
          <DappsCard address={address} transactionList={transactionList} />
          <div className="text-center text-white mb-8">
            <h5>This is the first version of zkFlow (with a lot of bug)</h5>
            <h5>Don't hesitate to report them to me on twitter (@ByFishh).</h5>
            <br />
            <h5>If you want to pay me a beer, feel free to send it to this address</h5>
            <h5>0xF859dE92A63070C54d05E33a4e99D707a34FDb12</h5>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
