import { useEffect, useState } from "react";
import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import ReactPaginate from "react-paginate";

import "./ProductIndex.scss";

import ProductSearch from "./ProductSearch";

import Loading from "../../components/Loading/Loading";
import TextHelper from "../../helpers/TextHelper";
import {
  PRODUCTS_BY_SEARCH,
  selectProductsBySearch,
} from "../../redux/Product/SearchSlice";

const ProductIndex = ({ products, isLoading }) => {
  const [searchText, setSearchText] = useState("");

  const [currentItems, setCurrentItems] = useState([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 2;

  const productsBySearch = useSelector(selectProductsBySearch);

  const dispatch = useDispatch();

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;

    setCurrentItems(productsBySearch.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(productsBySearch.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, productsBySearch]);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % productsBySearch.length;
    setItemOffset(newOffset);
  };

  useEffect(() => {
    dispatch(PRODUCTS_BY_SEARCH({ products, searchText }));
  }, [products, searchText, dispatch]);

  return (
    <div className="ProductIndexComponent">
      {isLoading && <Loading />}

      <hr />

      <div className="table">
        <div className="--flex-between --flex-dir-column">
          <span>
            <h4>Inventory Items</h4>
          </span>
          <span>
            <ProductSearch
              searchText={searchText}
              onSearchTextChange={onSearchTextChange}
            />
          </span>
        </div>

        {!isLoading && currentItems.length === 0 ? (
          <p>No product found.</p>
        ) : (
          ""
        )}
        {!isLoading && currentItems.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>s/n</th>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => (
                <tr key={product._id}>
                  <td>{index + 1}</td>
                  <td>{TextHelper.shortenText(product.name, 20)}</td>
                  <td>{TextHelper.shortenText(product.description, 10)}</td>
                  <td>{product.category}</td>
                  <td>${product.price}</td>
                  <td>{product.quantity}</td>
                  <td>${product.price * product.quantity}</td>
                  <td className="icons">
                    <span>
                      <AiOutlineEye size={20} color="green" />
                    </span>
                    <span>
                      <FaEdit size={20} color="gray" />
                    </span>
                    <span>
                      <FaTrashAlt size={20} color="darkred" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          ""
        )}

        <ReactPaginate
          breakLabel="..."
          nextLabel="Next"
          onPageChange={handlePageClick}
          pageRangeDisplayed={itemsPerPage}
          pageCount={pageCount}
          previousLabel="Prev"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          pageLinkClassName="page-num"
          previousLinkClassName="page-num"
          nextLinkClassName="page-num"
          activeLinkClassName="activePage"
        />
      </div>
    </div>
  );
};

export default ProductIndex;
