import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import { FaSchool } from "react-icons/fa";
import { SiGoogleclassroom } from "react-icons/si";
import { FiClock } from "react-icons/fi";
import { BiCalendar } from "react-icons/bi";
import { AiFillPieChart } from "react-icons/ai";

const Sidebar = () => {
  return (
    <Nav>
      <SidebarContainer>
        <ul>
          <NavMenu to="/" exact>
            <FaSchool size={20} /> <p> Home </p>
          </NavMenu>
          <NavMenu to="/classes">
            <SiGoogleclassroom size={20} /> <p>Classes </p>
          </NavMenu>
          <NavMenu to="/class-schedule">
            <FiClock size={20} />
            <p> Class Schedule </p>
          </NavMenu>
          <NavMenu to="/calendar">
            <BiCalendar size={20} />
            <p> Calendar </p>
          </NavMenu>
          <NavMenu to="/progress">
            <AiFillPieChart size={20} />
            <p> Progress </p>
          </NavMenu>
        </ul>
      </SidebarContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #0f482f;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  z-index: 2;
  top: 80px;
  text-align: center;
  position: fixed;
  padding: 0 3em;
  width: 18%;
`;

const SidebarContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  height: 100%;
  padding-bottom: 35em;
  width: 90%;
`;

const NavMenu = styled(NavLink)`
  flex-direction: column;
  color: white;
  margin: 0 1em;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  font-size: 23px;
  margin-top: 2.2em;
  display: flex;
  align-items: center;
  text-decoration: none;
`;

export default Sidebar;
