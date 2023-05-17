import { FaTh, FaRegChartBar, FaCommentAlt, FaStreetView, FaEdit } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const Menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Product Add",
    icon: <BiImageAdd />,
    path: "/product/add",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile View",
        path: "/profile/show",
        icon: <FaStreetView />,
      },
      {
        title: "Profile Edit",
        path: "/profile/edit",
        icon: <FaEdit />,
      },
    ],
  },
  {
    title: "Contact us",
    icon: <FaCommentAlt />,
    path: "/contactus",
  },
];

export default Menu;