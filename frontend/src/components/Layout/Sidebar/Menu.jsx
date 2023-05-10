import { FaTh, FaRegChartBar, FaCommentAlt, FaStreetView, FaEdit } from "react-icons/fa";
import { BiImageAdd } from "react-icons/bi";

const Menu = [
  {
    title: "Dashboard",
    icon: <FaTh />,
    path: "/dashboard",
  },
  {
    title: "Add Product",
    icon: <BiImageAdd />,
    path: "/add-product",
  },
  {
    title: "Account",
    icon: <FaRegChartBar />,
    childrens: [
      {
        title: "Profile",
        path: "/profile",
        icon: <FaStreetView />,
      },
      {
        title: "Edit Profile",
        path: "/edit-profile",
        icon: <FaEdit />,
      },
    ],
  },
  {
    title: "Report Bug",
    icon: <FaCommentAlt />,
    path: "/contact-us",
  },
];

export default Menu;