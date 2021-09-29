import React from "react";
import { GET_GROUP } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { NavLink, Switch, Route } from "react-router-dom";

const StudyGroup = () => {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_GROUP, {
    variables: { groupId: id },
  });
  const { name, groupCode, admins, students } = data?.group ?? {};

  return (
    <SGContainer>
      <SGPostsContainer>
        <SGPostHeader>
          <SGPost>
            <form>
              <textarea
                placeholder=" 
            
              Write Something"
              ></textarea>
              <span>Tags</span> <input type="text"></input>
              <select>
                <option value="Category" selected disabled>
                  Category
                </option>
                <option value="TEST 1">TEST 1</option>
                <option value="TEST 2">TEST 2</option>
                <option value="TEST 3">TEST 3</option>
              </select>
              <button class="attach">
                Attach File
                <img class="attachicon" alt="" />
              </button>
              <button class="postbutton">Post</button>
            </form>
          </SGPost>
          <SGFilter>
            <Nav>
              <NavMenu to={`/group/${id}`} exact>
                Posts
              </NavMenu>
              <NavMenu to={`/group/${id}/files`}>Files</NavMenu>
              <NavMenu to={`/group/${id}/forums`}>Forums</NavMenu>
              <NavMenu to={`/group/${id}/members`}>Members</NavMenu>
            </Nav>
          </SGFilter>
        </SGPostHeader>
        <SGItemsContainer>
          <Switch>
            <Route path={`/group/${id}`} exact>
              <SGPostItems></SGPostItems>
              <SGPostItems></SGPostItems>
              <SGPostItems></SGPostItems>
              <SGPostItems></SGPostItems>
              <SGPostItems></SGPostItems>
            </Route>
            <Route path={`/group/${id}/files`}>
              <LeftContainer>
                <div class="leftHeader">
                  <h1>Files</h1>
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/group/${id}/forums`}>
              <LeftContainer>
                <div class="leftHeader">
                  <h1>Forums</h1>
                </div>
              </LeftContainer>
            </Route>
            <Route path={`/group/${id}/members`}>
              <LeftContainer>
                <div class="leftHeader">
                  <h1>Members</h1>
                </div>
                <div class="leftContent">
                  {loading
                    ? "Loading..."
                    : students?.data?.map(({ user }) => (
                        <>
                          <h5>
                            <li>
                              {user.lastName}, {user.firstName}{" "}
                              {user.middleName}
                            </li>
                          </h5>
                        </>
                      ))}
                </div>
              </LeftContainer>
            </Route>
          </Switch>
        </SGItemsContainer>
      </SGPostsContainer>
      <RSideContainer>
        <RSideAbout>
          {loading
            ? "Loading..."
            : admins?.data?.map(({ user }) => (
                <>
                  <h4>ABOUT</h4>
                  <h5>{name}</h5>
                  <h5>
                    Group Code: <p>&nbsp;{groupCode}</p>
                  </h5>
                  <h5>
                    Admins: {user.firstName} {user.lastName}
                  </h5>
                </>
              ))}
        </RSideAbout>
        <RSideToDo>
          <h4>QUESTIONS</h4>
        </RSideToDo>
      </RSideContainer>
    </SGContainer>
  );
};

const SGContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
`;

const SGPostsContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  button,
  select {
    width: 150px;
    height: 33px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;

    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
      border: solid #0f482f 1px;
    }
  }
  span {
    margin: 0;
    color: #0f482f;
    white-space: nowrap;
    overflow: hidden;
    font-size: 18px;
  }
  input {
    height: 33px;
    margin: 10px;
    width: 30%;
  }
`;

const SGPost = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 255px;
  border-radius: 10px;
  padding: 1em 2em;
  select,
  .attach {
    margin: 20px auto;
    margin-right: 10px;
  }

  .postbutton {
    display: flex;
    margin: 0;
    margin-left: auto;
    background-color: #0f482f;
  }

  textarea {
    width: 100%;
    height: 90px;
    resize: none;
    font-size: 18px;
    border: solid #0e5937 1px;
    border-radius: 5px;
    ::placeholder {
      color: #0f482f;
      align-items: center;
    }
  }

  .attachicon {
    padding-left: 10px;
    width: 24px;
    filter: brightness(0) invert(1);
    text-align: center;
    &:hover {
      filter: brightness(0) invert(1);
    }
  }
`;

const SGFilter = styled.div`
  display: flex;
  position: sticky;
  top: 400px;
  height: 50px;
  width: 100%;
  align-items: center;
  margin: 10px 0px auto;
  border-bottom: solid #0f482f 3px;

  button {
    background-color: white;
    color: #0f482f;
    &:hover {
      background-color: #0e5937;
    }
  }
`;

const SGPostItems = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  height: 300px;
  margin: 2em 0;
  width: 100%;
`;

const RSideContainer = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  border-radius: 10px;
  position: sticky;
  margin: 0 2em;
  h4 {
    margin: 0;
    color: #646464;
    font-size: 20px;
    font-weight: normal;
  }
  p {
    margin: 0;
    color: #646464;
  }
  h5 {
    margin: 0;
    color: #0f482f;
    text-align: left;
    font-size: 18px;
    font-weight: normal;
    display: flex;
  }
  h6 {
    margin: 0;
    font-size: 18px;
    color: #646464;
    font-weight: normal;
    text-align: left;
  }
`;

const RSideAbout = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 100%;
  flex-direction: column;
  justify-content: space-between;
  background-color: #f2f2f2;
  height: 255px;
  border-radius: 10px;
  padding: 2em;
`;

const RSideToDo = styled.div`
  position: sticky;
  top: 400px;
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2em;
`;

const SGItemsContainer = styled.div`
  width: 100%;
`;

const Nav = styled.nav`
  height: 50px;
  display: flex;

  font-size: 12px;
  z-index: 1;
  position: sticky;
  top: 0;
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 18px;
  display: flex;
  text-decoration: none;
  padding: 1em 2em;
  &:hover {
    background-color: #0f482f;
    color: white;
  }
`;

const SGPostHeader = styled.div`
  position: sticky;
  top: 80px;
  padding-top: 10px;
  width: 100%;
  background: white;
`;

const LeftContainer = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  margin: 2em 0;
  width: 100%;
  padding: 2em;
  flex-direction: column;
  .leftHeader {
    height: 20%;
    h1 {
      color: #0f482f;
    }
  }
  h5 {
    font-weight: normal;
    color: #0f482f;
    font-size: 20px;
  }
  li {
    margin: 0 2em;
  }
`;

export default StudyGroup;
