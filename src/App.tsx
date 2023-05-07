import { ChangeEvent, SyntheticEvent, useRef, useState } from 'react'
import data from './data.json'
import AutoComplete from './components/AutoComplete'
import { IData } from './interface';
import './App.css'

const App = () => {
  const [searchVal, setSearchVal] = useState<string>("");
  const [filteredData, setFilteredData] = useState<IData[]>([]);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [results, setResults] = useState<IData[]>([]);
  const [showList, setShowList] = useState<boolean>(false);
  const submitRef = useRef<HTMLButtonElement>(null); // Create a ref for the dropdown element

  // onChange handler
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchVal(searchWord);
    handleFilters(searchWord);
  };

  // show filtered results in dropdown
  const handleFilters = (input: string) => {
    if (input !== "") {
      const newFilter = data.filter((value: IData) => {
        return value.title.toLowerCase().includes(input.toLowerCase());
      });
      setFilteredData(newFilter);
    }
  };

  // show all filtered results on click of submit button
  const displayFilteredList = (input: string) => {
    if (input !== "") {
      const newFilter = data.filter((value: IData) => {
        return value.title.toLowerCase().includes(input.toLowerCase());
      });
      setResults(newFilter);
    }
  };

  // clear input
  const clearInput = () => setSearchVal("");

  // handle search history, displaying top 5 search results
  const handleSearchHistory = () => {
    if (!searchHistory.includes(searchVal)) {
      const newList = [...searchHistory, searchVal];
      const sortedList = newList.sort((a, b) => b.localeCompare(a));
      setSearchHistory(sortedList.slice(0, 5));
    }
  };

  // highlighted text in dropdown
  const highlightMatch = (result: IData) => {
    const regex = new RegExp(searchVal, "gi");
    return result.title.replace(
      regex,
      (match: string) => `<span class="highlighted">${match}</span>`
    );
  };

  // onClick select item from dropdownlist
  const handleItemSelection = (input: string) => {
    setSearchVal(input);
    setShowList(false);
    submitRef && submitRef.current?.focus();
  };

  // submit handler
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    handleSearchHistory();
    displayFilteredList(searchVal);
    setShowList(false);
  };
  
  return (
    <>
      <AutoComplete 
        placeholder="Search here.." 
        showList={showList}
        setShowList={setShowList}
        handleSubmit={handleSubmit}
        handleSearch={handleSearch}
        searchVal={searchVal}
        searchHistory={searchHistory}
        handleItemSelection={handleItemSelection}
        filteredData={filteredData}
        highlightMatch={highlightMatch}
        results={results}
        clearInput={clearInput}
        ref={submitRef}
      />
    </>
  )
}

export default App
