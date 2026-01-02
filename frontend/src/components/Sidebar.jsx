import { useState } from "react";
import { Link,useLocation } from "react-router-dom";
import { FaHome, FaShoppingCart, FaBoxes, FaChartBar, FaSignOutAlt } from "react-icons/fa";
import "../styles/sidebar.css";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  const location=useLocation();

  const [active, setActive] = useState(location.pathname.slice(1) || "dashboard");
  

  const menuItems = [
    { id: "dashboard", name: "Dashboard", icon: <FaHome />,path:"/" },
    { id: "orders", name: "Orders", icon: <FaShoppingCart /> ,path:"/orders"},
    { id: "stock", name: "Stock", icon: <FaBoxes /> ,path:"/stock"},
    { id: "reports", name: "Reports", icon: <FaChartBar /> },
  ];

  return (
    <div className="sidebar">

      <h2 className="logo">Food<span>Track</span></h2>

      <ul className="menu">

        {menuItems.map((item) => (
          <li
            key={item.id}
            className={active === item.id ? "active menu-item" : "menu-item"}
            onClick={() => setActive(item.id)}
          >

            <NavLink
              to={item.path}
              onClick={() => setActive(item.id)}
              style={{ display: "flex", alignItems: "center", color: "inherit", textDecoration: "none" }}
            >
              <span className="icon">{item.icon}</span>
              <span>{item.name}</span>
            </NavLink>

          </li>
        ))}

      </ul>

      <div className="logout">
        <FaSignOutAlt className="logout-icon" />
        <span>Logout</span>
      </div>

    </div>
  );
};

export default Sidebar;
