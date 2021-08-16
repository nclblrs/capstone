import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.svg";
import home from "./images/home.svg";
import clock from "./images/clock.svg";
import calendar from "./images/calendar.svg";
import progress from "./images/progress.svg";
import user from "./images/user.svg";

const Navbar = () => {
  return (
    <Nav>
      <NavLogo to="">
        <img src={logo} Alt="ChumStudies logo" />
        ChumStudies
      </NavLogo>
      <NavbarContainer>
        <NavMenu to="/" exact>
          <img src={home} Alt="Home" />
          Home
        </NavMenu>
        <NavMenu to="/class-schedule">
          <img src={clock} Alt="Class Schedule" />
          Class Schedule
        </NavMenu>
        <NavMenu to="/calendar">
          <img src={calendar} Alt="Calendar" />
          Calendar
        </NavMenu>
        <NavMenu to="/progress">
          <img src={progress} Alt="Progress" />
          Progress
        </NavMenu>
      </NavbarContainer>
      <Profile to="">Angela Jane</Profile>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #0f2520;
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
  font-family: "Roboto", sans-serif;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  height: 80px;
  z-index: 1;
  margin: 0 10em;
`;

const NavLogo = styled(NavLink)`
  color: white;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 26px;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  margin: 0 2.5em;

  img {
    padding-right: 10px;
    width: 40px;
    filter: brightness(0) invert(1);
  }
`;

const NavMenu = styled(NavLink)`
  color: white;
  margin: 15px;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 26px;
  display: flex;
  align-items: center;
  text-decoration: none;
  gap: 5px;
  padding: 0 1em;

  &.active,
  &:hover {
    background-color: #0f482f;
    color: white;
    border-radius: 5px;
    img {
      filter: brightness(0) invert(1);
    }
  }
  img {
    padding-right: 10px;
    width: 35px;
    filter: brightness(0) invert(1);
  }
  img:hover {
    filter: brightness(0) invert(1);
  }
`;

const Profile = styled(NavLink)`
  margin: 15px;
  cursor: pointer;
  display: flex;
  text-decoration: none;
  padding: 10px;
  font-size: 26px;
  justify-content: flex-end;
  color: white;
  margin-left: auto;
  img {
    width: 25px;
  }
  &:hover {
    background-color: #003249;
    color: white;
    border-radius: 5px;
    img {
      filter: brightness(0) invert(1);
    }
  }
`;

export default Navbar;
