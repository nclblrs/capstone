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
              <td>Chapter 1 (Test)</td>
            </table>
          </div>
        </TasksContainer>
      </LeftSideContainer>
      <RightSideContainer>
        <AboutContainer>
          <h3>ABOUT</h3>
          <div className="dropdownbutton">
            <select>
              <option value="Progress" selected disabled>
                Progress
              </option>
              <option value="MyProgress">My Progress</option>
              <option value="GroupProgress">Group Progress</option>
            </select>
          </div>
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
    margin-left: 20px;
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
  .taskscontainer {
    background-color: #f2f2f2;
    width: 100%;
    border-radius: 10px;
    height: 645px;
    overflow-y: scroll;
  }
  table {
    width: auto;
    border-bottom: 1px solid black;
    position: absolute;
    display: flex;
    flex-direction: row;
  }
  th {
    width: auto;
    padding: 3.5em;
    margin: 0 35.21em;
  }
  td {
    position: absolute;
    padding: 2em;
  }
`;

const RightSideContainer = styled.div`
  display: flex;
  position: sticky;
  width: 400px;
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
  .dropdownbutton {
    border: none;
    position: absolute;
    right: 2em;
    margin-left: auto;
  }
  button,
  select {
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
