import React from "react";
import styled from "styled-components";
import { NavLink, Switch, Route } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { BsPencilSquare } from "react-icons/bs";

const Settings = () => {
  const { user, loading } = useCurrentUserContext();
  const { firstName, middleName, lastName, schoolIdNumber, student, emails } =
    user ?? {};
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
              <ProfileTop>
                <img
                  class="profilepic"
                  src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Your profile pic"
                />
                <ul>
                  <li class="name">
                    {loading
                      ? "Loading..."
                      : [firstName, middleName, lastName]
                          .filter((n) => n)
                          .join(" ")}
                  </li>
                  <li class="idnum">{schoolIdNumber}</li>
                  <li class="role">{student ? "Student" : "Teacher"}</li>
                </ul>
                <button class="editprofile">
                  Edit Profile &nbsp;
                  <BsPencilSquare size={30} class="editicon" />
                </button>
              </ProfileTop>
              <ProfileBottom>
                <hr></hr>
                <div class="row">
                  <div class="nameInput">
                    <label for="FN">First Name</label>
                    <input
                      type="text"
                      id="FN"
                      disabled
                      placeholder={firstName}
                    />
                  </div>
                  <div class="nameInput">
                    <label for="MN">Middle Name</label>
                    <input
                      type="text"
                      id="MN"
                      disabled
                      placeholder={middleName ?? ""}
                    />
                  </div>
                  <div class="nameInput">
                    <label for="LN">Last Name</label>
                    <input
                      type="text"
                      id="LN"
                      disabled
                      placeholder={lastName}
                    />
                  </div>
                </div>
                <div class="row">
                  <div class="snInput">
                    <label for="SN">Student Number</label>
                    <input
                      type="text"
                      id="SN"
                      disabled
                      placeholder={schoolIdNumber}
                    />
                  </div>
                  <div class="emailInput">
                    <label for="Email">Email</label>
                    <input
                      type="text"
                      id="Email"
                      disabled
                      placeholder={emails?.[0].address}
                    />
                  </div>
                </div>
              </ProfileBottom>
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
                  <label for="CurP">Current Password</label>
                  <input type="text" id="CurP" />
                  <label for="NP">New Password</label>
                  <input type="text" id="NP" />
                  <label for="ConP">Confirm Password</label>
                  <input type="text" id="ConP" />
                </div>
                <button class="save">Save Changes</button>
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
  flex-direction: row;
  margin: 0 50px;
`;

const LSideContainer = styled.div`
  margin-top: 20px;
  width: 30%;
  min-width: 300px;
  margin-right: 50px;
`;

const Nav = styled.nav`
  display: flex;
  top: 100px;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 30%;
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
  font-weight: normal;
  padding: 1em 0;
  &.active,
  &:hover {
    background-color: #0e5937;
    color: white;
  }
`;

const RSideContainer = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  min-width: 880px;
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
    height: 2px;
    border: none;
  }
  p {
    color: #0f482f;
    font-size: 18px;
    padding: 10px;
    margin: 0;
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
        border: solid #0e5937 2px;
        border-radius: 3px;
        width: 60%;
        margin-bottom: 30px;
      }
      label {
        display: block;
      }
    }
    .save {
      position: absolute;
      right: 100px;
      bottom: 200px;
      padding: 1em;
      font-size: 16px;
      background-color: #0e5937;
      color: white;
      border: none;
      cursor: pointer;
    }
  }
`;
const ProfileTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  .profilepic {
    border-top-left-radius: 50% 50%;
    border-top-right-radius: 50% 50%;
    border-bottom-right-radius: 50% 50%;
    border-bottom-left-radius: 50% 50%;
    width: 120px;
    height: 120px;
    border: solid #0f482f 2px;
    margin-left: 50px;
    margin-top: 50px;
    margin-bottom: 3px;
  }
  ul {
    list-style-type: none;
    margin-top: 55px;
  }
  .name {
    font-size: 28px;
    color: #0f482f;
  }
  .idnum {
    color: #0f482f;
  }
  .role {
    color: #646464;
  }
  .idnum,
  .role {
    font-size: 25px;
    margin-top: 8px;
  }
  .editprofile {
    display: flex;
    width: 150px;
    height: 50px;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    position: absolute;
    right: 81px;
    margin-left: auto;
    margin-top: 88px;
    cursor: pointer;
  }
  .editicon {
    padding-left: 15px;
  }
`;

const ProfileBottom = styled.div`
  hr {
    margin: 2em;
  }
  .row {
    width: 100%;
    color: #646464;
    display: flex;
    gap: 25px;
    padding: 10px 90px;
    input {
      height: 45px;
      border: solid #0e5937 2px;
      border-radius: 3px;
      width: 100%;
      background-color: #e5e5e5;
      text-align: center;
      ::placeholder {
        font-size: 20px;
      }
    }
    label {
      display: block;
      margin-bottom: 10px;
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
`;

export default Settings;
