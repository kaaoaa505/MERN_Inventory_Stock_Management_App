import {AiFillDollarCircle} from 'react-icons/ai';
import {BiCategory} from 'react-icons/bi';
import {BsCart4, BsCartX} from 'react-icons/bs';
import { useDispatch, useSelector } from "react-redux";

import './ProductsSummary.scss';

import InfoBox from '../../components/InfoBox/InfoBox';
import { PRODUCTS_CATEGORIES, PRODUCTS_OUT_OF_STOCK, selectCategories, selectOutOfStock, selectProductsTotal } from '../../redux/Product/ProductSlice';
import { useEffect } from 'react';
import { PRODUCTS_TOTAL } from '../../redux/Product/ProductSlice';
import TextHelper from '../../helpers/TextHelper';

const iconProducts = <BsCart4 size={40} color='#fff' />;
const iconEarning = <AiFillDollarCircle size={40} color='#fff' />;
const iconStock = <BsCartX size={40} color='#fff' />;
const iconCategories= <BiCategory size={40} color='#fff' />;

const ProductsSummary = ({products}) => {
  const dispatch = useDispatch();

  const productsTotal = useSelector(selectProductsTotal);
  const outOfStock = useSelector(selectOutOfStock);
  const categories = useSelector(selectCategories);

  useEffect(() => {
    dispatch(PRODUCTS_TOTAL(products));
    dispatch(PRODUCTS_OUT_OF_STOCK(products));
    dispatch(PRODUCTS_CATEGORIES(products));
  }, [products, productsTotal, outOfStock, categories, dispatch]);

  return (
    <div className={`ProductsSummaryComponent`}>
      <h4 className='--mt'>Products Summary</h4>
      <div className="info-summary">
        <InfoBox icon={iconProducts} title="Products" count={products.length ?? 0} color="card1" />
        <InfoBox icon={iconEarning} title="Total" count={'$' + TextHelper.numberWithCommas(productsTotal)} color="card2" />
        <InfoBox icon={iconStock} title="Out of Stock" count={outOfStock} color="card3" />
        <InfoBox icon={iconCategories} title="Categories" count={categories} color="card4" />
      </div>
    </div>
  );
};

export default ProductsSummary;
