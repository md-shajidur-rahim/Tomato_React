import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

// Sidebar Component
const Sidebar = () => {

  return (
    <div className="sidebar">
      <div className="sidebar-options">

        {/* To missing in NavLink fixing */}

        <NavLink to='./add' className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Items</p>
        </NavLink>

        <NavLink to='./list-items' className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>List Items</p>
        </NavLink>

        <NavLink to='./orders' className="sidebar-option">
          <img src={assets.order_icon} alt="" />
          <p>Orders</p>
        </NavLink>

      </div>
    </div>
  );
};

export default Sidebar;