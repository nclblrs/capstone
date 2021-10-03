import React from "react";
import styled from "styled-components";

const ProgressPage = () => {
  return (
    <ProgressContainer>
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
  justify-content: center;
  margin: 0 50px;
`;

const RightSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 400px;
  height: 100px;
  gap: 20px;
  flex-direction: column;
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
  height: 320px;
  border-radius: 10px;
  padding: 2em;
`;

const ToDoContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  border-radius: 10px;
  padding: 2em;
`;

export default ProgressPage;
