import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { NavLink } from "react-router-dom";

const Item = ({ item, isOpen }) => {
  const [expandMenu, setExpandMenu] = useState(false);

  const toggle = () => {
    setExpandMenu(!expandMenu);
  };

  const activeLink = (isActive) => {
    return isActive ? "active" : "link";
  };

  const activeSubLink = (isActive) => {
    return isActive ? "active" : "link";
  };

  const itemChilrenMap = (item) =>
    item.childrens.map((child, index) => {
      return (
        <div key={index} className="s-child">
          <NavLink to={child.path} className={activeSubLink}>
            <div className="sidebaritem">
              <div className="sidebar-title">
                <span>
                {child.icon && <div className="icons">{child.icon}</div>}

                {isOpen && <div className="title">{child.title}</div>}
                </span>
              </div>
            </div>
          </NavLink>
        </div>
      );
    });

  if (item.childrens) {
    return (
      <div
        className={
          expandMenu
            ? "ItemComponent sidebar-item s-parent open"
            : "ItemComponent sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icons">{item.icon}</div>}

            {isOpen && <div className="title">{item.title}</div>}
          </span>
          <MdKeyboardArrowRight
            size={25}
            className="arrow-icon"
            onClick={toggle}
          />
        </div>
        <div className="sidebar-content">{itemChilrenMap(item)}</div>
      </div>
    );
  } else {
    return (
      <NavLink to={item.path} className={activeSubLink}>
      <div
        className={
          expandMenu
            ? "ItemComponent sidebar-item s-parent open"
            : "ItemComponent sidebar-item s-parent"
        }
      >
        <div className="sidebar-title">
          <span>
            {item.icon && <div className="icons">{item.icon}</div>}

            {isOpen && <div className="title">{item.title}</div>}
          </span>
        </div>
      </div>
      </NavLink>
    );
  }
};

export default Item;
