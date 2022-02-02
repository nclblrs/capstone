import React from "react";
import styled from "styled-components";
import { NavLink } from "react-router-dom";
import logo from "./images/logo.svg";
import home from "./images/home.svg";
import clock from "./images/clock.svg";
/* import calendar from "./images/calendar.svg"; */
import progress from "./images/progress.svg";
import { smallProfpicUrl } from "utils/upload";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import Dropdown, { DropdownButtons } from "components/Dropdown";

const Navbar = () => {
  const { user, loading } = useCurrentUserContext();
  const isAdmin = user?.isAdmin;
  const teacher = user?.teacher;
  const { firstName, middleName, lastName, profilePicture = null } = user ?? {};
  const { secure_url } = JSON.parse(profilePicture) ?? {};
  return (
    <Nav>
      <NavLogo to="">
        <img src={logo} alt="ChumStudies logo" />
        ChumStudies
      </NavLogo>
      {!isAdmin && !teacher && (
        <NavbarContainer>
          <NavMenu to="/" exact>
            <img src={home} alt="Home" />
            Home
          </NavMenu>
          <NavMenu to="/classes">
            <img src={clock} alt="Classes" />
            Classes
          </NavMenu>
          {/*
          <NavMenu to="/class-schedule">
            <img src={clock} alt="Class Schedule" />
            Class Schedule
          </NavMenu>{" "}
          <NavMenu to="/calendar">
            <img src={calendar} alt="Calendar" />
            Calendar
          </NavMenu> */}
          <NavMenu to="/progress">
            <img src={progress} alt="Progress" />
            Progress
          </NavMenu>
        </NavbarContainer>
      )}
      <Dropdown
        popperComponent={
          <DropdownButtons>
            {!isAdmin && <NavMenu to="/settings">Settings</NavMenu>}
            <NavMenu to="/logout">Logout</NavMenu>
          </DropdownButtons>
        }
      >
        <Profile to="#">
          <img src={smallProfpicUrl(secure_url)} alt="Your profile pic" />
          {loading
            ? "Loading..."
            : middleName
            ? `${firstName} ${middleName} ${lastName}`
            : `${firstName} ${lastName}`}
        </Profile>
      </Dropdown>
    </Nav>
  );
};

const Nav = styled.nav`
  background-color: #0f2520;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  z-index: 2;
  position: sticky;
  top: 0;
  padding: 0 3em;
`;

const NavbarContainer = styled.div`
  display: flex;
  justify-content: center;
  height: 100%;
`;

const NavLogo = styled(NavLink)`
  color: white;
  justify-content: flex-start;
  cursor: pointer;
  font-size: 26px;
  display: flex;
  align-items: center;
  text-decoration: none;
  margin: 0 1em;

  img {
    padding-right: 10px;
    width: 40px;
    filter: brightness(0) invert(1);
  }
`;

const NavMenu = styled(NavLink)`
  color: white;
  margin: 0 1em;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-decoration: none;
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
  font-size: 16px;
  justify-content: flex-end;
  color: white;
  align-items: center;
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    object-fit: cover;
  }
  &:hover {
    background-color: #0f482f;
    color: white;
    border-radius: 5px;
    img {
      filter: brightness(1);
    }
  }
`;

export default Navbar;
