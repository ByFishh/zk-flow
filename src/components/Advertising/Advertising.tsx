import { useAdvertising } from './Advertising.logic';

const Advertising = (props: { id: 0 | 1 }) => {
  const logic = useAdvertising(props.id);

  if (!logic.isLoaded) return <></>;

  return (
    <button className="ad-container">
      <img onError={logic.onError} onLoad={logic.onImageLoaded} src={logic.image} onClick={logic.handleADClick} />
    </button>
  );
};

export default Advertising;
