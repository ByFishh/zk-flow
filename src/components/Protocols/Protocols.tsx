import './Protocols.css';
import { v4 as uuidv4 } from 'uuid';
import { useProtocols } from './Protocols.logic';
import { memo } from 'react';

const Protocols = memo(
  (props: {
    items: {
      name: string;
      activeDays: string | number;
      interactions: number;
      lastActivity: number;
      volume: string;
    }[];
  }) => {
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
                <img
                  src="https://images.unsplash.com/photo-1682685797736-dabb341dc7de?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt=""
                />
                <div>
                  <p>
                    <strong>{item.name}</strong>
                  </p>
                  <p>{String(item.activeDays)} Active days</p>
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
                  {String(item.lastActivity)} Days ago
                </p>
              </div>
              <div className="protocols-item-box">
                <span>Volume in $:</span>
                <p>{item.volume}$</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  },
);

export default Protocols;
