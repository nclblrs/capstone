import React from "react";
import styled from "styled-components";
import { FaCircle } from "react-icons/fa";


const Calendar = () => {
  var today = new Date(),
    date =
      parseInt(today.getMonth() + 1) +
      " " +
      today.getDate() +
      " " +
      today.getFullYear();
  console.log(date);

  return (

    <CalendarContainer>
      <CalendarCard>
        <CalendarHeader>
          <h3>
            Calendar
          </h3>
        </CalendarHeader>
        <UpperContainer>
          <p class = "Today"><i> Today is </i></p>
          <p class = "CurrentDate"> {date} </p>
          <button class="AddAgenda">
            Add Agenda
          </button>
        </UpperContainer>
        <LeftContainer>
          <ul>
            <li><i> <FaCircle class = "c1"/> To-do</i></li>
            <li><i> <FaCircle class = "c2"/> In Progress</i></li>
            <li><i> <FaCircle class = "c3"/> Under Review</i></li>
            <li><i> <FaCircle class = "c4"/> Done</i></li>
            <li><i> <FaCircle class = "c5"/> Missing</i></li>
            <li><i> <FaCircle class = "c6"/> Priority</i></li>
          </ul>

        </LeftContainer>
      </CalendarCard>
    </CalendarContainer>

  );
};

const CalendarContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 2em;
`;

const CalendarCard = styled.div`
      display: flex;
      position: sticky;
      top: 120px;
      background-color: #f2f2f2;
      width: 100%;
      border-radius: 5px;
      height: max-content;
      button
      {
         background-color: #0e5937;
         color: white;
         border: none;
         width: 150px;
         height: 44px;
         cursor: pointer;
      }
`;

const CalendarHeader = styled.div`
      display: flex;
      position: sticky;
      top: 120px;
      background-color: #0E5937;
      width: 100%;
      border-radius: 5px;
      flex-direction: row;
      height: 5%;
      top: 120px;
      h3{
        font-size: 1.25vw;
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
       .AddAgenda{
         right: 0;
         margin-left: auto;
         position: absolute;
         display: inline;
         font-size: 1vw;
         margin-top: 5em; 
       }
       .Today {
         position: absolute;
         left: 50%;
         font-size: 1.25vw; 
         margin-top: 4.01em;    
       }
       .CurrentDate {
         position: absolute;
         left: 50%;
         font-size: 1.40vw;  
         margin-top: 4.98em;
         color: #0E5937;
         font-weight: bold;
       }
;`

const LeftContainer = styled.div`
       display: inline;
       position: absolute;
       width: 100%;
       flex-direction: column;
       float: right;
       margin-top: 10em;
       ul{
        margin-top: 1%;
        list-style-type: none;
       }
       li{
         margin-top: 0.80%;
         font-size: 1.10vw;
       }
       .c1
       {
         color: #164AAE;
       }
       .c2
       {
         color: #AE5F16;
       }
       .c3
       {
         color: #AE1696;
       }
       .c4
       {
         color: #0E5937;
       }
       .c5
       {
         color: #9B1313;
       }
       .c6
       {
         color: #E7B22A;
       }

`;


export default Calendar;