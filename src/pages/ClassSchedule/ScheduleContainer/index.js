import React from "react";
import styled from "styled-components";
import { FaPenSquare } from "react-icons/fa";

const ScheduleContainer = () => {
    return(
        <SchedContainer>
            <SchedItem>
                <h3>
                   Class Schedule 
                   <button id = "pendropdown">
                       <FaPenSquare size = {20}/>
                   </button> 
                </h3>
                <PenDropdown>
                   <ul>
                     <li>Add New</li>
                     <li>Edit Schedule</li>
                     <li>Delete Schedule</li>
                   </ul>
                </PenDropdown>
            </SchedItem>
            <Line />
            <SchedTable>
            <table>
              <colgroup>
                <thead>
                    <tr>
                        <th class = "index"> </th>
                        <th class = "firstcol">Subject Code</th>
                        <th class = "secondcol">Subject Name</th>
                        <th class = "thirdcol">Faculty</th>
                        <th class = "forthcol">Schedule</th>
                    </tr>
                </thead>
              </colgroup>
            </table>
            </SchedTable>
        </SchedContainer>
    );
};

    const SchedContainer = styled.div`
      display: flex;
      position: sticky;
      top: 120px;
      background-color: #f2f2f2;
      width: 72%;
      border-radius: 10px;
      flex-direction: column;
      height: max-content;
    `;

    const SchedItem = styled.div`
    display: flex;
    flex-direction: column;
    padding: 1em;
    h3 {
        color: #646464;
        text-align: left;
        font-size: 1.55vw;
        display: flex;
        margin: 0 10px;
        margin-bottom: 3px;
        font-weight: normal;
        button {
          justify-content: flex-end;
          margin-left: auto;
          padding: 0;
          color: #0E5937;
          cursor: pointer;
          border: none;
        }
      }
    `;
    
     const PenDropdown = styled.div`
     display: inline;
     background-color: #0E5937;
     color: white;
     border-radius: 10px;
     width: 15%; 
     position: absolute;
     top: 3em;
     right:1.50em;
     margin: auto;
     ul
     {
     font-size: 0.95vw;
     font-weight: normal;
     list-style-type: none;
     }
   `;

    const Line = styled.hr`
    display: flex;
    margin: 5px;
    `;

    const SchedTable = styled.div`
    margin: 1em;
    table{
      width: auto;
      border: 1px solid #70AC47;
      border-spacing: 0;
      display: flex;
      border-bottom: 1px solid #70AC47;
    }
    td
    {
      background-color: white;
      color: black;
    }
    th
    {
      background-color: #70AC47;
      color: white;
      font-weight: normal;
      font-size: 0.92vw;
      text-align: center;
      padding: 0.2em;
    }
    th, 
    td
    {
      text-align: center;
    }
    .index
    {
      width: 60px;
    }
    .firstcol
    {
      width: 200px;
    }
    .secondcol
    {
      width: 320px;
    }
    .thirdcol
    {
      width: 290px;
    }
    .forthcol
    {
      width: 600px;
    }
    `;

export default ScheduleContainer;