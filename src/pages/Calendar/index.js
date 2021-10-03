import React from "react";
import styled from "styled-components";
import { FaCircle, FaPlusCircle } from "react-icons/fa";

const Calendar = () => {
  var today = new Date(),
    date =
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "-" +
      today.getFullYear();
  console.log(date);

  return (
    <CalendarContainer>
      <CalendarCard>
        <CalendarHeader>
          <h3>Calendar</h3>
        </CalendarHeader>
        <UpperContainer>
          <p class="Today">
            <i> Today is </i>
          </p>
          <p class="CurrentDate"> {date} </p>
          <button class="AddAgenda">
            Add Agenda <FaPlusCircle size={18} class="agendaicon" />
          </button>
        </UpperContainer>
        <LeftContainer>
          <ul>
            <li>
              <i>
                {" "}
                <FaCircle class="c1" /> To-do
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle class="c2" /> In Progress
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle class="c3" /> Under Review
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle class="c4" /> Done
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle class="c5" /> Missing
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle class="c6" /> Priority
              </i>
            </li>
          </ul>
        </LeftContainer>
      </CalendarCard>
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 3em;
  margin-top: 20px;
`;

const CalendarCard = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
  width: 100%;
  min-width: 500px;
  border-radius: 5px;
  height: max-content;
  button {
    display: flex;
    width: 150px;
    height: 44px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
  }
`;

const CalendarHeader = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #0e5937;
  width: 100%;
  border-radius: 5px;
  flex-direction: row;
  height: 5%;
  top: 120px;
  h3 {
    font-size: 24px;
    color: white;
    font-weight: normal;
    margin: 1%;
  }
`;

const UpperContainer = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  width: 100%;
  .agendaicon {
    padding-left: 10px;
    width: 24px;
  }
  .AddAgenda {
    right: 0;
    margin-left: auto;
    position: absolute;
    font-size: 16px;
    margin-top: 5em;
  }
  .Today {
    position: absolute;
    left: 50%;
    font-size: 24px;
    margin-top: 4.01em;
  }
  .CurrentDate {
    position: absolute;
    left: 50%;
    font-size: 26px;
    margin-top: 4.98em;
    color: #0e5937;
    font-weight: bold;
  }
`;

const LeftContainer = styled.div`
  display: inline;
  position: absolute;
  width: 100%;
  flex-direction: column;
  float: right;
  margin-top: 10em;
  ul {
    margin-top: 4%;
    list-style-type: none;
  }
  li {
    margin-top: 0.8%;
    font-size: 20px;
  }
  .c1 {
    color: #164aae;
  }
  .c2 {
    color: #ae5f16;
  }
  .c3 {
    color: #ae1696;
  }
  .c4 {
    color: #0e5937;
  }
  .c5 {
    color: #9b1313;
  }
  .c6 {
    color: #e7b22a;
  }
`;

export default Calendar;
