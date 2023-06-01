import { FC } from 'react';
import { Transaction } from '../services/explorer.ts';

import InteractionsCard from './InteractionsCard.tsx';
import VolumeCard from './VolumeCard.tsx';
import FeeCard from './FeeCard.tsx';
import TokensCard from './TokensCard.tsx';
import ActivityCard from './ActivityCard.tsx';

const BasicsCard: FC<{ address: string; transactionList: Transaction[] }> = ({ address, transactionList }) => {
  return (
    <>
      <div className="flex flex-col items-center sm:flex-row sm:space-x-5 mt-5">
        <InteractionsCard address={address} transactions={transactionList} />
        <VolumeCard address={address} transactions={transactionList} />
        <FeeCard address={address} transactions={transactionList} />
      </div>
      <div className="flex flex-col items-center sm:flex-row sm:space-x-5 mt-1.5">
        <TokensCard address={address} />
        <ActivityCard address={address} transactions={transactionList} />
      </div>
    </>
  );
};

export default BasicsCard;
