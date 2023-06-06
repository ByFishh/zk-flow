import { FC, useEffect, useState } from 'react';
import { getTimeAgo } from '../utils/utils.ts';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';

interface ZkLiteActivityCardProps {
  address: string;
}

const ZkLiteActivityCard: FC<ZkLiteActivityCardProps> = ({ address }) => {
  const [data, setData] = useState<any>(null);
  const [show, setShow] = useState(false);
  const [changePubKeyDate, setChangePubKeyDate] = useState<string | null>(null);
  const [nfts, setNfts] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accountResponse = await fetch(`https://api.zksync.io/api/v0.2/accounts/${address}?stateType=finalized`);
        const accountData = await accountResponse.json();

        const transactionResponse = await fetch(
          `https://api.zksync.io/api/v0.2/accounts/${address}/transactions?from=latest&limit=100&direction=older`,
        );
        const transactionData = await transactionResponse.json();

        if (
          accountData.result &&
          accountData.result.finalized &&
          transactionData.result &&
          transactionData.result.list.length > 0
        ) {
          const { finalized } = accountData.result;
          const { nonce, balances, nfts } = finalized;

          setData({
            nonce,
            tokenBalanceCount: Object.keys(balances).length,
            tokenBalances: balances,
            latestTransactionDate: transactionData.result.list[0].createdAt,
          });

          const changePubKeyTransaction = transactionData.result.list.find(
            (transaction: any) => transaction.op.type === 'ChangePubKey',
          );
          if (changePubKeyTransaction) {
            setChangePubKeyDate(changePubKeyTransaction.createdAt);
          }

          const nftArray = Object.values(nfts);
          setNfts(nftArray);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [address]);

  const handleOpen = () => {
    setShow(!show);
  };

  return (
    <>
      <div
        className="relative mt-1.5 rounded-lg dark:border-gray-700 border border-gray-200 mb-4 ml-4 mr-4 w-[812px] bg-white dark:bg-gray-800 text-center"
        style={{ color: 'white' }}
      >
        <div className="flex justify-between items-center p-3 cursor-pointer" onClick={handleOpen}>
          <h1 className="text-lg font-bold">
            <img className="p-2" src="zkLite.svg" alt="" />
          </h1>
          <div className="pl-3 pr-3">
            {show ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown} />}
          </div>
        </div>

        {show && data && (
          <div className="p-5 pl-20 pr-20 bg-gray-900 rounded-t-lg flex justify-between">
            {data.nonce !== null && (
              <div>
                Interactions
                <br /> <span className="mb-2 text-xl font-extrabold text-blue-600">{data.nonce}</span>{' '}
              </div>
            )}
            {data.latestTransactionDate !== null && (
              <div>
                Last Activity <br></br>
                <span className="mb-2 text-xl font-extrabold text-blue-600">
                  {' '}
                  {getTimeAgo(data.latestTransactionDate)}{' '}
                </span>
              </div>
            )}
            {changePubKeyDate !== null && (
              <div>
                Activated On<br></br>{' '}
                <span className="mb-2 text-xl font-extrabold text-blue-600">{getTimeAgo(changePubKeyDate)}</span>
              </div>
            )}
          </div>
        )}

        {show && data && (
          <div className="p-5 bg-gray-900 rounded-b-lg">
            <div className="items-center overflow-auto whitespace-nowrap">
              <span className="mr-2">Balances</span>
              <div className="text-left inline-flex">
                {data.tokenBalances !== null &&
                  Object.entries(data.tokenBalances).map(([token, balance]) => (
                    <div key={token} className="mr-2 bg-gray-700 p-1 text-sm rounded">
                      {token === 'ETH'
                        ? (parseFloat(balance as string) * 1e-18).toFixed(5)
                        : (parseFloat(balance as string) * 1e-6).toFixed(2)}{' '}
                      {token}
                    </div>
                  ))}
                {nfts.map((nft) => (
                  <div key={nft.id} className="mr-2 bg-gray-700 p-1 text-sm rounded">
                    {nft.symbol}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ZkLiteActivityCard;
