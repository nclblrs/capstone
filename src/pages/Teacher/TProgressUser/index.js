import React from "react";
import { useLocation } from "react-router";
import styled, { css } from "styled-components";
import { useQuery } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import dayjs from "dayjs";
import { TiGroup } from "react-icons/ti";
import { FaLaptop } from "react-icons/fa";
import { smallProfpicUrl } from "utils/upload";
import { useUrlQuery } from "hooks/useUrlQuery";

import { COURSE_ACTIVITIES_SUBMISSIONS } from "./gql";

const TProgressUser = () => {
  const { classId, userId } = useParams();
  const { filter } = useUrlQuery();
  const { pathname } = useLocation();

  const { loading, data } = useQuery(COURSE_ACTIVITIES_SUBMISSIONS, {
    variables: { courseId: classId, studentId: userId },
  });
  const courseInfo = data?.courseActivitiesAndSubmissions?.data ?? [];
  const { student, course, group } = data?.courseActivitiesAndSubmissions ?? {};
  const { user } = student ?? {};
  const { firstName, lastName, profilePicture = null } = user ?? {};
  const doneCount = courseInfo.filter(
    ({ submission }) => submission?.id != null
  ).length;
  const missingCount = courseInfo.filter(
    ({ submission }) => submission?.id == null
  ).length;
  const { secure_url } = JSON.parse(profilePicture) ?? {};
  const allCount = missingCount + doneCount;
  const percentProgress = (doneCount / courseInfo.length) * 100;
  return (
    <ProgressContainer>
      <LeftSideContainer>
        <UpperContainer percentProgress={percentProgress}>
          <div className="taskprogress">
            <h4>
              <img src={smallProfpicUrl(secure_url)} alt="Your profile pic" />{" "}
              {firstName} {lastName}
            </h4>
            <p>{percentProgress ? `${percentProgress.toFixed(2)}%` : "0%"}</p>
            <div className="outerbar">
              <div className="bar"></div>
            </div>
          </div>
          <div className="alltask">
            <h4>All</h4>
            <Link className="alltaskButton">
              <div className="alltaskCircle">{allCount}</div>
            </Link>
          </div>
          <div className="missing">
            <h4>Missing</h4>
            <Link className="missingButton" to={`${pathname}?filter=missing`}>
              <div className="missingCircle">{missingCount}</div>
            </Link>
          </div>
          <div className="done">
            <h4>Done</h4>
            <Link className="doneButton" to={`${pathname}?filter=done`}>
              <div className="doneCircle">{doneCount}</div>
            </Link>
          </div>
        </UpperContainer>
        <TasksContainer>
          {loading
            ? "Loading..."
            : courseInfo
                .filter(({ submission }) => {
                  if (filter === "missing") {
                    return submission?.id == null;
                  }
                  if (filter === "done") {
                    return submission?.id != null;
                  }
                  return true;
                })
                .map(({ id, activity, submission = null }) => (
                  <>
                    <Content key={id}>
                      <Task>
                        <h1>{activity?.title}</h1>
                        <p>
                          {dayjs(activity?.createdAt).format(
                            "MMMM D, YYYY [at] h:mm a"
                          )}
                        </p>
                        <h3>
                          {" "}
                          Due: {dayjs(activity?.dueAt).format(
                            "MMMM D, YYYY"
                          )}{" "}
                        </h3>
                      </Task>
                      {submission?.id != null ? (
                        <ViewLink
                          to={`/class/${classId}/activity/${activity.id}/submission/${submission.id}`}
                        >
                          View
                        </ViewLink>
                      ) : (
                        <span>No submission yet.</span>
                      )}
                    </Content>
                  </>
                ))}
        </TasksContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <AboutContainer>
          <h3>ABOUT</h3>
          <ul>
            <h3>
              {student?.user?.firstName} {student?.user?.lastName}'s Progress
            </h3>
            <li>
              <FaLaptop size={18} />
              &nbsp; Subject Code: {course?.subjCode} ({course?.name})
            </li>
            <li>
              <FaLaptop size={18} />
              &nbsp; Section: {course?.yearAndSection}
            </li>
            <li>
              <TiGroup size={18} />
              &nbsp; Group Number: {group?.name}
            </li>
          </ul>
        </AboutContainer>
      </RightSideContainer>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  margin: 0 50px;
  margin-left: 250px;
`;

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 68%;
  margin-left: 1em;
`;

const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 150px;
  margin-top: 1em;
  img {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    margin-right: 10px;
    object-fit: cover;
  }

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
      font-size: 18px;
      color: #0f482f;
      margin: 5px;
      margin-top: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
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
      .bar {
        ${({ percentProgress }) =>
          css`
            width: ${percentProgress}%;
          `}
        background-color: #0e5937;
        height: 2em;
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

const TasksContainer = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  width: 100%;
  margin-top: 1.5em;
  overflow-y: scroll;
  flex-direction: column;
  padding: 1em;
  height: 650px;
`;

const Content = styled.div`
  width: 100%;
  text-align: left;
  padding: 0 1em;
  margin: 1em 0;

  display: flex;
  border-bottom: 1px solid black;

  > span {
    margin-top: 2em;
    padding: 0;
  }
`;

const Task = styled.div`
  width: 100%;
  margin: 1em;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    font-size: 20px;
    color: #0f482f;
    margin: 0;
  }
  p {
    font-size: 17px;
    margin: 0;
    color: #646464;
  }

  h3 {
    padding: 0;
  }
`;

const RightSideContainer = styled.div`
  display: flex;
  width: 30%;
  gap: 20px;
  flex-direction: column;
  margin-left: 2em;

  h3 {
    color: #0e5937;
    text-align: left;
    font-size: 22px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
`;

const AboutContainer = styled.div`
  border-radius: 10px;
  background-color: #f2f2f2;
  width: 100%;
  padding: 2em;
  margin-top: 1em;
  ul {
    padding: 0 1em;
    font-size: 18px;
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

  button {
    border: none;
    background-color: #0e5937;
    color: white;
    width: 150px;
    height: 33px;
    text-align: center;
    font-size: 16px;
  }
`;

const ViewLink = styled(Link)`
  text-decoration: none;
  margin-left: auto;
  font-size: 16px;
  width: 130px;
  height: 40px;
  margin-top: 2em;
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

export default TProgressUser;
