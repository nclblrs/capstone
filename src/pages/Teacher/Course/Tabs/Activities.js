import React from "react";
import styled from "styled-components";
import { Switch, NavLink, Route, useParams, Link } from "react-router-dom";

const Activities = () => {
  let { id } = useParams();

  return (
    <ActivityContainer>
      <NavBar>
        <NavMenu to={`/class/${id}/activities`} exact>
          Individual Activities
        </NavMenu>
        <NavMenu to={`/class/${id}/activities/group`}>Group Activities</NavMenu>
      </NavBar>
      <Switch>
        <Route path={`/class/:id/activities`} exact>
          <Activity>
            <Content>
              <h1 title="">
                TESTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT
              </h1>
              <Attachment></Attachment>
              <p className="date">Due: December 18, 2021</p>
            </Content>
          </Activity>
        </Route>
        <Route path={`/class/:id/activities/group`}>
          <Activity>
            <Content>
              <h1 title="">TEST</h1>
              <Attachment></Attachment>
              <p className="date">Due: December 18, 2021</p>
            </Content>
          </Activity>
        </Route>
      </Switch>
    </ActivityContainer>
  );
};

const ActivityContainer = styled.div`
  width: 100%;
  padding: 0 2em;
`;

const Activity = styled.div`
  width: 100%;
  border: 1px solid #0f482f;
  border-radius: 10px;
  padding: 10px;
  text-align: left;
  margin: 1em 0;
`;

const Content = styled(Link)`
  width: 100%;
  cursor: pointer;
  text-decoration: none;

  .date {
    margin: 0;
    font-size: 16px;
  }
  > span {
    margin: 0;
    padding: 0;
    font-size: 16px;
  }
  > h1 {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    font-size: 20px;
  }
`;

const NavBar = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  align-items: center;
  padding: 10px;
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  padding: 7px 1em;
  margin: 0 10px;
  border: 1px solid #0f482f;
  &:hover,
  &.active {
    color: white;
    background-color: #0f482f;
    border-radius: 5px;
  }
`;

const Attachment = styled.a`
  color: #0e5937;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
`;

export default Activities;
