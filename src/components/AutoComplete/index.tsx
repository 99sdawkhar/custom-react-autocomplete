import React, { Ref, forwardRef } from "react";
import CloseIcon from "../CloseIcon";
import SearchIcon from "../SearchIcon";
import "./autoComplete.style.css";
import { IAutoCompleteProps, IData } from "../../interface";

const AutoComplete = forwardRef<HTMLButtonElement, IAutoCompleteProps>(({ 
  placeholder, 
  showList,
  setShowList,
  handleSearch,
  handleSubmit,
  searchVal,
  searchHistory,
  handleItemSelection,
  filteredData,
  highlightMatch,
  results,
  clearInput
}, ref) => {

  return (
    <div className="wrapper">
      {showList && (
        <div className="overlay" onClick={() => setShowList(false)} />
      )}
      <div className="autocomplete-container">
        <form className="search" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-control">
            <input
              type="text"
              placeholder={placeholder}
              value={searchVal}
              onClick={() => setShowList(true)}
              onChange={handleSearch}
            />
            {searchVal !== "" && (
              <div className="close" onClick={clearInput}>
                <CloseIcon />
              </div>
            )}
          </div>
          <button type="submit" className="search-icon" ref={ref}>
            <SearchIcon />
          </button>
        </form>

        {/* Display last 5 search history in dropdown  */}
        {showList && searchVal === "" && (
          <ul className="data-result">
            {searchHistory.length > 0 ? (
              searchHistory.map((query: string, i: number) => (
                <li key={i} onClick={() => handleItemSelection(query)}>
                  {query}
                </li>
              ))
            ) : (
              <li className="empty">No historic search found.</li>
            )}
          </ul>
        )}

        {/* Display top 5 search results matching data in dropdown */}
        {showList && searchVal !== "" && (
          <ul className="data-result">
            {filteredData.length > 0 ? (
              filteredData.slice(0, 5).map((item: IData, i: number) => {
                return (
                  <li
                    key={i}
                    dangerouslySetInnerHTML={{ __html: highlightMatch(item) }}
                    onClick={() => handleItemSelection(item.title)}
                  />
                );
              })
            ) : (
              <li className="empty">No search results found.</li>
            )}
          </ul>
        )}
      </div>

      {/* Display top all the results matching data */}
      {results.length > 0 ? (
        <div className="search-results">
          <h3>Search Results</h3>
          <ul>
            {results.length > 0 && results.map((item: IData, i: number) => {
                return <li key={i}>{item.title}</li>;
              })}
          </ul>
        </div>
      )
      : (
        <div className="empty-list">No search results found.</div>
      )}
    </div>
  );
});

export default AutoComplete;
