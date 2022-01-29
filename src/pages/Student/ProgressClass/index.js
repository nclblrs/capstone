import React from "react";
import styled, { css } from "styled-components";
import dayjs from "dayjs";
import {
  Switch,
  NavLink,
  Route,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { GET_ACTIVITIES, GET_GROUP_ACTIVITIES, GET_COURSE } from "./gql";
import { useQuery } from "@apollo/client";
import { FaLaptop } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { useUrlQuery } from "hooks/useUrlQuery";
import { useLocation } from "react-router-dom";

const ProgressClass = () => {
  const { classId } = useParams();
  const { filter } = useUrlQuery();
  const { pathname } = useLocation();
  const groupPathMatch = useRouteMatch(
    "/progress/class/:classId/activities/group"
  );
  const { loading: activityLoading, data: activityData } = useQuery(
    GET_ACTIVITIES,
    {
      variables: { courseId: classId },
    }
  );
  const { loading, data } = useQuery(GET_COURSE, {
    variables: { courseId: classId },
  });

  const { loading: groupActivityLoading, data: groupActivityData } = useQuery(
    GET_GROUP_ACTIVITIES,
    {
      variables: { courseId: classId },
    }
  );

  const { name, subjCode, teacher, yearAndSection } = data?.course ?? {};

  const { firstName, lastName } = teacher?.user ?? {};

  const activityInfo = activityData?.courseActivities?.data ?? [];
  const groupActivityInfo =
    groupActivityData?.courseGroupActivities?.data ?? [];

  const activities = groupPathMatch ? groupActivityInfo : activityInfo;
  const doneActivities = activities.filter(
    ({ mySubmission }) => mySubmission?.id != null
  );
  const missingActivities = activities.filter(
    ({ mySubmission }) => mySubmission?.id == null
  );

  return (
    <Container>
      <LSideContainer>
        <NavBar>
          <NavMenu to={`/progress/class/${classId}/activities`} exact>
            Individual Activities
          </NavMenu>
          <NavMenu to={`/progress/class/${classId}/activities/group`}>
            Group Activities
          </NavMenu>
        </NavBar>
        <UpperContainer>
          <div className="alltask">
            <h4>All</h4>
            <Link className="alltaskButton">
              <div className="alltaskCircle">{activities.length}</div>
            </Link>
          </div>
          <div className="missing">
            <h4>Missing</h4>
            <Link className="missingButton" to={`${pathname}?filter=missing`}>
              <div className="missingCircle">{missingActivities.length}</div>
            </Link>
          </div>
          <div className="done">
            <h4>Done</h4>
            <Link className="doneButton" to={`${pathname}?filter=done`}>
              <div className="doneCircle">{doneActivities.length}</div>
            </Link>
          </div>
        </UpperContainer>
        <ActivityHeader>
          <ActivityContainer>
            <Switch>
              <Route path={`/progress/class/:classId/activities`} exact>
                {activityLoading
                  ? "Loading..."
                  : (filter === "missing"
                      ? missingActivities
                      : filter === "done"
                      ? doneActivities
                      : activities
                    ).map(
                      ({
                        id,
                        title,
                        dueAt,
                        createdAt,
                        course,
                        mySubmission,
                      }) => {
                        return (
                          <>
                            <Activity key={id}>
                              <Content>
                                <h1>{title}</h1>
                                <h4>
                                  {dayjs(createdAt).format(
                                    "MMMM D, YYYY [at] h:mm a"
                                  )}
                                </h4>
                                <h3>
                                  {" "}
                                  Due: {dayjs(dueAt).format(
                                    "MMMM D, YYYY"
                                  )}{" "}
                                </h3>
                              </Content>
                              <ViewLink
                                to={`/class/${course.id}/activity/${id}`}
                              >
                                View
                              </ViewLink>
                            </Activity>
                          </>
                        );
                      }
                    )}
              </Route>
              <Route path={`/progress/class/:classId/activities/group`}>
                {groupActivityLoading
                  ? "Loading..."
                  : (filter === "missing"
                      ? missingActivities
                      : filter === "done"
                      ? doneActivities
                      : activities
                    ).map(
                      ({
                        id,
                        title,
                        dueAt,
                        createdAt,
                        course,
                        mySubmission,
                      }) => {
                        return (
                          <>
                            <Activity key={id}>
                              <Content>
                                <h1>{title} </h1>
                                <h4>
                                  {dayjs(createdAt).format(
                                    "MMMM D, YYYY [at] h:mm a"
                                  )}
                                </h4>
                                <h3>
                                  {" "}
                                  Due: {dayjs(dueAt).format(
                                    "MMMM D, YYYY"
                                  )}{" "}
                                </h3>
                              </Content>
                              <ViewLink
                                to={`/class/${course.id}/groupactivity/${id}`}
                              >
                                View
                              </ViewLink>
                            </Activity>
                          </>
                        );
                      }
                    )}
              </Route>
            </Switch>
          </ActivityContainer>
        </ActivityHeader>
      </LSideContainer>
      <RSideContainer>
        <RSideAbout>
          <h4>{name}'s PROGRESS</h4>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <ul>
                <li>
                  <FaLaptop size={18} />
                  &nbsp; Subject Code: {subjCode}
                </li>
                <li>
                  <MdAccountCircle size={18} />
                  &nbsp; Faculty: {firstName}&nbsp;
                  {lastName}
                </li>
                <li>
                  <TiGroup size={18} />
                  &nbsp; Section: {yearAndSection}
                </li>
              </ul>
            </>
          )}
        </RSideAbout>
      </RSideContainer>
    </Container>
  );
};

