import { useEffect } from 'react';
import { getAddressTransactionCount } from '../services/explorer.ts';

const AddressPage = () => {
  const address = window.location.search.split('=')[1];

  const test = async () => {
    console.log(await getAddressTransactionCount(address));
  };

  useEffect(() => {
    if (address === '' || address.length !== 42 || !address.startsWith('0x')) {
      window.location.search = '';
      return;
    }
    test();
  }, [address]);

  return (
    <>
      <div className="grid mt-20 place-items-center">
        <div className="grid place-items-center">
          <h1 className="font-bold text-6xl text-white mb-10">zkFlow</h1>
        </div>
      </div>
    </>
  );
};

export default AddressPage;
