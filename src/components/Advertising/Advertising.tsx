import { useAdvertising } from './Advertising.logic';

const Advertising = (props: { id: 0 | 1 }) => {
  const logic = useAdvertising(props.id);

  if (!logic.isLoaded) return <></>;

  return (
    <>
      {logic.image && (
        <button className="f62bde80">
          <img onError={logic.onError} onLoad={logic.onImageLoaded} src={logic.image} onClick={logic.handleADClick} />
          <span>* Paid Advertisement</span>
        </button>
      )}
    </>
  );
};

export default Advertising;
