import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_COURSES } from "./gql";
import { FaPlusCircle, FaLaptop, FaRegLightbulb } from "react-icons/fa";
import { BiDotsHorizontalRounded, BiChevronDown } from "react-icons/bi";
import { useState } from "react";
import Modal from "components/Modal";
import CreateActivityForm from "pages/Teacher/Course/Forms/CreateActivityForm";
import CreateCourseForm from "pages/Teacher/Course/Forms/CreateCourseForm";
import Dropdown, { DropdownButtons } from "components/Dropdown";

const RightSideBar = () => {
  const { loading, data } = useQuery(GET_COURSES);
  const courses = data?.teacherCourses?.data ?? [];
  const [showCreateActivityModal, setShowCreateActivityModal] = useState(false);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  var today = new Date(),
    date =
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "-" +
      today.getFullYear();
  console.log(date);

  return (
    <RSideContainer>
      <RSideReminder>
        <RSideItem>
          <h4>REMINDER</h4>
          <p>
            Today's Agenda
            <br />
            Current Date : {date}
          </p>
          <RSideLinks>
            <p title="Synchronous Meeting - Computer Programming 1">
              <FaRegLightbulb size={18} /> &nbsp; Synchronous Meeting - Computer
              Programming 1
            </p>
          </RSideLinks>
          <RSideLinks>
            <p title="Assessment 10 - Mathematics in the Modern World">
              <FaRegLightbulb size={18} /> &nbsp; Assessment 10 - Mathematics in
              the Modern World
            </p>
          </RSideLinks>
          <RSideLinks>
            <p title="Chapter 1-3 - Introduction to Computing">
              <FaRegLightbulb size={18} /> &nbsp; Chapter 1-3 - Introduction to
              Computing
            </p>
          </RSideLinks>
          <RSideLinks>
            <p title="Introduction - Group 1 - Introduction to Computing">
              <FaRegLightbulb size={18} /> &nbsp; Introduction - Group 1 -
              Introduction to Computing
            </p>
          </RSideLinks>
          <RSideLinks>
            <p>
              <BiDotsHorizontalRounded size={18} /> See More
            </p>
          </RSideLinks>
          <ButtonContainer>
            <button>
              Add Agenda &nbsp;
              <FaPlusCircle size={18} />
            </button>
          </ButtonContainer>
        </RSideItem>
      </RSideReminder>
      <RSideClasses>
        <Modal
          show={showCreateActivityModal}
          closeModal={() => setShowCreateActivityModal(false)}
          title="Create Activity"
        >
          <CreateActivityForm />
        </Modal>
        <Modal
          show={showCreateCourseModal}
          closeModal={() => setShowCreateCourseModal(false)}
          title="Create Course"
        >
          <CreateCourseForm />
        </Modal>
        <RSideItem>
          <h4>
            CLASSES
            <button>
              <Dropdown
                popperComponent={
                  <DropdownButtons>
                    <button onClick={() => setShowCreateActivityModal(true)}>
                      Activity
                    </button>
                    <button onClick={() => setShowCreateCourseModal(true)}>
                      Course
                    </button>
                    <button>Quiz</button>
                  </DropdownButtons>
                }
              >
                <button className="Create">
                  Create &nbsp; <BiChevronDown size={18} />
                </button>
              </Dropdown>
            </button>
          </h4>
        </RSideItem>
        <RSideItem>
          {loading
            ? "Loading..."
            : courses.map(({ id, yearAndSection, name }) => (
                <RSideLinks key={id} to={`/course/${id}`}>
                  <FaLaptop size={18} />
                  <p title={yearAndSection}>
                    {yearAndSection} {name}
                  </p>
                </RSideLinks>
              ))}
          {courses?.length === 5 && (
            <RSideLinks to="/classes">
              <BiDotsHorizontalRounded size={18} />
              See More
            </RSideLinks>
          )}
        </RSideItem>
      </RSideClasses>
    </RSideContainer>
  );
};

const RSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 21%;
  height: 100px;
  gap: 20px;
  flex-direction: column;
  border-radius: 10px;
  margin-left: auto;
  margin-right: 55px;
  margin-top: 20px;
`;

const RSideReminder = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: max-content;
  border-radius: 10px;
  padding: 2em;
`;

const RSideClasses = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: max-content;
  border-radius: 10px;
  padding: 1.7em 2em 1.7em 2em;
  button {
    display: flex;
    font-size: 16px;
    justify-content: center;
    margin-left: auto;
    padding: 0;
    border: none;
    background: none;
    cursor: pointer;
    align-items: center;
    color: white;
  }
  .Create {
    background-color: #0e5937;
    width: 120px;
    height: 33px;
  }
`;

const RSideItem = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    margin: 0;
    margin-bottom: 20px;
    display: flex;
    font-weight: normal;
    img {
      margin-left: 10px;
      width: 16px;
    }
  }
  p {
    font-size: 16px;
    margin: 0;
    margin-bottom: 30px;
  }
`;

const RSideLinks = styled(Link)`
  color: #0f482f;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  text-decoration: none;
  img {
    width: 20px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 18px;
  }
`;

const ButtonContainer = styled.div`
  button {
    display: flex;
    width: 150px;
    height: 33px;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
    }
  }
`;

export default RightSideBar;
