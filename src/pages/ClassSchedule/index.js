import React from "react";
import styled from "styled-components";
import LeftSideBar from "./LeftSideBar";
import ScheduleContainer from "./ScheduleContainer";

const ClassSched = () => {
  return (
    <ClassSchedContainer>
      <LeftSideBar />
      <ClassDiv />
      <ScheduleContainer />
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
  width: 3em;
  height: 20em;
  background-color: white;
  border-radius: 10px;
`;

export default ClassSched;
