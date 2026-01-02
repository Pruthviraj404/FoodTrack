
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

import Orders from "../pages/Orders";

const DashboardLayout=()=>{
    return(
          <div style={{ display: "flex" }}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Area */}
      <div style={{ marginLeft: "230px", padding: "20px", width: "100%" }}>
        <Header title="Dashboard" />

        {/* This renders the nested page content */}
        <Outlet />
      </div>
    </div>
      
    );
} ;


export default DashboardLayout;