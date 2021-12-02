import React, { useState } from "react";
import styled from "styled-components";
import { MdAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";
import { GET_TASK } from "./gql";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "react-router";
import dayjs from "dayjs";
import Modal from "components/Modal";
import SubmitTaskForm from "./Forms/SubmitTaskForm";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { CHANGE_TASK_STATUS } from "./gql";
import { toast } from "react-toastify";
import Dropdown, { DropdownButtons } from "components/Dropdown";

const Task = () => {
  const [showSubmitTaskModal, setShowSubmitTaskModal] = useState(false);
  const { user } = useCurrentUserContext();
  const { taskId } = useParams();
  const [changeTaskStatus] = useMutation(CHANGE_TASK_STATUS);
  const { loading, data, refetch } = useQuery(GET_TASK, {
    variables: { taskId: taskId },
  });

  const {
    id,
    title,
    note,
    dueAt,
    createdAt,
    status,
    description,
    groupSubmission,
    student,
    attachment = null,
    submittedAt,
  } = data?.task ?? {};

  const { myTask, group } = groupSubmission ?? {};

  const { leader } = group ?? {};

  const { original_filename, secure_url } = JSON.parse(attachment) ?? {};
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

  return (
    <ActivityContainer>
      <>
        <LSideContainer>
          <ActivityHeader>
            <ActivityContent>
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <h1>{title}</h1>
                  <span>
                    Task created:{" "}
                    {dayjs(createdAt).format("MMMM D, YYYY [at] h:mm a")}
                    &thinsp; | &thinsp;
                    {status === "TODO"
                      ? "To-do"
                      : status === "IN_PROGRESS"
                      ? "In Progress"
                      : status === "UNDER_REVIEW"
                      ? "Under Review"
                      : status === "DONE"
                      ? "Done"
                      : ""}
                  </span>
                </>
              )}
            </ActivityContent>
            <ActivityButtons>
              {user.id === student?.id ? (
                !myTask?.submittedAt ? (
                  <button
                    className="submit"
                    onClick={() => setShowSubmitTaskModal(true)}
                  >
                    Submit
                  </button>
                ) : (
                  "Submitted!"
                )
              ) : (
                ""
              )}
            </ActivityButtons>
          </ActivityHeader>
          <ActivityHeader>
            <ActivityContent>
              {loading ? (
                "Loading..."
              ) : (
                <>
                  {user.id === student?.id ? (
                    <h1>My Submission</h1>
                  ) : (
                    <h1>
                      {student?.user?.firstName} {student?.user?.lastName}
                      's Submission
                    </h1>
                  )}
                  {taskId === id && (attachment || description) ? (
                    <>
                      <span>
                        {submittedAt &&
                          `Submitted: ${dayjs(submittedAt).format(
                            "MMMM D, YYYY [at] h:mm a"
                          )}`}
                      </span>
                      <span>{description}</span>
                      {attachment && (
                        <>
                          Attachment:
                          <Attachment href={secure_url} download>
                            {original_filename}.
                            {secure_url.split(".").slice(-1)}
                          </Attachment>
                        </>
                      )}
                    </>
                  ) : (
                    "Nothing submitted yet."
                  )}
                </>
              )}
            </ActivityContent>
            <ActivityButtons>
              {(leader?.id === user.id || myTask?.id === id) && (
                <Dropdown
                  popperComponent={
                    <DropdownButtons>
                      <button
                        className="done"
                        onClick={() => handleChangeTaskStatus(id, "DONE")}
                      >
                        Done
                      </button>

                      {leader?.id === user.id && (
                        <button
                          className="under"
                          onClick={() =>
                            handleChangeTaskStatus(id, "UNDER_REVIEW")
                          }
                        >
                          Under Review
                        </button>
                      )}
                      {myTask?.id === id && (
                        <button
                          className="in"
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
            </ActivityButtons>
          </ActivityHeader>
        </LSideContainer>
        <RSideContainer>
          <RSideAbout>
            <h3>ABOUT</h3>
            <ul>
              <li>
                <TiGroup size={18} />
                &nbsp; Due Date:{" "}
                <span>{dayjs(dueAt).format("MMMM D, YYYY [at] h:mm a")}</span>
              </li>

              <li>
                <MdAccountCircle size={18} />
                &nbsp; Assigned by:{" "}
                {user.id === leader?.id
                  ? "You"
                  : leader?.user?.firstName + " " + leader?.user?.lastName}
              </li>
              <li>
                <MdAccountCircle size={18} />
                &nbsp; Assigned to:{" "}
                <span>
                  {user.id === student?.id
                    ? "You"
                    : student?.user?.firstName + " " + student?.user?.lastName}
                </span>
              </li>
              <li>
                <TiGroup size={18} />
                &nbsp; Description: <p>{note}</p>
              </li>
            </ul>
          </RSideAbout>
        </RSideContainer>
        <Modal
          show={showSubmitTaskModal}
          closeModal={() => setShowSubmitTaskModal(false)}
          title="Create Submission"
        >
          <SubmitTaskForm
            taskId={taskId}
            onCreateFinish={() => {
              setShowSubmitTaskModal(false);
              refetch();
            }}
          />
        </Modal>
      </>
    </ActivityContainer>
  );
};

export default Task;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
`;

const LSideContainer = styled.div`
  margin: 0 1em;
  display: flex;
  width: 70%;
  flex-direction: column;
`;

const ActivityHeader = styled.div`
  position: relative;
  top: 0px;
  margin: 1em;
  padding: 2em 1em;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 10px;
`;

const ActivityContent = styled.div`
  padding: 1em;
  width: 100%;
  margin-bottom: 1em;

  > h1 {
    margin: 0;
    color: #0f482f;
    font-weight: normal;
    font-size: 26px;
  }
  > span {
    margin-top: 5px;
    color: #646464;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  .description {
    margin-top: 25px;
  }
`;

const ActivityButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  position: absolute;
  right: 30px;
  top: 50px;
  > button {
    font-size: 16px;
    outline: none;
    text-align: center;
  }
  .mark {
    font-size: 16px;
    width: 120px;
    height: 40px;
    background-color: #0e5937;
    color: white;
    cursor: pointer;
    border: none;
  }
  .submit {
    width: 120px;
    height: 40px;
    background-color: #0e5937;
    color: white;
    cursor: pointer;
    border: none;
  }
  .under {
    padding: 1em;
    font-size: 17px;
    justify-content: center;
  }
  .done {
    font-size: 17px;
    justify-content: center;
  }
  .in {
    font-size: 17px;
    justify-content: center;
  }
`;

const RSideContainer = styled.div`
  width: 24%;
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

const Attachment = styled.a`
  background: #0e5937;
  color: white;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  padding: 10px 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 1em;
`;
