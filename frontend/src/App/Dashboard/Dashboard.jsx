import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import ProductIndex from "../Product/ProductIndex";
import ProductsSummary from "../Product/ProductsSummary";

import Layout from "../../components/Layout/Layout";
import Sidebar from "../../components/Layout/Sidebar/Sidebar";
import RedirectLoggedoutUser from "../../hooks/RedirectHook";
import { selectIsLoggedIn } from "../../redux/Auth/AuthSlice";
import { getProducts } from "../../redux/Product/ProductSlice";

const Dashboard = () => {
  RedirectLoggedoutUser("/login");

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const { products, isLoading, isError, message } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(getProducts());
    }

    if (isError) {
      toast.error(message);
    }
  }, [isLoggedIn, isError, message, dispatch]);

  return (
    <div className="DashboardComponent">
      <Sidebar>
        <Layout>
          <h1>Dashboard</h1>
          <hr />
          <ProductsSummary products={products} />
          <ProductIndex products={products} isLoading={isLoading} />
        </Layout>
      </Sidebar>
    </div>
  );
};

export default Dashboard;
