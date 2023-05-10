import "./Layout.scss";

import Footer from "./Footer/Footer";
import Header from "./Header/Header";

const Layout = ({ children }) => {
  return (
    <div className="LayoutComponent">
      <Header />

      <div className="children --pad">{children}</div>

      <Footer />
    </div>
  );
};

export default Layout;
