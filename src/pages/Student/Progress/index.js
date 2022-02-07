import React, { useState } from "react";
import { useLocation } from "react-router";
import styled, { css } from "styled-components";
import { GET_GROUPSUBMISSION, CHANGE_TASK_STATUS } from "./gql";
import Modal from "components/Modal";
import AssignTaskForm from "pages/Student/Progress/Forms/AssignTaskForm";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Link } from "react-router-dom";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import Dropdown, { DropdownButtons } from "components/Dropdown";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { TiGroup } from "react-icons/ti";
import { FaLaptop } from "react-icons/fa";
import { RiAccountCircleFill, RiQuestionnaireLine } from "react-icons/ri";

import { useUrlQuery } from "hooks/useUrlQuery";

const Progress = () => {
  const { user } = useCurrentUserContext();
  const { groupSubmissionId, groupActivityId } = useParams();
  const { filter } = useUrlQuery();
  const { pathname } = useLocation();

  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);

  const { loading, data, refetch } = useQuery(GET_GROUPSUBMISSION, {
    variables: { groupSubmissionId: groupSubmissionId },
  });
  const [changeTaskStatus] = useMutation(CHANGE_TASK_STATUS);

  const { group, tasks, groupActivity, myTask } = data?.groupSubmission ?? {};

  const { name, leader, course } = group ?? {};
  const taskInfo = tasks?.data ?? [];
  const { title: groupActivityTitle, description: groupActivityDescription } =
    groupActivity ?? {};

  const handleChangeTaskStatus = async (id, status) => {
    try {
      const { data } = await changeTaskStatus({
        variables: { taskId: id, status },
      });

      if (data?.changeTaskStatus?.id) {
        toast.success("Changed");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  //count status
  const doneCount = taskInfo.filter(({ status }) => status === "DONE").length;
  const inProgressCount = taskInfo.filter(
    ({ status }) => status === "IN_PROGRESS"
  ).length;
  const underReviewCount = taskInfo.filter(
    ({ status }) => status === "UNDER_REVIEW"
  ).length;
  const toDoCount = taskInfo.filter(({ status }) => status === "TODO").length;
  const missingCount = taskInfo.filter(
    ({ dueAt, submittedAt, status }) =>
      (!submittedAt && new Date(dueAt)) < new Date() && status !== "DONE"
  ).length;

  const allCount =
    toDoCount + inProgressCount + underReviewCount + missingCount + doneCount;
  const percentProgress = (doneCount / taskInfo.length) * 100;

  return (
    <ProgressContainer>
      <LeftSideContainer>
        <UpperContainer percentProgress={percentProgress}>
          <div className="taskprogress">
            <h4>Progress</h4>
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
          <div className="todo">
            <h4>To-do</h4>
            <Link className="todoButton" to={`${pathname}?filter=todo`}>
              <div className="todoCircle">{toDoCount}</div>
            </Link>
          </div>
          <div className="inprogress">
            <h4>In Progress</h4>
            <Link
              className="inprogressButton"
              to={`${pathname}?filter=inprogress`}
            >
              <div className="inprogressCircle">{inProgressCount}</div>
            </Link>
          </div>
          <div className="underreview">
            <h4>Under Review</h4>
            <Link
              className="underreviewButton"
              to={`${pathname}?filter=underreview`}
            >
              <div className="underreviewCircle">{underReviewCount}</div>
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
          {taskInfo.length === 0 ? (
            <p>No assigned tasks yet.</p>
          ) : loading ? (
            "Loading..."
          ) : (
            taskInfo
              .filter(({ status }) => {
                if (filter === "todo") {
                  return status === "TODO";
                }
                if (filter === "inprogress") {
                  return status === "IN_PROGRESS";
                }
                if (filter === "underreview") {
                  return status === "UNDER_REVIEW";
                }
                if (filter === "missing") {
                  return status === "MISSING";
                }
                if (filter === "done") {
                  return status === "DONE";
                }
                return true;
              })
              .map(({ id, title, status, dueAt, student }) => {
                return (
                  <>
                    <Content>
                      <Task>
                        <h1>{title} </h1>
                        {(leader?.id === user.id || myTask?.id === id) && (
                          <Dropdown
                            popperComponent={
                              <DropdownButtons>
                                <button
                                  onClick={() =>
                                    handleChangeTaskStatus(id, "DONE")
                                  }
                                >
                                  Done
                                </button>
                                {leader?.id === user.id && (
                                  <button
                                    onClick={() =>
                                      handleChangeTaskStatus(id, "UNDER_REVIEW")
                                    }
                                  >
                                    Under Review
                                  </button>
                                )}
                                {myTask?.id === id && (
                                  <button
                                    onClick={() =>
                                      handleChangeTaskStatus(id, "IN_PROGRESS")
                                    }
                                  >
                                    In Progress
                                  </button>
                                )}
                              </DropdownButtons>
                            }
                          >
                            <button className="mark">Mark as</button>
                          </Dropdown>
                        )}
                        <ViewLink
                          status={status}
                          to={`/progress/class/${course?.id}/groupactivity/${groupActivityId}/submission/${groupSubmissionId}/task/${id}`}
                        >
                          {status === "TODO"
                            ? "View Submission"
                            : status === "IN_PROGRESS"
                            ? "In Progress"
                            : status === "UNDER_REVIEW"
                            ? "Under Review"
                            : status === "DONE"
                            ? "Done"
                            : ""}
                        </ViewLink>
                        <p>
                          Assigned to:{" "}
                          {user.id === student?.id
                            ? "You"
                            : student?.user?.firstName +
                              " " +
                              student?.user?.lastName}{" "}
                          | Due:{" "}
                          {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                        </p>
                      </Task>
                    </Content>
                  </>
                );
              })
          )}
        </TasksContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <AboutContainer>
          <h3>ABOUT</h3>
          <ul>
            <li>
              <TiGroup /> &nbsp; {name}
            </li>
            <li>
              {" "}
              <FaLaptop /> &nbsp; Course: {course?.name}
            </li>
            <li>
              <RiAccountCircleFill /> &nbsp; Leader:{" "}
              {user.id === leader?.id
                ? "You"
                : leader?.user?.firstName + " " + leader?.user?.lastName}
            </li>
            <li>
              <RiAccountCircleFill /> &nbsp; Professor:{" "}
              {course?.teacher?.user?.firstName}{" "}
              {course?.teacher?.user?.lastName}
            </li>
            <li>
              <FaLaptop /> &nbsp; Group Activity: {groupActivityTitle}
            </li>
            {groupActivityDescription && (
              <li>
                <RiQuestionnaireLine /> &nbsp; Description:{" "}
                <p className="desc">{groupActivityDescription} </p>
              </li>
            )}
          </ul>
        </AboutContainer>
        {leader?.id === user.id && (
          <button
            className="assign"
            onClick={() => setShowAssignTaskModal(true)}
          >
            Assign Task
          </button>
        )}
      </RightSideContainer>
      <Modal
        show={showAssignTaskModal}
        closeModal={() => setShowAssignTaskModal(false)}
        title="Assign Task"
      >
        <AssignTaskForm
          groupSubmissionId={groupSubmissionId}
          onCreateFinish={() => {
            setShowAssignTaskModal(false);
            refetch();
          }}
        />
      </Modal>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  margin: 1em;
  justify-content: center;
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
  gap: 15px;
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
  height: 550px;
  margin-top: 1.5em;
  overflow-y: scroll;
  flex-direction: column;
  padding: 10px;
`;

const Content = styled.div`
  width: 100%;
  height: 110px;
  text-align: left;
  padding: 0 20px;
  margin: 2em 0;
  border-bottom: 1px solid black;
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
  .mark {
    width: 130px;
    height: 40px;
    background-color: #0e5937;
    float: right;
  }
`;

const Task = styled.div`
  width: 100%;
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
  width: 27%;
  gap: 20px;
  flex-direction: column;
  margin-left: 2em;

  h3 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }

  .assign {
    display: flex;
    width: 130px;
    height: 40px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
  }
`;

const AboutContainer = styled.div`
  border-radius: 10px;
  background-color: #f2f2f2;
  width: 100%;
  padding: 2em;
  margin-top: 3.5em;
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
  ${({ status }) =>
    css`
      background-color: ${status === "TODO"
        ? "#164aae"
        : status === "DONE"
        ? "#0e5937"
        : status === "UNDER_REVIEW"
        ? "#ae1696"
        : status === "IN_PROGRESS"
        ? "#ae5f16"
        : "#0e5937"};
    `}
  text-decoration: none;
  font-size: 16px;
  width: 150px;
  height: 40px;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: inline-block;
  float: right;
  margin-right: 1em;
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

export default Progress;
