import React from "react";
import styled from "styled-components";
import dayjs from "dayjs";
import { Switch, NavLink, Route, useParams, Link } from "react-router-dom";
import { GET_ACTIVITIES, GET_GROUP_ACTIVITIES } from "../gql";
import { useQuery } from "@apollo/client";
import { useLocation } from "react-router";

const Activities = () => {
  const location = useLocation();
  const removeLast = (path) => path.substring(0, path.lastIndexOf("/"));
  const { id } = useParams();

  const { loading: activityLoading, data: activityData } = useQuery(
    GET_ACTIVITIES,
    {
      variables: { courseId: id },
    }
  );

  const { loading: groupActivityLoading, data: groupActivityData } = useQuery(
    GET_GROUP_ACTIVITIES,
    {
      variables: { courseId: id },
    }
  );

  const activityInfo = activityData?.courseActivities.data ?? [];
  const groupActivityInfo = groupActivityData?.courseGroupActivities.data ?? [];

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
          {activityLoading
            ? "Loading..."
            : activityInfo.map(({ id, title, dueAt, createdAt }) => {
                return (
                  <>
                    <Activity key={id}>
                      <Content>
                        <h1>{title}</h1>
                        <h4>
                          {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                        </h4>
                        <h3> Due: {dayjs(dueAt).format("MMMM D, YYYY")} </h3>
                      </Content>
                      <ViewLink
                        to={`${removeLast(location.pathname)}/activity/${id}`}
                      >
                        View
                      </ViewLink>
                    </Activity>
                  </>
                );
              })}
        </Route>
        <Route path={`/class/:id/activities/group`}>
          {groupActivityLoading
            ? "Loading..."
            : groupActivityInfo.map(({ id, title, dueAt, createdAt }) => {
                return (
                  <>
                    <Activity key={id}>
                      <Content>
                        <h1>{title} </h1>
                        <h4>
                          {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                        </h4>
                        <h3> Due: {dayjs(dueAt).format("MMMM D, YYYY")} </h3>
                      </Content>
                    </Activity>
                  </>
                );
              })}
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
  border-left: 5px solid #0f482f;
  height: 110px;
  padding: 0 20px;
  text-align: left;
  margin: 1em 1.4em;
  display: flex;
`;

const ViewLink = styled(Link)`
  text-decoration: none;
  margin-left: auto;
  font-size: 16px;
  width: 130px;
  height: 40px;
  border: none;
  color: white;
  background-color: #0f482f;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #0e5937;
  }
`;

const Content = styled.div`
  width: 100%;
  text-decoration: none;
  margin-top: 7px;

  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    padding: 0;
    font-size: 20px;
    color: #0f482f;
  }
  h4 {
    font-weight: normal;
    margin-top: 5px;
    color: #646464;
  }
  h3 {
    font-weight: normal;
    margin-top: 0;
    color: #0f482f;
    font-size: 18px;
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

export default Activities;
