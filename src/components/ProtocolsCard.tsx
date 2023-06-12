import { FC, useContext, useEffect, useState } from 'react';
import { Transaction } from '../services/explorer.ts';
import { getTimeAgo } from '../utils/utils.ts';
import { GlobalContext } from '../contexts/global-context.ts';
import { generateCSV } from '../utils/generate-csv.ts';
import { SyncSwap } from '../protocols/syncswap.ts';
import { ZkSyncEraPortal } from '../protocols/zksynceraportal.ts';
import { ZkSyncNameService } from '../protocols/zksyncnameservice.ts';
import { Mute } from '../protocols/muteio.ts';
import { Velocore } from '../protocols/velocore.ts';
import { Orbiter } from '../protocols/orbiter.ts';
import { Holdstation } from '../protocols/holdstation.ts';
import { IzumiFinance } from '../protocols/izumi.ts';
import { Maverick } from '../protocols/maverick.ts';
import { OnchainTrade } from '../protocols/onchaintrade.ts';
import { SpaceFi } from '../protocols/spacefi.ts';
import { Starmaker } from '../protocols/starmaker.ts';
import { Goal3 } from '../protocols/goal3.ts';

interface ProtocolsCardProps {
  address: string;
  transactions: Transaction[];
}

export interface ProtocolState {
  name: string;
  id: string;
  lastActivity: string;
  volume: number;
  interactions: number;
  activeDays: number;
  approves: number;
  url: string;
  tag?: string;
}

const ProtocolsCard: FC<ProtocolsCardProps> = ({ address, transactions }) => {
  const [protocolsState, setProtocolsState] = useState<ProtocolState[]>([]);
  const protocolsContext = useContext(GlobalContext);

  const getProtocolsState = () => {
    setProtocolsState([]);
    setProtocolsState((prevState) => [...prevState, Holdstation.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, IzumiFinance.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, Maverick.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, Mute.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, OnchainTrade.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, Orbiter.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, SpaceFi.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, Starmaker.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, SyncSwap.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, Velocore.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, ZkSyncEraPortal.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, ZkSyncNameService.getProtocolsState(transactions, address)]);
    setProtocolsState((prevState) => [...prevState, Goal3.getProtocolsState(transactions, address)]);

    setProtocolsState((prevState) => prevState.sort((a, b) => b.volume - a.volume));
  };

  useEffect(() => {
    getProtocolsState();
  }, [transactions]);

  return (
    <div className="relative mt-1.5 rounded-lg dark:border-gray-700 border border-gray-200 mb-20 ml-4 mr-4">
      {protocolsState.length && (
        <button
          onClick={() => generateCSV(protocolsContext?.token, protocolsState)}
          className="absolute top-5 right-4 py-2.5 px-5 mr-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
        >
          Download
        </button>
      )}
      <table className="text-sm w-[812px] text-left text-gray-500 dark:text-gray-400 ">
        <caption className="p-5 text-lg font-semibold text-left text-gray-900 bg-white dark:text-white dark:bg-gray-800 rounded-t-lg">
          Protocols
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Here is the list of protocols used by this address.
          </p>
          <p className="mt-1 text-sm font-normal text-gray-500 dark:text-gray-400">
            Note that it is the first version of zkFlow. If you find an issue, don't hesitate to report it to me on
            twitter (@ByFishh).
          </p>
        </caption>
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Protocols
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Interactions
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Last activity
            </th>
            <th scope="col" className="px-6 py-3 text-center">
              Volume in $
            </th>
          </tr>
        </thead>
        <tbody className="rounded-lg">
          {protocolsState &&
            protocolsState.map((protocolState, index) => {
              return (
                <tr
                  className={
                    'bg-white dark:bg-gray-800 ' +
                    (index !== protocolsState.length - 1 && 'border-b dark:border-gray-700')
                  }
                  key={protocolState.id}
                >
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 dark:text-white cursor-pointer">
                    <div
                      className="flex items-center space-x-4"
                      onClick={() => {
                        window.open(protocolState.url, '_blank');
                      }}
                    >
                      <img
                        className={'w-10 h-10 rounded-full ' + (!protocolState.interactions && 'grayscale')}
                        src={'/zk-flow/protocol/' + protocolState.id + '.png'}
                        alt=""
                      />
                      <div className="font-medium dark:text-white">
                        <div className="flex">
                          {protocolState.name}
                          {protocolState.tag && (
                            <span className="ml-2 mb-1 bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                              {protocolState.tag}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {protocolState.activeDays <= 1
                            ? protocolState.activeDays + ' active day'
                            : protocolState.activeDays + ' active days'}
                        </div>
                      </div>
                    </div>
                  </th>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                    {protocolState.interactions}
                  </td>
                  <td className="px-6 py-4 text-center font-medium">
                    {protocolState.lastActivity === '' ? (
                      <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-red-400 border border-red-400">
                        No activity
                      </span>
                    ) : new Date(protocolState.lastActivity).getTime() > new Date().getTime() - 86400000 * 7 ? (
                      <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-green-400 border border-green-400">
                        {getTimeAgo(protocolState.lastActivity)}
                      </span>
                    ) : (
                      <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-gray-700 dark:text-yellow-300 border border-yellow-300">
                        {getTimeAgo(protocolState.lastActivity)}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-center font-medium text-gray-900 dark:text-white">
                    {protocolState.volume.toFixed(2)}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
};

export default ProtocolsCard;
