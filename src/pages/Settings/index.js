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
                <hr></hr>
                <div class="row">
                  <div class="nameInput">
                    <label for="FN">First Name</label>
                    <input type="text" id="FN" disabled />
                  </div>
                  <div class="nameInput">
                    <label for="MN">Middle Name</label>
                    <input type="text" id="MN" disabled />
                  </div>
                  <div class="nameInput">
                    <label for="LN">Last Name</label>
                    <input type="text" id="LN" disabled />
                  </div>
                </div>
                <div class="row">
                  <div class="snInput">
                    <label for="SN">Student Number</label>
                    <input type="text" id="SN" disabled />
                  </div>
                  <div class="emailInput">
                    <label for="Email">Email</label>
                    <input type="text" id="Email" disabled />
                  </div>
                </div>
              </div>
            </RSideBar>
          </Route>
          <Route path="/settings/change-password">
            <RSideBar>
              <div class="pwHeader">
                <p class="pwText">Change Password</p>
                <hr></hr>
              </div>
              <div class="pwBottom">
                <div class="pwInputs">
                  <label for="CurP">Change Password</label>
                  <input type="text" id="CurP" disabled />
                  <label for="NP">New Password</label>
                  <input type="text" id="NP" disabled />
                  <label for="ConP">Confirm Password</label>
                  <input type="text" id="ConP" disabled />
                </div>
              </div>
            </RSideBar>
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
  margin: 1em;
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
    background-color: #dfdfdf;
    color: #0e5937;
  }
`;

const RSideContainer = styled.div`
  margin: 1em;
  display: flex;
  width: 75%;
`;

const RSideBar = styled.div`
  display: flex;
  width: 100%;
  background-color: #f2f2f2;
  height: 550px;
  border-radius: 10px;
  flex-direction: column;
  hr {
    color: #0e5937;
    background-color: #0e5937;
    height: 1px;
    border: none;
  }
  .profiletop {
    height: 25%;
    font-size: 24px;
    padding: 2em;
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
    padding: 5em 2em;
    height: 75%;
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
  .idnum {
    font-size: 22px;
  }
  .role {
    color: #646464;
    font-size: 22px;
    padding: 0;
  }
  button {
    position: absolute;
    right: 130px;
    top: 170px;
    padding: 1em;
    font-size: 16px;
    background-color: #0e5937;
    color: white;
    border: none;
  }

  .row {
    width: 100%;
    color: #646464;
    display: flex;
    gap: 10px;
    padding: 2em 1em;
    input {
      height: 40px;
      border: solid #0e5937 1px;
      border-radius: 3px;
      width: 100%;
    }
    label {
      display: block;
    }
    .nameInput {
      width: 33.3%;
    }
    .snInput {
      width: 40%;
    }
    .emailInput {
      width: 60%;
    }
  }
  .pwHeader {
    height: 10%;
    .pwText {
      padding: 1em;
      font-size: 22px;
      color: #646464;
    }
    > hr {
      color: #646464;
      background-color: #646464;
    }
  }
  .pwBottom {
    padding: 5em 2em;
    height: 75%;
    .pwInputs {
      width: 100%;
      color: #646464;
      input {
        height: 40px;
        border: solid #0e5937 1px;
        border-radius: 3px;
        width: 60%;
        margin-bottom: 30px;
      }
      label {
        display: block;
      }
    }
  }
`;

export default Settings;
