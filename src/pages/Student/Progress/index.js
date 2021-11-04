import React, { useState } from "react";
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

const Progress = () => {
  const { user } = useCurrentUserContext();
  const { groupSubmissionId } = useParams();

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
    ({ dueAt, submittedAt }) => !submittedAt && new Date(dueAt) < new Date()
  ).length;
  const percentProgress = (doneCount / taskInfo.length) * 100;

  return (
    <ProgressContainer>
      <LeftSideContainer>
        <UpperContainer percentProgress={percentProgress}>
          <div className="taskprogress">
            <h4>Progress</h4>
            <p>{percentProgress ? `${percentProgress}%` : "0%"}</p>
            <div className="outerbar">
              <div className="bar"></div>
            </div>
          </div>
          <div className="todo">
            <h4>To-do</h4>
            <h5>{toDoCount}</h5>
          </div>
          <div className="inprogress">
            <h4>In Progress</h4>
            <h5>{inProgressCount}</h5>
          </div>
          <div className="underreview">
            <h4>Under Review</h4>
            <h5>{underReviewCount}</h5>
          </div>
          <div className="missing">
            <h4>Missing</h4>
            <h5>{missingCount}</h5>
          </div>
          <div className="done">
            <h4>Done</h4>
            <h5>{doneCount}</h5>
          </div>
        </UpperContainer>
        <TasksContainer>
          <Container>
            {taskInfo.length === 0 && <p>No assigned tasks yet.</p>}
            {loading
              ? "Loading..."
              : taskInfo.map(({ id, description, status, dueAt, student }) => {
                  return (
                    <>
                      <Content>
                        <h1>{description}</h1>
                        <span>
                          Assigned to: {student.user.firstName}{" "}
                          {student.user.lastName} | Due:{" "}
                          {dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}
                        </span>
                        <button>
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
                            Mark as
                          </Dropdown>
                        </button>
                        <ViewLink
                          status={status}
                          to={`/progress/:groupSubmissionId/task/${id}`}
                        >
                          {status === "TODO"
                            ? "View Submission"
                            : status === "IN_PROGRESS"
                            ? "In Progress"
                            : status === "UNDER_REVIEW"
                            ? "Under Review"
                            : status === "DONE"
                            ? "DONE"
                            : ""}
                        </ViewLink>
                      </Content>
                    </>
                  );
                })}
          </Container>
        </TasksContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <AboutContainer>
          <h3>ABOUT</h3>
          <ul>
            <li>{name}</li>
            <li> Course: {course?.name}</li>
            <li>
              Leader: {leader?.user?.firstName} {leader?.user?.lastName}
            </li>
            <li>
              Professor: {course?.teacher?.user?.firstName}{" "}
              {course?.teacher?.user?.lastName}
            </li>
            <li>Group Activity: {groupActivityTitle}</li>
            {groupActivityDescription && (
              <li>Group Activity Description: {groupActivityDescription}</li>
            )}
          </ul>
        </AboutContainer>
        <ToDoContainer>
          <h3>TO-DO</h3>
        </ToDoContainer>
        {leader?.id === user.id && (
          <button onClick={() => setShowAssignTaskModal(true)}>
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
  width: 72%;
`;

const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 10px;
  height: 130px;

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
  .todo,
  .inprogress,
  .underreview,
  .missing,
  .done {
    background-color: #f2f2f2;
    width: 50%;
    text-align: center;
    border-radius: 10px;
    > h4 {
      color: #164aae;
      height: 50px;
      margin-top: 15px;
      margin-bottom: 0;
    }
    > h5 {
      color: #164aae;
      margin: 0;
      font-size: 22px;
    }
  }
  .inprogress {
    > h4,
    h5 {
      color: #ae5f16;
    }
  }
  .underreview {
    > h4,
    h5 {
      color: #ae1696;
    }
  }
  .missing {
    > h4,
    h5 {
      color: #9b1313;
    }
  }
  .done {
    > h4,
    h5 {
      color: #0e5937;
    }
  }
`;

const TasksContainer = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  flex-direction: column;
  width: 100%;
  height: 550px;
  margin-top: 1.5em;
  overflow-y: scroll;
`;

const Container = styled.div`
  width: 100%;
`;
const Content = styled.div`
  width: 100%;
  height: 150px;
  text-align: left;
  padding: 1.6em 2em;
  border-bottom: 1px solid black;
  > h1 {
    padding: 5px 0;
    font-size: 20px;
    font-weight: normal;
  }
  > span {
    font-size: 18px;
    display: block;
    color: #646464;
  }
  > button {
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
    margin-left: auto;
    cursor: pointer;
  }
`;

const RightSideContainer = styled.div`
  display: flex;
  width: 27%;
  gap: 20px;
  flex-direction: column;
  margin-left: 1em;

  h3 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
`;

const AboutContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: max-content;
  padding: 2em;
  border-radius: 10px;

  button {
    border: none;
    background-color: #0e5937;
    color: white;
    width: 150px;
    height: 33px;
    text-align: center;
    font-size: 16px;
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

const ToDoContainer = styled.div`
  display: flex;
  width: 100%;
  height: max-content;
  flex-direction: column;
  background-color: #f2f2f2;
  padding: 2em;
  border-radius: 10px;
`;

const ViewLink = styled(Link)`
  ${({ status }) =>
    css`
      background-color: ${status === "TODO"
        ? "#0e5937"
        : status === "DONE"
        ? "#0e5937"
        : status === "UNDER_REVIEW"
        ? "#ae1696"
        : status === "IN_PROGRESS"
        ? "#ae5f16"
        : "#0e5937"};
    `}
  text-decoration: none;
  margin-left: auto;
  font-size: 16px;
  width: 130px;
  height: 40px;
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Progress;
