import React from "react";
import styled from "styled-components";
import { FaPenSquare } from "react-icons/fa";
import Dropdown, { DropdownButtons } from "components/Dropdown";

const TeacherSchedule = () => {
  return (
    <TeacherSchedContainer>
      <UpperContainer>
        <h3>
          Class Schedule
          <button>
            <Dropdown
              popperComponent={
                <DropdownButtons>
                  <button>Add New</button>
                  <button>Edit Schedule</button>
                  <button>Delete Schedule</button>
                </DropdownButtons>
              }
            >
              <FaPenSquare size={20} color="#0e5937" class="pen" />
            </Dropdown>
          </button>
        </h3>
      </UpperContainer>

      <Line />
      <SchedTable>
        <table>
          <colgroup>
            <thead>
              <tr>
                <th class="index"> </th>
                <th class="firstcol">Subject Code</th>
                <th class="secondcol">Subject Name</th>
                <th class="thirdcol">Course, Year and Section</th>
                <th class="forthcol">Schedule</th>
              </tr>
            </thead>
          </colgroup>
        </table>+
      </SchedTable>
    </TeacherSchedContainer>
  );
};

const TeacherSchedContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: sticky;
  margin-top: 20px;
  background-color: #f2f2f2;
  width: 76%;
  min-width: 700px;
  border-radius: 10px;
  height: max-content;
  margin-left: auto;
  margin-right: 57px;
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
  flex-wrap: wrap;
  flex-direction: column;
  width: 100%;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 26px;
    margin-left: 15px;
    display: flex;
    margin-left: 1em;
    margin-top: 20px;
    margin-bottom: 3px;
    font-weight: normal;
  }
  button {
    justify-content: center;
    margin-right: 15px;
    margin-left: auto;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    text-align: center;
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

export default TeacherSchedule;
