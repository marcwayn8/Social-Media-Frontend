import {  HelpOutline} from "@mui/icons-material";
import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";

import "./sidebar.css";

export default function Sidebar() {
  
  const { user } = useContext(AppContext);

  const navigate = useNavigate();
  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText" >About Us</span>
          </li>
        </ul>
       
      </div>
    </div>
  );
}
