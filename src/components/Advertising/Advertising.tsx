import { useAdvertising } from './Advertising.logic';

const Advertising = () => {
  const logic = useAdvertising();

  if (!logic.isLoaded) return <></>;

  return (
    <button className="ad-container">
      <img
        onError={logic.onError}
        onLoad={logic.onImageLoaded}
        src={`/ad/${logic.currentBlockchain}.png`}
        onClick={logic.handleADClick}
      />
    </button>
  );
};

export default Advertising;
