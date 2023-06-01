import { FC } from 'react';
import { Transaction } from '../services/explorer.ts';

interface ProtocolsCardProps {
  address: string;
  transactions: Transaction[];
}

const ProtocolsCard: FC<ProtocolsCardProps> = ({ address, transactions }) => {
  return (
    <div className="relative rounded-lg dark:border-gray-700 border border-gray-200">
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
        <tbody className="rounded-lg">
          <tr className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              AAAAA
            </th>
            <td className="px-6 py-4">AAAA</td>
            <td className="px-6 py-4">AAAA</td>
            <td className="px-6 py-4">AAAA</td>
          </tr>
          <tr className="bg-white dark:bg-gray-800">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
              AAAA
            </th>
            <td className="px-6 py-4">AAAA</td>
            <td className="px-6 py-4">AAAA</td>
            <td className="px-6 py-4">AAAA</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProtocolsCard;
