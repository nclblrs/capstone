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
      <NavbarContainer>
        <NavLogo to="">
          <img src={logo} Alt="ChumStudies logo" />
          ChumStudies
        </NavLogo>
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
      <Profile to="">
        <img src={user} Alt="User" />
      </Profile>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #ccdbdc;
  height: 80px;
  display: flex;
  align-items: center;
  font-size: 1rem;
  position: sticky;
  top: 0;
  z-index: 1;
  font-family: "Maven Pro", sans-serif;
  //border-bottom: 1px black solid;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 80px;
  z-index: 1;
  width: 75%;
  max-width: 1100px;
`;

const NavLogo = styled(NavLink)`
  color: #003249;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 28px;
  display: flex;
  align-items: center;
  font-weight: bold;
  text-decoration: none;
  margin-right: 90px;

  img {
    padding-right: 10px;
    width: 40px;
  }
`;

const NavMenu = styled(NavLink)`
  color: #003249;
  margin: 10px 2px;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding-left: 15px;
  padding-right: 15px;

  &.active,
  &:hover {
    background-color: #003249;
    color: white;
    border-radius: 5px;
    img {
      filter: brightness(0) invert(1);
    }
  }
  img {
    padding-right: 10px;
    width: 25px;
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
  margin-left: auto;
  justify-content: flex-end;

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
