import { FC, useEffect, useState } from 'react';
import { getTimeAgo } from '../utils/utils.ts';
import { availableDapps } from '../utils/available-dapps.ts';

interface DappsInfo {
  name: string;
  id: string;
  lastActivity: string;
  totalVolume: number;
  totalInteractions: number;
}

const DappsCard: FC<{ address: string; transactionList: any[] }> = ({ address, transactionList = [] }) => {
  const [dappsInfos, setDappsInfos] = useState<DappsInfo[]>([]);

  const getDappInfo = (
    transactionList: any[],
    dapp: {
      name: string;
      id: string;
      addresses: string[];
    },
  ): DappsInfo => {
    const tmp = {
      name: dapp.name,
      id: dapp.id,
      lastActivity: '',
      totalVolume: 0,
      totalInteractions: 0,
    };

    transactionList.forEach((transaction: any) => {
      const erc20Transfers = transaction.erc20Transfers.sort((a: any, b: any) => {
        const valueA = parseInt(a.amount, 16) * 10 ** -a.tokenInfo.decimals * a.tokenInfo.usdPrice;
        const valueB = parseInt(b.amount, 16) * 10 ** -b.tokenInfo.decimals * b.tokenInfo.usdPrice;

        return valueB - valueA;
      });

      if (
        dapp.addresses.includes(erc20Transfers[0].to.toLowerCase()) ||
        dapp.addresses.includes(erc20Transfers[0].from.toLowerCase())
      ) {
        tmp.totalInteractions += 1;
        tmp.totalVolume +=
          parseInt(erc20Transfers[0].amount, 16) *
          10 ** -erc20Transfers[0].tokenInfo.decimals *
          erc20Transfers[0].tokenInfo.usdPrice;
        if (tmp.lastActivity === '') tmp.lastActivity = transaction.receivedAt;
        if (new Date(tmp.lastActivity) < new Date(transaction.receivedAt)) tmp.lastActivity = transaction.receivedAt;
      }
    });
    return tmp;
  };

  useEffect(() => {
    if (!transactionList || !address) return;
    const tmp: DappsInfo[] = [];
    availableDapps.forEach((dapp) => {
      tmp.push(getDappInfo(transactionList, dapp));
    });
    setDappsInfos(tmp);
  }, [address, transactionList]);

  return (
    <div className="block p-6 border rounded-lg shadow bg-gray-800 border-gray-700 text-center overflow-auto mb-8">
      <div className="max-w-screen-xl p-2 mx-auto text-white text-center">
        <div className="relative overflow-x-auto">
          <table className="w-full text-sm text-center text-gray-400">
            <thead className="text-2xl text-white">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Protocols
                </th>
                <th scope="col" className="px-6 py-3">
                  Interactions
                </th>
                <th scope="col" className="px-6 py-3">
                  Last activity
                </th>
                <th scope="col" className="px-6 py-3">
                  Volume
                </th>
              </tr>
            </thead>
            <tbody>
              {dappsInfos &&
                dappsInfos
                  .sort((a, b) => b.totalVolume - a.totalVolume)
                  .map((dapp) => {
                    if (dapp.totalInteractions === 0) return null;
                    return (
                      <tr className="bg-gray-800 text-xl" key={dapp.id}>
                        <th
                          scope="row"
                          className="flex items-center space-x-4 px-6 py-4 text-left font-normal text-white"
                        >
                          <img className="w-10 h-10 rounded-full" src={`/dapp/${dapp.id}.png`} alt={dapp.name} />
                          <div className="font-medium text-white">
                            <div>{dapp.name}</div>
                          </div>
                        </th>
                        <td className="px-6 py-4">{dapp.totalInteractions}</td>
                        <td className="px-6 py-4">{getTimeAgo(dapp.lastActivity)}</td>
                        <td className="px-6 py-4">{dapp.totalVolume.toFixed(2)}</td>
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DappsCard;
