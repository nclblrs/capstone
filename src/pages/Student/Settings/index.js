import React from "react";
import styled from "styled-components";
import { NavLink, Switch, Route } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { BsPencilSquare } from "react-icons/bs";
import { useState } from "react";
import Modal from "components/Modal";
import EditProfileForm from "./EditProfileForm";
import EditProfilePicForm from "./EditProfilePicForm";
import { smallProfpicUrl } from "utils/upload";

const Settings = () => {
  const { user, loading } = useCurrentUserContext();
  const {
    firstName,
    middleName,
    lastName,
    yearLevel,
    schoolIdNumber,
    student,
    emails,
    profilePicture = null,
  } = user ?? {};
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showEditProfilePicModal, setShowEditProfilePicModal] = useState(false);
  const { secure_url } = JSON.parse(profilePicture) ?? {};
  return (
    <SettingsContainer>
      <LSideContainer>
        <Nav>
          <NavMenu to="/settings" exact>
            Personal Information
          </NavMenu>
          {/* <NavMenu to="/settings/change-password">Password</NavMenu> */}
        </Nav>
      </LSideContainer>
      <RSideContainer>
        <Switch>
          <Route path="/settings" exact>
            <RSideBar>
              <ProfileTop>
                <img
                  className="profilepic"
                  src={smallProfpicUrl(secure_url)}
                  alt="Your profile pic"
                />
                <button
                  className="editpic"
                  onClick={() => setShowEditProfilePicModal(true)}
                >
                  <BsPencilSquare size={18} />
                </button>
                <ul>
                  <li className="name">
                    {loading
                      ? "Loading..."
                      : [firstName, middleName, lastName]
                          .filter((n) => n)
                          .join(" ")}
                  </li>
                  <li className="idnum">{schoolIdNumber}</li>
                  <li className="role">
                    {yearLevel} year &thinsp;
                    {student ? "Student" : "Teacher"}
                  </li>
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
                    <button className="save">Save Changes</button>
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
      <Modal
        show={showEditProfilePicModal}
        closeModal={() => setShowEditProfilePicModal(false)}
        title="Edit Profile Picture"
      >
        <EditProfilePicForm />
      </Modal>
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
  &:hover,
  &.active {
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
`;

const ProfileTop = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  .profilepic {
    border-radius: 50%;
    width: 120px;
    height: 120px;
    border: solid #0f482f 2px;
    margin-left: 50px;
    margin-top: 50px;
    margin-bottom: 3px;
    object-fit: cover;
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
    font-size: 25px;
  }
  .role {
    color: #646464;
    font-size: 22px;
  }
  .idnum,
  .role {
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
  .editpic {
    width: 35px;
    height: 35px;
    background-color: #0e5937;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 50%;
    position: absolute;
    margin: 3em 11em;

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

export default Settings;
