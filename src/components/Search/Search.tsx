/* eslint-disable @typescript-eslint/ban-types */
import { memo } from 'react';
import Magnifier from '../../icons/Magnifier/Magnifier';
import './Search.css';
import { useSearch } from './Search.logic';

const Search = memo((props: { action: Function; placeholder?: string }) => {
  const logic = useSearch(props);

  return (
    <form onSubmit={logic.handleSubmit(logic.onSubmit)}>
      <div className="search-container">
        <button className="search-button-left" type="submit">
          <Magnifier />
        </button>
        <input type="text" placeholder={props.placeholder ?? 'Search'} {...logic.register('search')} />
        <button className="search-button-right" type="submit">
          Search
        </button>
      </div>
    </form>
  );
});

export default Search;
