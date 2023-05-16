import { BiSearch } from "react-icons/bi";

import "./ProductSearch.scss";

const ProductSearch = ({ searchText, onSearchTextChange }) => {
  return (
    <div className="ProductSearchComponent">
      <BiSearch size={18} className="icon" />
      <input
        type="text"
        placeholder="Search products"
        value={searchText}
        onChange={onSearchTextChange}
      />
    </div>
  );
};

export default ProductSearch;
