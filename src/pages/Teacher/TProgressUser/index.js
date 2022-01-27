import React, { useState } from "react";
import styled, { css } from "styled-components";
import Modal from "components/Modal";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import Dropdown, { DropdownButtons } from "components/Dropdown";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { TiGroup } from "react-icons/ti";
import { FaLaptop } from "react-icons/fa";
import { RiAccountCircleFill, RiQuestionnaireLine } from "react-icons/ri";
import { COURSE_ACTIVITIES_SUBMISSIONS } from "./gql";

const TProgressUser = () => {
  const { classId, userId, activityId } = useParams();
  const { loading, data } = useQuery(COURSE_ACTIVITIES_SUBMISSIONS, {
    variables: { courseId: classId, studentId: userId },
  });
  const courseInfo = data?.courseActivitiesAndSubmissions?.data ?? [];
  //count status
  {
    /*const doneCount = taskInfo.filter(({ status }) => status === "DONE").length;
  const inProgressCount = taskInfo.filter(
    ({ status }) => status === "IN_PROGRESS"
  ).length;
  const underReviewCount = taskInfo.filter(
    ({ status }) => status === "UNDER_REVIEW"
  ).length;
  const toDoCount = taskInfo.filter(({ status }) => status === "TODO").length;
  const missingCount = taskInfo.filter(
    ({ dueAt, submittedAt }) => !submittedAt && new Date(dueAt) < new Date()
  ).length;

  const allCount =
    toDoCount + inProgressCount + underReviewCount + missingCount + doneCount;
  const percentProgress = (doneCount / taskInfo.length) * 100;*/
  }

  return (
    <ProgressContainer>
      <LeftSideContainer>
        <UpperContainer>
          <div className="taskprogress">
            <p>{userId}</p>
            <p></p>
            <div className="outerbar">
              <div className="bar"></div>
            </div>
          </div>
          <div className="alltask">
            <h4>All</h4>
            <Link className="alltaskButton">
              <div className="alltaskCircle"></div>
            </Link>
          </div>
          <div className="todo">
            <h4>To-do</h4>
            <Link className="todoButton">
              <div className="todoCircle"></div>
            </Link>
          </div>
          <div className="missing">
            <h4>Missing</h4>
            <Link className="missingButton">
              <div className="missingCircle"></div>
            </Link>
          </div>
          <div className="done">
            <h4>Done</h4>
            <Link className="doneButton">
              <div className="doneCircle"></div>
            </Link>
          </div>
        </UpperContainer>
        <TasksContainer>
          {loading
            ? "Loading..."
            : courseInfo.map(({ id, activity, submission }) => (
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
                      {submission?.id != null ? (
                        <ViewLink
                          to={`/class/${classId}/activity/${activity.id}/submission/${submission.id}`}
                        >
                          View
                        </ViewLink>
                      ) : (
                        <ViewLink>Missing</ViewLink>
                      )}
                    </Task>
                  </Content>
                </>
              ))}
        </TasksContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <AboutContainer>
          <h3>ABOUT</h3>
          <ul>
            <h3>{userId}'s Progress</h3>
            <li>
              <FaLaptop size={18} />
              &nbsp; Subject Code:
            </li>
            <li>
              <FaLaptop size={18} />
              &nbsp; Section:
            </li>
            <li>
              <TiGroup size={18} />
              &nbsp; Group Number:
            </li>
          </ul>
        </AboutContainer>
        {/*<ToDoContainer>
                      <h3>TO-DO</h3>
                    </ToDoContainer>*/}
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
  height: 130px;
  margin-top: 1em;

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
      .bar {
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
  .inprogress {
    > h4 {
      color: #ae5f16;
    }
    .inprogressButton {
      color: white;
      margin: 0;
      font-size: 22px;
      text-decoration: none;

      .inprogressCircle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #ae5f16;
        justify-content: center;
        align-items: center;
        display: flex;
      }
    }
  }
  .underreview {
    > h4 {
      color: #ae1696;
    }
    .underreviewButton {
      color: white;
      margin: 0;
      font-size: 22px;
      text-decoration: none;

      .underreviewCircle {
        height: 50px;
        width: 50px;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #ae1696;
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
`;

const Content = styled.div`
  width: 100%;
  height: 110px;
  text-align: left;
  padding: 0 20px;
  margin: 2em 0;

  button {
    display: flex;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
  }
`;

const Task = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0;
    font-size: 20px;
    color: #0f482f;
  }
  p {
    font-size: 17px;
    margin-top: 5px;
    color: #646464;
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

/*const ToDoContainer = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 2em;
  border-radius: 10px;
`;*/

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

/* const GoBack = styled.button`
  text-decoration: none;
  font-size: 18px;
  width: 100px;
  height: 40px;
  border: none;
  color: #0f482f;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  letter-spacing: 1px;
  font-weight: normal;
`; */

export default TProgressUser;
