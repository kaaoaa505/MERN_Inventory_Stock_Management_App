import { useState } from "react";
import { FaTablets, FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./Sidebar.scss";

import Menu from "./Menu";
import Item from "./Item";

const Sidebar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  const menuDisplay = Menu.map((menuItem, index) => {
    return <Item key={index} item={menuItem} isOpen={isOpen} />;
  });

  const navigate = useNavigate();

  const goHome = () => {
    return navigate('/');
  }

  return (
    <div className="SidebarComponent layout">
      <div
        className={isOpen ? "sidebar sidebar-opened" : "sidebar sidebar-closed"}
      >
        <div className="top_section">
          <div className={isOpen ? "logo logo-opened" : "logo logo-closed"}>
            <FaTablets size={50} className="logo-icon" onClick={goHome} />
          </div>
          <div className={isOpen ? "bars bars-opened" : "bars bars-closed"}>
            <FaBars size={30} className="logo-icon" onClick={toggle} />
          </div>
        </div>
        {menuDisplay}
      </div>

      <main className={isOpen ? "main-opened" : "main-closed"}>{children}</main>
    </div>
  );
};

export default Sidebar;
