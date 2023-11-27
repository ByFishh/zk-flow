import { memo } from 'react';
import './Title.css';

const Title = memo((props: { content: string }) => {
  return <h2 className="title">{props.content}</h2>;
});

export default Title;
