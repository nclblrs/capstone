import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Modal from "components/Modal";
import { Link } from "react-router-dom";
import { GET_TEACHERCLASSES } from "./gql";
import { useQuery } from "@apollo/client";
import { FaFilter } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Dropdown, { DropdownButtons } from "components/Dropdown";
import CreateCourseForm from "pages/Teacher/Course/Forms/CreateCourseForm";

const TeacherAllClass = () => {
  const { loading, data } = useQuery(GET_TEACHERCLASSES);
  const [showCreateCourseModal, setShowCreateCourseModal] = useState(false);

  return (
    <PageContainer>
      <Modal
        show={showCreateCourseModal}
        closeModal={() => setShowCreateCourseModal(false)}
        title="Create Course"
      >
        <CreateCourseForm />
      </Modal>
      <MainContainer>
        <ButtonContainer>
          <Dropdown
            popperComponent={
              <DropdownButtons>
                <button>Class Name</button>
                <button>Section</button>
              </DropdownButtons>
            }
          >
            <button className="sortbutton">
              Sort By &nbsp;
              <FaFilter size={18} className="filtericon" />
            </button>
          </Dropdown>
          <button
            className="createclass"
            onClick={() => setShowCreateCourseModal(true)}
          >
            Create Class &nbsp;
            <IoIosAddCircle size={20} className="createicon" />
          </button>
        </ButtonContainer>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.teacherCourses?.data?.map(
                ({ id, name, yearAndSection, studentCount }) => (
                  <Link className="items" key={id} to={`/course/${id}`}>
                    <h1>{name}</h1>
                    <p>Year and Section: {yearAndSection}</p>
                    <p> {studentCount + 1} members</p>
                  </Link>
                )
              )}
        </div>
      </MainContainer>
      <button className="showinactive">Show Inactive</button>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  .showinactive {
    margin-left: auto;
    margin-top: 15px;
    margin-right: 57px;
    border: none;
    color: white;
    background-color: #0e5937;
    width: 150px;
    height: 50px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
    }
  }
`;

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 1em;
  margin-right: auto;
  margin-left: 390px;

  .itemcontainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 25px;
    margin-top: 40px;
    li {
      padding: 10px 8px;
    }
  }
  .items {
    border-radius: 1em;
    flex-direction: column;
    display: flex;
    padding: 2em;
    width: 345px;
    background-color: #f2f2f2;
    height: max-content;
    margin-bottom: 10px;
    text-decoration: none;

    :hover {
      background-color: #e8e8e8;
    }
    > p {
      color: #646464;
      font-size: 20px;
      margin: 10px 0;
    }
    h1 {
      font-weight: bold;
      color: #0f482f;
      font-size: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  button {
    justify-content: center;
    border: none;
    color: white;
    width: 150px;
    height: 50px;
    font-size: 18px;
    cursor: pointer;
  }
  .createclass {
    margin-right: auto;
    margin-left: 15px;
    background-color: #0e5937;
    width: 170px;
    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
    }
    .createicon {
      padding-top: 0.3em;
    }
  }
  .sortbutton {
    margin-right: 22px;
    background-color: #0e5937;
    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
    }
    .filtericon {
      padding-top: 0.3em;
    }
  }
`;

export default TeacherAllClass;
