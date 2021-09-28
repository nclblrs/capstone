import React from "react";
import styled from "styled-components";
import { NavLink, Switch, Route } from "react-router-dom";

const Settings = () => {
  return (
    <SettingsContainer>
      <LSideContainer>
        <Nav>
          <NavMenu to="/settings" exact>
            Personal Information
          </NavMenu>
          <NavMenu to="/settings/change-password">Password</NavMenu>
        </Nav>
      </LSideContainer>
      <RSideContainer>
        <Switch>
          <Route path="/settings" exact>
            <RSideBar>
              <div class="profiletop">
                <div>
                  <img
                    class="profilepic"
                    src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                    alt="Your profile pic"
                  />
                  <p class="name">Angela Jane</p>
                  <p class="idnum">2018-08054-MN-0</p>
                  <p class="role">Student</p>
                </div>
                <button>Edit Profile</button>
              </div>
              <div class="profilebottom">
                <div>
                  <div class="firstrowlabels">
                    <label for="FN">First Name</label>
                    <label for="MN">Middle Name</label>
                    <label for="LN">Last Name</label>
                  </div>
                  <div class="firstrow">
                    <input type="text" id="FN" />
                    <input type="text" id="MN" />
                    <input type="text" id="LN" />
                  </div>
                </div>
              </div>
            </RSideBar>
          </Route>
          <Route path="/settings/change-password">
            <RSideBar>THIS IS CHANGE PASSWORD</RSideBar>
          </Route>
        </Switch>
      </RSideContainer>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  display: flex;
  margin: 0 50px;
`;

const LSideContainer = styled.div`
  margin: 2em;
  display: flex;
  flex-direction: column;
  width: 25%;
`;

const Nav = styled.nav`
  display: flex;
  top: 100px;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 150px;
  border-radius: 10px;
  justify-content: center;
  font-size: 18px;
  border: none;
`;

const NavMenu = styled(NavLink)`
  color: #0e5937;
  justify-content: center;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 1em 0;
  &.active,
  &:hover {
    background-color: #0f482f;
    color: white;
  }
`;

const RSideContainer = styled.div`
  margin: 2em;
  display: flex;
  width: 75%;
`;

const RSideBar = styled.div`
  display: flex;
  width: 100%;
  background-color: #f2f2f2;
  height: 650px;
  border-radius: 10px;
  padding: 3em;
  flex-direction: column;
  .profiletop {
    width: 100%;
    height: 35%;
    font-size: 24px;
  }
  .profilepic {
    border-top-left-radius: 50% 50%;
    border-top-right-radius: 50% 50%;
    border-bottom-right-radius: 50% 50%;
    border-bottom-left-radius: 50% 50%;
    width: 130px;
    height: 130px;
    object-fit: cover;
    border: solid #0f482f 2px;
    float: left;
    margin-right: 1em;
  }

  .profilebottom {
    padding: 3em;
    width: 100%;
    height: 35%;
    border-top: solid #0e5937 1px;
  }
  p {
    color: #0f482f;
    font-size: 18px;
    padding: 10px;
    margin: 0;
  }
  .name {
    font-size: 24px;
  }
  .role {
    color: #0f482f;
    font-size: 18px;
    padding: 0;
  }
  button {
    position: absolute;
    right: 130px;
    top: 180px;
    height: 50px;
    font-size: 16px;
    background-color: #0e5937;
    color: white;
    border: none;
  }
  .firstrow {
    display: flex;
    justify-content: space-between;
    input {
      height: 40px;
    }
  }
`;

export default Settings;
