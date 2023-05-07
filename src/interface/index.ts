import { SyntheticEvent } from "react";


export interface IData {
  author: string;
  country: string;
  imageLink: string;
  language: string;
  link: string;
  pages: number;
  title: string;
  year: number;
}

export interface IAutoCompleteProps {
  placeholder: string;
  showList: boolean;
  setShowList: (show: boolean) => void;
  handleSearch: any;
  handleSubmit: (e: SyntheticEvent) => void;
  searchVal: string;
  searchHistory: string[];
  handleItemSelection: (input: string) => void;
  filteredData: IData[];
  highlightMatch: any;
  results: IData[];
  clearInput: () => void;
}
