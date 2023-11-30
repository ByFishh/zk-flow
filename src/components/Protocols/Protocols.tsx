import './Protocols.css';
import { v4 as uuidv4 } from 'uuid';
import { useProtocols } from './Protocols.logic';
import { memo } from 'react';
import { Protocol } from '../../blockchains/types.ts';
import { getTimeAgo } from '../../blockchains/utils.ts';
import { toFixed } from '../../utils/toFixed.ts';

const Protocols = memo((props: { items: Protocol[] }) => {
  const logic = useProtocols();

  return (
    <div className="protocols-container">
      <div className="protocols-top">
        <p>Protocols</p>
        <p>Interactions</p>
        <p>Last Activity</p>
        <p>Volume in $</p>
      </div>
      <div className="protocols-items-container">
        {props.items.map((item) => (
          <div className="procotocols-item" key={uuidv4()}>
            <div className="protocols-item-name-container">
              <img src={'/protocols/' + item.id + '.png'} alt="" />
              <div>
                <p>
                  <strong>{item.name}</strong>
                </p>
                <p>{String(item.activeDays)} active days</p>
              </div>
            </div>
            <div className="protocols-item-box">
              <span>Interaction:</span>
              <p>{String(item.interactions)}</p>
            </div>
            <div className="protocols-item-box">
              <span>Last activity:</span>
              <p
                className="protocols-item-last-activity"
                style={{ color: logic.getLastActivityColor(item.lastActivity) }}
              >
                {item.lastActivity ? getTimeAgo(item.lastActivity) : 'No Activity'}
              </p>
            </div>
            <div className="protocols-item-box">
              <span>Volume in $:</span>
              <p>{toFixed(item.volume, 2)}$</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Protocols;
