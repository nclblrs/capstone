import React from "react";
import { Link } from "react-router-dom";
import { GET_STUDLEFTSIDEBAR } from "./gql";
import { useQuery } from "@apollo/client";
import styled from "styled-components";
import { FaPenSquare, FaPlusCircle, FaLaptop } from "react-icons/fa";
import { BiDotsHorizontalRounded } from "react-icons/bi";
import EditSchedForm from "./EditSchedForm";
import AddNewSchedForm from "./AddNewSchedForm";
import { useState } from "react";
import Modal from "components/Modal";
import JoinClassForm from "pages/Course/CourseForms/JoinClassForm";

import Dropdown, { DropdownButtons } from "components/Dropdown";

const ScheduleContainer = () => {
  const { loading, data } = useQuery(GET_STUDLEFTSIDEBAR);
  const [showEditSchedModal, setShowEditSchedModal] = useState(false);
  const [showAddNewSchedModal, setShowAddNewSchedModal] = useState(false);
  const courses = data?.studentLeftSidePanel?.courses ?? [];
  const [showJoinClassModal, setShowJoinClassModal] = useState(false);

  return (
    <ClassSchedContainer>
      <Modal
        show={showEditSchedModal}
        closeModal={() => setShowEditSchedModal(false)}
        title="Edit Schedule"
      >
        <EditSchedForm />
      </Modal>
      <Modal
        show={showAddNewSchedModal}
        closeModal={() => setShowAddNewSchedModal(false)}
        title="Add New"
      >
        <AddNewSchedForm />
      </Modal>
      <Modal
        show={showJoinClassModal}
        closeModal={() => setShowJoinClassModal(false)}
        title="Join Class"
      >
        <JoinClassForm />
      </Modal>
      <LSideContainer>
        <LSideItem>
          <h4>
            CLASSES
            <button onClick={() => setShowJoinClassModal(true)}>
              <FaPlusCircle size={20} />
            </button>
          </h4>
          {loading
            ? "Loading..."
            : courses.map(({ id, name }) => (
                <LSideLinks key={id} to={`/class/${id}`}>
                  <FaLaptop size={18} />
                  <p title={name}>{name}</p>
                </LSideLinks>
              ))}
          {courses?.length === 3 && (
            <LSideLinks to="/classes">
              <BiDotsHorizontalRounded size={18} />
              See More
            </LSideLinks>
          )}
        </LSideItem>
      </LSideContainer>
      <SchedContainer>
        <UpperContainer>
          <h3>
            Class Schedule
            <button>
              <Dropdown
                popperComponent={
                  <DropdownButtons>
                    <button onClick={() => setShowAddNewSchedModal(true)}>
                      Add New
                    </button>
                    <button onClick={() => setShowEditSchedModal(true)}>
                      Edit Schedule
                    </button>
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
                  <th class="thirdcol">Faculty</th>
                  <th class="forthcol">Schedule</th>
                </tr>
              </thead>
            </colgroup>
          </table>
        </SchedTable>
      </SchedContainer>
    </ClassSchedContainer>
  );
};

const ClassSchedContainer = styled.div`
  margin-top: 10px;
  display: flex;
  position: sticky;
  width: 100%;
`;

const LSideContainer = styled.div`
  display: flex;
  margin-top: 10px;
  background-color: #f2f2f2;
  width: 17%;
  min-width: 200px;
  border-radius: 10px;
  flex-direction: column;
  height: max-content;
  margin-left: 3em;
`;

const LSideItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
  h4 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
    font-weight: normal;
    button {
      justify-content: flex-end;
      margin-left: auto;
      padding: 0;
      border: none;
      color: #0e5937;
      cursor: pointer;
    }
  }
`;

const LSideLinks = styled(Link)`
  color: #003249;
  font-size: 18px;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 18px;
  margin: 10px 15px;
  text-decoration: none;
  .bulb {
    color: #0e5937;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`;

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
  z-index: -5;
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

export default ScheduleContainer;
