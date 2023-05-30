import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DappsCard from '../components/DappsCard.tsx';
import BasicsCard from '../components/BasicsCard.tsx';
import { getAllTransactions } from '../services/explorer.ts';
import Header from '../components/Header.tsx';

const AddressPage = () => {
  const address = window.location.pathname.split('/')[2];
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState<any[]>([]);

  useEffect(() => {
    if (!address || address.length !== 42 || address.slice(0, 2) !== '0x') {
      navigate('/zk-flow/');
      return;
    }
    fetchTransactionList();
  }, [address, navigate]);

  const fetchTransactionList = async () => {
    const transactions: any[] = await getAllTransactions(address);
    setTransactionList(transactions);
  };

  return (
    <>
      <Header hasSearchBar />
      <div className="grid mt-20 place-items-center">
        <div className="grid place-items-center">
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
