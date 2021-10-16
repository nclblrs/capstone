import React from "react";
import styled from "styled-components";
import { NavLink, Switch, Route } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import Modal from "components/Modal";
import EditProfileForm from "./EditProfileForm";

const TSettings = () => {
  const { user, loading } = useCurrentUserContext();
  const { firstName, middleName, lastName, schoolIdNumber, student, emails } =
    user ?? {};
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  return (
    <SettingsContainer>
      <AllContainer>
        <NavMenu to="/settings">
          <li>Personal Information</li>
        </NavMenu>
        <NavMenu to="/settings/change-password">
          <li>Change Password</li>
        </NavMenu>
      </AllContainer>
      <RSideContainer>
        <Switch>
          <Route path="/settings" exact>
            <RSideBar>
              <ProfileTop>
                <img
                  className="profilepic"
                  src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
                  alt="Your profile pic"
                />
                <ul>
                  <li className="name">
                    {loading
                      ? "Loading..."
                      : [firstName, middleName, lastName]
                          .filter((n) => n)
                          .join(" ")}
                  </li>
                  <li className="idnum">{schoolIdNumber}</li>
                  <li className="role">{student ? "Student" : "Teacher"}</li>
                </ul>
                <button
                  className="editprofile"
                  onClick={() => setShowEditProfileModal(true)}
                >
                  Edit Profile &nbsp;
                  <BsPencilSquare size={30} className="editicon" />
                </button>
              </ProfileTop>
              <ProfileBottom>
                <hr></hr>
                <div className="row">
                  <div className="nameInput">
                    <label for="FN">First Name</label>
                    <input
                      type="text"
                      id="FN"
                      disabled
                      placeholder={firstName}
                    />
                  </div>
                  <div className="nameInput">
                    <label for="MN">Middle Name</label>
                    <input
                      type="text"
                      id="MN"
                      disabled
                      placeholder={middleName ?? ""}
                    />
                  </div>
                  <div className="nameInput">
                    <label for="LN">Last Name</label>
                    <input
                      type="text"
                      id="LN"
                      disabled
                      placeholder={lastName}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="snInput">
                    <label for="SN">Student Number</label>
                    <input
                      type="text"
                      id="SN"
                      disabled
                      placeholder={schoolIdNumber}
                    />
                  </div>
                  <div className="emailInput">
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
              <PasswordContainer>
                <div className="pwHeader">
                  <h3>Change Password</h3>
                  <hr></hr>
                </div>
                <div className="pwBottom">
                  <div className="pwInputs">
                    <label for="CurP">Current Password</label>
                    <input type="text" id="CurP" />
                    <label for="NP">New Password</label>
                    <input type="text" id="NP" />
                    <label for="ConP">Confirm Password</label>
                    <input type="text" id="ConP" />
                    <button class="save">Save Changes</button>
                  </div>
                </div>
              </PasswordContainer>
            </RSideBar>
          </Route>
        </Switch>
      </RSideContainer>
      <Modal
        show={showEditProfileModal}
        closeModal={() => setShowEditProfileModal(false)}
        title="Edit Profile"
      >
        <EditProfileForm />
      </Modal>
    </SettingsContainer>
  );
};

const SettingsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

const RSideContainer = styled.div`
  margin-top: 7em;
  display: flex;
  width: 76%;
  min-width: 700px;
  margin-left: auto;
  margin-right: 57px;
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

    &:hover {
      background-color: #157348;
      color: white;
    }
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

const PasswordContainer = styled.div`
  h3 {
    color: #646464;
    font-size: 24px;
    font-weight: normal;
    padding: 10px;
    margin: 1em;
  }
  input {
    height: 45px;
    border: solid #0e5937 2px;
    border-radius: 3px;
    background-color: #e5e5e5;
    width: 60%;
    font-size: 18px;
  }
  label {
    display: block;
    margin-bottom: 10px;
    color: #646464;
    margin-top: 20px;
    font-size: 17px;
  }
  .pwInputs {
    padding: 2em 4em;
    width: 100%;
    color: #646464;
  }
  .save {
    position: absolute;
    right: 90px;
    margin-top: 90px;
    padding: 1em;
    font-size: 16px;
    background-color: #0e5937;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: #157348;
      color: white;
    }
  }
`;

const AllContainer = styled.nav`
  display: flex;
  position: fixed;
  gap: 50px;
  margin-right: auto;
  margin-left: 404px;
  margin-top: 30px;
`;

const NavMenu = styled(NavLink)`
  text-decoration: none;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  font-size: 18px;
  color: #646464;
  cursor: pointer;
  padding: 10px;
  font-weight: bold;
  padding-bottom: 0;
  font-weight: normal;

  li {
    list-style-type: none;
    border-bottom: 4px solid #0e5937;
    height: 35px;
    margin-top: 0;
  }

  &:hover,
  &.active {
    color: white;
    background-color: #0e5937;
    border-radius: 10px;
  }
`;

export default TSettings;
