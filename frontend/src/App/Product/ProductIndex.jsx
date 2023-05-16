import { AiOutlineEye } from "react-icons/ai";
import { FaEdit, FaTrashAlt } from "react-icons/fa";

import "./ProductIndex.scss";

import ProductSearch from "./ProductSearch";

import Loading from "../../components/Loading/Loading";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import TextHelper from "../../helpers/TextHelper";
import {
  PRODUCTS_BY_SEARCH,
  selectProductsBySearch,
} from "../../redux/Product/SearchSlice";

const ProductIndex = ({ products, isLoading }) => {
  const [searchText, setSearchText] = useState("");

  const productsBySearch = useSelector(selectProductsBySearch);

  const dispatch = useDispatch();

  const onSearchTextChange = (event) => {
    setSearchText(event.target.value);
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

        {!isLoading && productsBySearch.length === 0 ? <p>No product found.</p> : ""}
        {!isLoading && productsBySearch.length > 0 ? (
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
              {productsBySearch.map((product, index) => (
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
      </div>
    </div>
  );
};

export default ProductIndex;
