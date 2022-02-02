import React, { useState } from "react";
import styled from "styled-components";
import { FaCircle, FaPlusCircle } from "react-icons/fa";
import dayjs from "dayjs";
import AddAgenda from "./Forms/AddAgenda";
import Modal from "components/Modal";
import { NavLink } from "react-router-dom";

const Calendar = () => {
  const [showAgendaModal, setShowAgendaModal] = useState(false);
  var today = new Date(),
    date = dayjs(today).format("MMMM D, YYYY");
  console.log(date);

  return (
    <CalendarContainer>
      <CalendarHeader>
        <h3>TO-DO List</h3>
      </CalendarHeader>
      <CalendarCard>
        <UpperContainer>
          <p className="Today">
            <i> Today is </i>
          </p>
          <p className="CurrentDate"> {date} </p>
          <button
            className="AddAgenda"
            onClick={() => setShowAgendaModal(true)}
          >
            Add Agenda <FaPlusCircle size={18} className="agendaicon" />
          </button>
        </UpperContainer>
        <LeftContainer>
          <ul>
            <li>
              <i>
                {" "}
                <FaCircle className="c1" /> To-do
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle className="c2" /> In Progress
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle className="c3" /> Under Review
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle className="c4" /> Done
              </i>
            </li>
            <li>
              <i>
                {" "}
                <FaCircle className="c5" /> Missing
              </i>
            </li>
          </ul>
        </LeftContainer>
        <AgendaContainer>
          <NavBar>
            <NavMenu to={`/calendar`}>Individual Activities</NavMenu>
            <NavMenu to={`/calendar`}>Group Activities</NavMenu>
            <NavMenu to={`/calendar`}>Group Activity Tasks</NavMenu>
            <NavMenu to={`/calendar`}>Set Tasks</NavMenu>
          </NavBar>
        </AgendaContainer>
      </CalendarCard>
      <Modal
        show={showAgendaModal}
        closeModal={() => setShowAgendaModal(false)}
        title="Add Agenda"
      >
        <AddAgenda
          onCreateFinish={() => {
            setShowAgendaModal(false);
          }}
        />
      </Modal>
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
  position: absolute;
  top: 120px;
  width: 95%;
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
  height: 50px;
  top: 0%;
  .agendaicon {
    padding-left: 10px;
    width: 24px;
  }
  .AddAgenda {
    right: 0;
    margin-left: auto;
    position: absolute;
    font-size: 16px;
    margin-top: 7em;
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
    cursor: pointer;
  }
  .Today {
    position: absolute;
    left: 50%;
    font-size: 24px;
    margin-top: 4.01em;
  }
  .CurrentDate {
    position: absolute;
    left: 47.5%;
    font-size: 26px;
    margin-top: 4.98em;
    color: #0e5937;
    font-weight: bold;
  }
`;

const LeftContainer = styled.div`
  display: flex;
  width: 20%;
  flex-direction: column;
  margin-top: 10em;
  ul {
    margin-top: 15%;
    list-style-type: none;
  }
  li {
    margin-top: 5%;
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

const AgendaContainer = styled.div`
  display: inline;
  position: absolute;
  width: 82.5%;
  flex-direction: column;
  float: right;
  margin-top: 14em;
  background-color: #f2f2f2;
  margin-left: 320px;
  margin-right: auto;
  height: 550px;
  overflow-y: scroll;
  padding: 40px;
  border-radius: 10px;
`;

const NavBar = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 10px;
`;

const NavMenu = styled(NavLink)`
  color: #0f482f;
  cursor: pointer;
  font-size: 18px;
  align-items: center;
  text-decoration: none;
  padding: 7px 1em;
  margin: 0 10px;
  border: 1px solid #0f482f;
  &:hover,
  &.active {
    color: white;
    background-color: #0f482f;
    border-radius: 5px;
  }
`;

export default Calendar;
