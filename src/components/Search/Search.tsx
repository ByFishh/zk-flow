/* eslint-disable @typescript-eslint/ban-types */
import { memo } from "react";
import Magnifier from "../Magnifier/Magnifier";
import "./Search.css";
import { useSearch } from "./Search.logic";

const Search = memo((props: { action: Function }) => {
  const logic = useSearch(props);

  return (
    <form onSubmit={logic.handleSubmit(logic.onSubmit)}>
      <div className="search-container">
        <button className="search-button-left" type="submit">
          <Magnifier />
        </button>
        <input
          type="text"
          placeholder="Search a Wallet"
          {...logic.register("search")}
        />
        <button className="search-button-right" type="submit">
          Search
        </button>
      </div>
    </form>
  );
});

export default Search;
