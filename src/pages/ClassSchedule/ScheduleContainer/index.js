import React from "react";
import styled from "styled-components";
import { FaPenSquare } from "react-icons/fa";

import Dropdown, { DropdownButtons } from "components/Dropdown";

const ScheduleContainer = () => {
  return (
    <SchedContainer>
      <Dropdown
        popperComponent={
          <DropdownButtons>
            <ul>
              <li>Add New</li>
              <li>Edit Schedule</li>
              <li>Delete Schedule</li>
            </ul>
          </DropdownButtons>
        }
      >
        <UpperContainer>
          <h3>Class Schedule</h3>
          <button>
            <FaPenSquare size={20} color="#0e5937" class="pen" />
          </button>
        </UpperContainer>
      </Dropdown>

      <Line />
      <SchedTable>
        <table>
          <colgroup>
            <thead>
              <tr>
                <th class="index"> </th>
                <th class="firstcol">Subject Code</th>
                <th class="secondcol">Subject Name</th>
                <th class="thirdcol">Faculty</th>
                <th class="forthcol">Schedule</th>
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
  flex-direction: column;
  position: sticky;
  margin-top: 10px;
  background-color: #f2f2f2;
  width: 80%;
  min-width: 250px;
  border-radius: 10px;
  height: max-content;
  margin-right: 3em;
  margin-left: 2.5em;
  ul {
    color: white;
    font-size: 18px;
    font-weight: normal;
    list-style-type: none;
    cursor: pointer;
    padding: 0 1em;
  }
  li {
    padding: 8px 8px;
    text-align: center;
  }
  li:hover {
    background-color: #0f482f;
    color: white;
    border-radius: 5px;
  }
`;

const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 26px;
    margin-left: 15px;
    margin-top: 20px;
    margin-bottom: 3px;
    font-weight: normal;
  }
  button {
    border: none;
    position: absolute;
    right: 0;
    margin-left: auto;
    padding: 25px 15px;
    cursor: pointer;
  }
`;

const Line = styled.hr`
  display: flex;
  margin: 20px 5px;
`;

const SchedTable = styled.div`
  margin: 1em;
  table {
    width: auto;
    border: 1px solid #70ac47;
    border-spacing: 0;
    display: flex;
    border-bottom: 1px solid #70ac47;
  }
  td {
    background-color: white;
    color: black;
  }
  th {
    background-color: #70ac47;
    color: white;
    font-weight: normal;
    font-size: 18px;
    text-align: center;
    padding: 0.2em;
  }
  th,
  td {
    text-align: center;
  }
  .index {
    width: 60px;
  }
  .firstcol {
    width: 200px;
  }
  .secondcol {
    width: 320px;
  }
  .thirdcol {
    width: 290px;
  }
  .forthcol {
    width: 600px;
  }
`;

export default ScheduleContainer;
