import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <Nav>
      <SidebarContainer>
        <ul>
          <NavMenu to="/" exact>
            Home
          </NavMenu>
          <NavMenu to="/classes">Classes</NavMenu>
          <NavMenu to="/class-schedule">Class Schedule</NavMenu>
          <NavMenu to="/calendar">Calendar</NavMenu>
          <NavMenu to="/progress">Progress</NavMenu>
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
  left: 0;
  margin-right: auto;
  position: fixed;
  padding: 0 3em;
  width: 350px;
`;

const SidebarContainer = styled.div`
  position: sticky;
  display: flex;
  justify-content: center;
  margin-top: 50px;
  height: 100%;
  padding-bottom: 35em;
`;

const NavMenu = styled(NavLink)`
  display: flex;
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
