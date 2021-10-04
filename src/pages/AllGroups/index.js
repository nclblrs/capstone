import React from "react";
import styled from "styled-components";
import { NavLink, Switch, Route, Link } from "react-router-dom";
import { GET_CLASSGROUPS, GET_STUDYGROUPS } from "./gql";
import { useQuery } from "@apollo/client";

const AllGroups = () => {
  const { loading: ClassGroupLoading, data: ClassGroupData } =
    useQuery(GET_CLASSGROUPS);
  const { loading: StudyGroupLoading, data: StudyGroupData } =
    useQuery(GET_STUDYGROUPS);

  return (
    <PageContainer>
      <MainContainer>
        <div className="buttoncontainer">
          <nav className="Nav">
            <NavLink to="/groups/classgroups" className="NavMenu">
              Class Groups
            </NavLink>
            <NavLink to="/groups/studygroups" className="NavMenu">
              Study Groups
            </NavLink>
          </nav>
        </div>

        <Switch>
          <Route path="/groups/classgroups">
            <div className="itemcontainer">
              {ClassGroupLoading
                ? "Loading..."
                : ClassGroupData?.studentClassGroups?.data?.map(
                    ({ id, name, leader, studentCount }) => (
                      <Link className="items" key={id} to={`/group/${id}`}>
                        <h1>{name}</h1>
                        <p>
                          Leader: {leader?.user?.lastName},{" "}
                          {leader?.user?.firstName}
                        </p>
                        <p>{studentCount} members</p>
                      </Link>
                    )
                  )}
            </div>
          </Route>
          <Route path="/groups/studygroups">
            <div className="itemcontainer">
              {StudyGroupLoading
                ? "Loading..."
                : StudyGroupData?.studentStudyGroups?.data?.map(
                    ({ id, name, admins, studentCount }) => (
                      <Link className="items" key={id} to={`/group/${id}`}>
                        <h1>{name}</h1>
                        <p>
                          Admins:
                          {admins?.data?.map(({ user }) => (
                            <>
                              {" "}
                              {user.lastName}, {user?.firstName}
                            </>
                          ))}
                        </p>
                        <p> {studentCount} members</p>
                      </Link>
                    )
                  )}
            </div>
          </Route>
        </Switch>
      </MainContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  border-radius: 10px;
  height: 600px;
  padding: 1em;

  .buttoncontainer {
    display: flex;
    width: 100%;

    .Nav {
      height: 80px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .NavMenu {
      border: solid #0f482f 1px;
      border-radius: 10px;
      padding: 10px;
      text-decoration: none;
      color: #0f482f;

      :hover,
      &.active {
        background-color: #f2f2f2;
      }
    }
    > p {
      font-size: 20px;
    }
  }

  .itemcontainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    margin: 2em;
    li {
      padding: 10px 8px;
    }
  }
  .items {
    border-radius: 1em;
    flex-direction: column;
    display: flex;
    padding: 2em;
    width: 24%;
    background-color: #f2f2f2;
    height: 250px;
    margin-bottom: 20px;
    text-decoration: none;

    :hover {
      background-color: #e8e8e8;
    }
    > p {
      color: #646464;
      font-size: 20px;
      margin: 10px 0;
    }

    h1 {
      font-weight: bold;
      color: #0f482f;
      font-size: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
    }
  }
`;

export default AllGroups;
