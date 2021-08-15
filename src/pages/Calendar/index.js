import React from "react";
import styled from "styled-components";

const Calendar = () => {
  return (
    <CalendarContainer>
      <CalendarDiv />
    </CalendarContainer>
  );
};
const CalendarContainer = styled.div`
  margin-top: 10px;
  display: flex;
  position: sticky;
  width: 100%;
`;

const CalendarDiv = styled.div`
  width: 100em;
  height: 20em;
  background-color: white;
  border-radius: 10px;
  margin: 1em;
`;

export default Calendar;
