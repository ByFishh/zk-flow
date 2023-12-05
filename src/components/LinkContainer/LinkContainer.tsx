import { Link } from 'react-router-dom';

const LinkContainer = (props: { children: JSX.Element; to: string; canRedirect: boolean }) => {
  if (!props.canRedirect) return props.children;

  return (
    <Link target="_blank" to={props.to} rel="noopener noreferrer">
      {props.children}
    </Link>
  );
};

export default LinkContainer;
