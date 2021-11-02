import React, { useState } from "react";
import styled from "styled-components";

import Modal from "components/Modal";
import AssignTaskForm from "pages/Student/GroupActivity/Forms/AssignTaskForm";

const Progress = () => {
  const [showAssignTaskModal, setShowAssignTaskModal] = useState(false);

  return (
    <ProgressContainer>
      <LeftSideContainer>
        <UpperContainer>
          <div className="taskprogress">
            <h4>Progress:</h4>
          </div>
          <div className="todo">
            <h4>To-do</h4>
            <h5>5</h5>
          </div>
          <div className="inprogress">
            <h4>In Progress</h4>
            <h5>5</h5>
          </div>
          <div className="underreview">
            <h4>Under Review</h4>
            <h5>5</h5>
          </div>
          <div className="missing">
            <h4>Missing</h4>
            <h5>5</h5>
          </div>
          <div className="done">
            <h4>Done</h4>
            <h5>5</h5>
          </div>
        </UpperContainer>
        <TasksContainer>
          <Container>
            <Content>
              <h1>Chapter 3</h1>
              <span>Assigned to:</span>
            </Content>
          </Container>
        </TasksContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <AboutContainer>
          <h3>ABOUT</h3>
        </AboutContainer>
        <ToDoContainer>
          <h3>TO-DO</h3>
        </ToDoContainer>
        <button onClick={() => setShowAssignTaskModal(true)}>
          Assign Task
        </button>
      </RightSideContainer>
      <Modal
        show={showAssignTaskModal}
        closeModal={() => setShowAssignTaskModal(false)}
        title="Assign Task"
      >
        <AssignTaskForm
          onCreateFinish={() => {
            setShowAssignTaskModal(false);
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
    > h4 {
      color: #0f482f;
      margin-left: 1em;
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

export default Progress;
