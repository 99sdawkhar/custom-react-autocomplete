import { ChangeEvent, SyntheticEvent, useState } from 'react'
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

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const searchWord = e.target.value.toLowerCase();
    setSearchVal(searchWord);
    handleFilters(searchWord);
  };

  const handleFilters = (input: string) => {
    if (input !== "") {
      const newFilter = data.filter((value: IData) => {
        return value.title.toLowerCase().includes(input.toLowerCase());
      });
      setFilteredData(newFilter);
    }
  };

  const displayFilteredList = (input: string) => {
    if (input !== "") {
      const newFilter = data.filter((value: IData) => {
        return value.title.toLowerCase().includes(input.toLowerCase());
      });
      setResults(newFilter);
    }
  };

  const clearInput = () => setSearchVal("");

  const handleSearchHistory = () => {
    if (!searchHistory.includes(searchVal)) {
      const newList = [...searchHistory, searchVal];
      const sortedList = newList.sort((a, b) => b.localeCompare(a));
      setSearchHistory(sortedList.slice(0, 5));
    }
  };

  const highlightMatch = (result: IData) => {
    const regex = new RegExp(searchVal, "gi");
    return result.title.replace(
      regex,
      (match: string) => `<span class="highlighted">${match}</span>`
    );
  };

  const handleItemSelection = (input: string) => {
    setSearchVal(input);
    setShowList(false);
  };

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
      />
    </>
  )
}

export default App
