const Chevron = (props: { isActive: boolean }) => {
  return (
    <svg
      width="12"
      height="6"
      viewBox="0 0 25 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      data-is-active={props.isActive}
    >
      <path
        d="M22.0625 2.85906e-07L12.5 8.65317L2.9375 2.85906e-07L9.53674e-07 2.66397L12.5 14L25 2.66397L22.0625 2.85906e-07Z"
        fill="#CCB256"
      />
    </svg>
  );
};

export default Chevron;
