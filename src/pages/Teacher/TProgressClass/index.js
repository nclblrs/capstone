import React from "react";
import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
/* import dayjs from "dayjs"; */
import { Switch, NavLink, Route, useParams, Link } from "react-router-dom";
import { GET_COURSE } from "./gql";
import { useQuery } from "@apollo/client";
import { FaLaptop } from "react-icons/fa";
/* import { MdAccountCircle } from "react-icons/md"; */
import { TiGroup } from "react-icons/ti";
import { smallProfpicUrl } from "utils/upload";

ChartJS.register(ArcElement, Tooltip, Legend);

const TProgressClass = () => {
  const { classId } = useParams();
  const { loading, data } = useQuery(GET_COURSE, {
    variables: { courseId: classId },
  });

  const {
    name,
    subjCode,
    /* {courseCode,} */
    yearAndSection,
    students,
    groups,
    studentCount,
  } = data?.course ?? {};

  const groupActivitiesCount = data?.courseGroupActivities?.data?.length;
  const activitiesCount = data?.courseActivities?.data?.length;

  return (
    <Container>
      <NavBar>
        <NavMenu to={`/progress/class/${classId}`} exact>
          Overview
        </NavMenu>
        <NavMenu to={`/progress/class/${classId}/individual`}>
          Individual
        </NavMenu>
        <NavMenu to={`/progress/class/${classId}/group`}>Group</NavMenu>
      </NavBar>
      <DownContainer>
        <Switch>
          <Route path={`/progress/class/:classId`} exact>
            <LSideContainer>
              <ActivityContainer>
                <h4>{name}</h4>
                <Pie
                  data={{
                    labels: ["Group Activity", "Individual Activity"],
                    datasets: [
                      {
                        data: [groupActivitiesCount, activitiesCount],
                        backgroundColor: ["#0E5937", "#67C587"],
                        hoverOffset: 20,
                      },
                    ],
                  }}
                />
              </ActivityContainer>
            </LSideContainer>
            <RSideContainer>
              <RSideAbout>
                <h3>ABOUT</h3>
                <h4>{name}</h4>
                <ul>
                  <li>
                    <FaLaptop size={18} />
                    &nbsp; Subject Code: {subjCode}
                  </li>
                  <li>
                    <FaLaptop size={18} />
                    &nbsp; Section: {yearAndSection}
                  </li>
                  <li>
                    <TiGroup size={18} />
                    &nbsp; {studentCount} members
                  </li>
                </ul>
              </RSideAbout>
            </RSideContainer>
          </Route>
          <Route path={`/progress/class/:classId/individual`} exact>
            <LSideContainer>
              <ActivityContainer>
                <h3>SECTION NAME Students</h3>
                {loading
                  ? "Loading..."
                  : students?.data?.map(({ id, user }) => {
                      const { secure_url } =
                        JSON.parse(user.profilePicture) ?? {};
                      return (
                        <>
                          <ul key={id}>
                            <Link
                              className="members"
                              key={id}
                              to={`/progress/class/${classId}/individual/${user.id}`}
                            >
                              <img src={smallProfpicUrl(secure_url)} alt="a" />
                              {user.firstName} {user.middleName} {user.lastName}
                            </Link>
                          </ul>
                        </>
                      );
                    })}
              </ActivityContainer>
            </LSideContainer>
            <RSideContainer>
              <RSideAbout>
                <h3>ABOUT</h3>
                <h4>{name}</h4>
                <ul>
                  <li>
                    <FaLaptop size={18} />
                    &nbsp; Subject Code: {subjCode}
                  </li>
                  <li>
                    <FaLaptop size={18} />
                    &nbsp; Section: {yearAndSection}
                  </li>
                  <li>
                    <TiGroup size={18} />
                    &nbsp; {studentCount} members
                  </li>
                </ul>
              </RSideAbout>
            </RSideContainer>
          </Route>
          <Route path={`/progress/class/:classId/group`} exact>
            <LSideContainer>
              <ActivityContainer>
                <h3>SECTION NAME Groups</h3>
                <GroupContainer>
                  <div className="leftContent">
                    {loading
                      ? "Loading..."
                      : groups?.data?.map(({ id, name, students, leader }) => (
                          <div key={id} className="groupcontainer">
                            <Link
                              className="group"
                              key={id}
                              to={`/progress/class/${classId}/group/${id}`}
                            >
                              <h5>{name}</h5>
                              <p>
                                Leader: &nbsp;
                                {leader &&
                                  `${leader?.user?.lastName}, ${leader?.user?.firstName}`}
                              </p>
                              <p>Members: </p>
                              {students?.data?.map(({ id, user }) => (
                                <ul key={id}>
                                  <li>
                                    {user.lastName}, {user.firstName}
                                  </li>
                                </ul>
                              ))}
                            </Link>
                          </div>
                        ))}
                  </div>
                </GroupContainer>
              </ActivityContainer>
            </LSideContainer>
            <RSideContainer>
              <RSideAbout>
                <h3>ABOUT</h3>
                <h4>{name}</h4>
                <ul>
                  <li>
                    <FaLaptop size={18} />
                    &nbsp; Subject Code: {subjCode}
                  </li>
                  <li>
                    <FaLaptop size={18} />
                    &nbsp; Section: {yearAndSection}
                  </li>
                  <li>
                    <TiGroup size={18} />
                    &nbsp; # groups
                  </li>
                </ul>
              </RSideAbout>
            </RSideContainer>
          </Route>
        </Switch>
      </DownContainer>
    </Container>
  );
};

export default TProgressClass;

const Container = styled.div`
  margin: 0 50px;
  margin-left: 200px;
`;

const DownContainer = styled.div`
  margin: 0 75px;
  display: flex;
  justify-content: center;
  gap: 20px;
  width: 100%;
`;

const ActivityContainer = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2em;
  .members {
    text-decoration: none;
    color: #0e5937;
  }
  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
    margin-top: 5px;
  }
`;

const LSideContainer = styled.div`
  width: 100%;
  h4 {
    color: #0f482f;
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
  }
  h3 {
    color: #646464;
    text-align: left;
    font-size: 18px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
`;

const GroupContainer = styled.div`
  display: flex;
  border-radius: 1em;
  padding: 2em;
  flex-direction: column;

  h5 {
    font-weight: bold;
    color: #0f482f;
    text-align: left;
    font-size: 20px;
    display: flex;
    margin: 0;
    margin-bottom: 1em;
  }

  .leftContent {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 2em;

    .groupcontainer {
      border-radius: 1em;
      flex-direction: column;
      display: flex;
      padding: 2em;
      width: 45%;
      background-color: white;
      margin-bottom: 20px;
      border: 1px solid;
      .group {
        text-decoration: none;
      }
      p {
        margin-top: 7px;
        color: #0f482f;
        font-size: 16px;
        font-weight: bold;
      }
      ul {
        list-style-type: none;
        margin: 10px;
      }
    }
  }
`;

const RSideContainer = styled.div`
  width: 30%;
  min-width: 400px;
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
    font-size: 20px;
    text-align: left;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
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

  li {
    padding: 8px 8px;
  }
`;

const RSideAbout = styled.div`
  border-radius: 10px;
  background-color: #f2f2f2;
  width: 90%;
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

/* const ViewLink = styled(Link)`
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
`; */

const NavBar = styled.div`
  display: flex;
  align-items: center;
  border-radius: 10px;
  margin: 0 75px;
  width: 100%;
  height: 100px;
  padding: 1em 0;
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
