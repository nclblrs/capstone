import React from "react";
import styled from "styled-components";
import LeftSideBar from "./LeftSideBar";

const ClassSched = () => {
  return (
    <ClassSchedContainer>
      <LeftSideBar />
      <ClassDiv />
    </ClassSchedContainer>
  );
};
const ClassSchedContainer = styled.div`
  margin-top: 10px;
  display: flex;
  position: sticky;
  width: 100%;
`;

const ClassDiv = styled.div`
  width: 100em;
  height: 20em;
  background-color: white;
  border-radius: 10px;
  margin: 1em;
`;

export default ClassSched;
