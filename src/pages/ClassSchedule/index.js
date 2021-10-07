import React from "react";
import styled from "styled-components";
import LeftSideBar from "./LeftSideBar";
import ScheduleContainer from "./ScheduleContainer";

const ClassSched = () => {
  return (
    <ClassSchedContainer>
      <LeftSideBar />
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

export default ClassSched;
