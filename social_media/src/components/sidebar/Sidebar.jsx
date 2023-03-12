import {  HelpOutline} from "@mui/icons-material";
import { useContext, useEffect, useState ,Fragment } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AppContext from "../../context/appContext";
import React from 'react';
import ComplaintModal from "../complaint form/complaintModal";
import logo from './img.jpg'

import { Menu, Transition } from '@headlessui/react'

import "./sidebar.css";

export default function Sidebar() {
  
  const { user } = useContext(AppContext);

  const navigate = useNavigate();
  const button = {
    backgroundColor: "black",
    height: "10",
    width: "10"
}

  
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
      <div className="user-profile">
        <div className="welcome-message">Welcome,{user.username}</div>
        <img src={logo} alt="User profile image" />
      </div>
        <ul className="sidebarList">

          <li className="sidebarListItem">
            <HelpOutline className="sidebarIcon" />
            <span className="sidebarListItemText" >About Us</span>
            <Menu.Button style={button} >∨

                </Menu.Button>
<Transition
    as={Fragment}
    enter="transition ease-out duration-100"
    enterFrom="transform opacity-0 scale-95"
    enterTo="transform opacity-100 scale-100"
    leave="transition ease-in duration-75"
    leaveFrom="transform opacity-100 scale-100"
    leaveTo="transform opacity-0 scale-95"
>
    <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <ComplaintModal/>
    </Menu.Items>
</Transition>
          </li>
        </ul>
       
      </div>
    </div>
  );
}
