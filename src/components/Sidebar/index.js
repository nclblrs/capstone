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
        <NavMenu to="/" exact>
          <FaSchool size={20} /> Home
        </NavMenu>
        <NavMenu to="/classes">
          <SiGoogleclassroom size={20} />
          Classes
        </NavMenu>
        <NavMenu to="/class-schedule">
          <FiClock size={20} />
          Class Schedule
        </NavMenu>
        <NavMenu to="/calendar">
          <BiCalendar size={20} />
          Calendar
        </NavMenu>
        <NavMenu to="/progress">
          <AiFillPieChart size={20} />
          Progress
        </NavMenu>
      </SidebarContainer>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #0f482f;
  height: auto;
  display: flex;
  align-items: center;
  width: 240px;
  position: fixed;
  overflow-x: hidden;
  top: 0;
  left: 0;
  height: 100%;
  justify-content: center;
  z-index: 1;
`;

const SidebarContainer = styled.div`
  display: block;
`;

const NavMenu = styled(NavLink)`
  display: flex;
  flex-direction: column;
  color: white;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  font-size: 20px;
  margin-top: 2em;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 25px 2.5em;
  &:hover,
  &.active {
    background-color: #1b6344;
    color: white;
    border-radius: 5px;
  }
`;

export default Sidebar;