export default ProgressClass;

const Container = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 50px;
`;

const ActivityContainer = styled.div`
  width: 100%;
  padding: 0 2em;
`;

const LSideContainer = styled.div`
  margin: 0 1em;
  width: 80%;
`;

const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 130px;
  margin: 1em;

  > h4 {
    font-weight: normal;
    font-size: 18px;
    padding: 0 1em;
  }
  .taskprogress {
    background-color: #f2f2f2;
    width: 100%;
    border-radius: 10px;
    padding: 0 10px;

    > h4 {
      color: #0f482f;
      margin: 5px;
      margin-top: 15px;
    }
    > p {
      margin: 0;
      padding: 5px;
      font-size: 18px;
      color: #0e5937;
    }
    .outerbar {
      height: 2em;
      background-color: #c4c4c4;
      width: 100%;
      display: flex;
      align-items: center;
      > p {
        margin: 0;
        padding: 5px;
        color: white;
      }
    }
  }
  .alltask,
  .todo,
  .inprogress,
  .underreview,
  .missing,
  .done {
    background-color: #f2f2f2;
    width: 60%;
    text-align: center;
    border-radius: 10px;
    > h4 {
      color: #164aae;
      height: 40px;
      margin-top: 15px;
      margin-bottom: 0;
      font-size: 15px;
    }
    .todoButton {
      color: white;
      margin: 0;
      font-size: 22px;
      text-decoration: none;

      .todoCircle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #164aae;
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }
  }
  .alltask {
    > h4 {
      color: #6b16ae;
    }
    .alltaskButton {
      color: white;
      margin: 0;
      font-size: 22px;
      text-decoration: none;

      .alltaskCircle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #6b16ae;
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }
  }
  .missing {
    > h4 {
      color: #9b1313;
    }
    .missingButton {
      color: white;
      margin: 0;
      font-size: 22px;
      text-decoration: none;

      .missingCircle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #9b1313;
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }
  }
  .done {
    > h4 {
      color: #0e5937;
    }
    .doneButton {
      color: white;
      margin: 0;
      font-size: 22px;
      text-decoration: none;

      .doneCircle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #0e5937;
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }
  }
`;

const ActivityHeader = styled.div`
  position: relative;
  top: 0px;
  margin: 1em;
  padding: 1em;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 10px;
  height: 600px;
  overflow-y: scroll;
`;

const Activity = styled.div`
  width: 100%;
  border-left: 5px solid #0f482f;
  height: 110px;
  padding: 0 20px;
  text-align: left;
  margin: 1.5em 0;
  display: flex;
  button {
    margin-left: auto;
    font-size: 16px;
    width: 130px;
    height: 40px;
    border: none;
    color: white;
    background-color: #0f482f;
    cursor: pointer;
    &:hover {
      background-color: #0e5937;
    }
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

const RSideContainer = styled.div`
  width: 30%;
  min-width: 400px;
  margin: 0 1em;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
  h4 {
    color: #0f482f;
    font-size: 22px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
  h5 {
    color: #0f482f;
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    padding-top: 10px;
  }
  p {
    margin: 0;
    color: #646464;
  }

  ul {
    font-size: 20px;
    color: #646464;
    font-weight: normal;
    list-style-type: none;
    margin-top: 20px;
  }
  li {
    padding: 8px 8px;
  }
`;

const RSideAbout = styled.div`
  border-radius: 10px;
  margin: 1em 0;
  background-color: #f2f2f2;
  width: 100%;
  padding: 2em;
  ul {
    padding: 0 1em;
    font-size: 17px;
    color: #646464;
    font-weight: normal;
    list-style-type: none;
  }
  li {
    padding: 6px 0px;
    > p {
      color: #0e5937;
    }
    > span {
      color: #0e5937;
    }
  }
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

const NavBar = styled.div`
  display: flex;
  height: 70px;
  width: 100%;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  margin: 1em;
  border-radius: 10px;
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
