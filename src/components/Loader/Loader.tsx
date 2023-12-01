import './Loader.css';
import { memo } from 'react';

const Loader = memo((props: { message?: string }) => {
  return (
    <div className="loader-container">
      <div className="loader"></div>
      {props.message && <p className="loader-message">{props.message}</p>}
    </div>
  );
});

export default Loader;
