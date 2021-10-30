import React from "react";
import styled from "styled-components";

const Progress = () => {
  return (
    <ProgressContainer>
      <LeftSideContainer>
        <UpperContainer>
          <div className="taskprogress">
            <h4>Progress:</h4>
          </div>
          <div className="todo">
            <h4>To-do</h4>
          </div>
          <div className="inprogress">
            <h4>In Progress</h4>
          </div>
          <div className="underreview">
            <h4>Under Review</h4>
          </div>
          <div className="missing">
            <h4>Missing</h4>
          </div>
          <div className="done">
            <h4>Done</h4>
          </div>
        </UpperContainer>
        <TasksContainer>
          <div className="taskscontainer">
            <table>
              <th></th>
              <td></td>
            </table>
          </div>
        </TasksContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <AboutContainer>
          <h3>ABOUT</h3>
        </AboutContainer>
        <ToDoContainer>
          <h3>TO-DO</h3>
        </ToDoContainer>
      </RightSideContainer>
    </ProgressContainer>
  );
};

const ProgressContainer = styled.div`
  display: flex;
  margin: 20px 50px;
`;

const LeftSideContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 55px;
`;

const UpperContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 20px;
  height: 130px;
  h4 {
    font-weight: normal;
    font-size: 18px;
    padding: 0 1em;
  }
  .taskprogress {
    background-color: #f2f2f2;
    width: 350px;
    border-radius: 10px;
    h4 {
      color: #0f482f;
    }
  }
  .todo,
  .inprogress,
  .underreview,
  .missing,
  .done {
    background-color: #f2f2f2;
    width: 150px;
    align-items: center;
    text-align: center;
    border-radius: 10px;
    margin-left: 5px;
    h4 {
      color: #164aae;
    }
  }
  .todo {
    margin-left: 45px;
  }
  .inprogress {
    h4 {
      color: #ae5f16;
    }
  }
  .underreview {
    h4 {
      color: #ae1696;
    }
  }
  .missing {
    h4 {
      color: #9b1313;
    }
  }
  .done {
    h4 {
      color: #0e5937;
    }
  }
`;

const TasksContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 30px;
  margin-bottom: 10px;
  width: 100%;
  .taskscontainer {
    background-color: #f2f2f2;
    border-radius: 10px;
    width: 100%;
    min-width: 500px;
    height: 645px;
    overflow-y: scroll;
  }
  table {
    position: absolute;
    display: flex;
    flex-direction: row;
    margin-left: 0.7em;
  }
  th {
    width: 100%;
    padding: 3.5em;
    margin: 0 35.21em;
  }
  td {
    border-bottom: 1px solid black;
    width: 100%;
    height: 130px;
    position: absolute;
    padding: 3em 2em;
  }
`;

const RightSideContainer = styled.div`
  display: flex;
  position: sticky;
  width: 24%;
  min-width: 400px;
  gap: 20px;
  flex-direction: column;
  margin-left: 60px;
  margin-right: 40px;
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
