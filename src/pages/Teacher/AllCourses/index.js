import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { GET_TEACHERCLASSES } from "./gql";
import { useQuery } from "@apollo/client";
import { FaFilter } from "react-icons/fa";
import { IoIosAddCircle } from "react-icons/io";
import Dropdown, { DropdownButtons } from "components/Dropdown";

const TeacherAllClass = () => {
  const { loading, data } = useQuery(GET_TEACHERCLASSES);

  return (
    <PageContainer>
      <ButtonContainer>
        <Dropdown
          popperComponent={
            <DropdownButtons>
              <button>Class Name</button>
              <button>Year and Section</button>
            </DropdownButtons>
          }
        >
          <div className="sortbutton">
            <button>
              {" "}
              Sort By
              <FaFilter size={15} className="filtericon" />
            </button>
          </div>
        </Dropdown>
        <div className="CreatClassButton">
          <button className="CreateClass">
            Create Class
            <IoIosAddCircle size={15} className="AddIcon" />
          </button>
        </div>
      </ButtonContainer>
      <MainContainer>
        <div className="buttoncontainer">
          <button>Show Inactive</button>
        </div>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.teacherCourses?.data?.map(
                ({ id, name, yearAndSection, teacher, studentCount }) => (
                  <Link className="items" key={id} to={`/class/${id}`}>
                    <h1>{name}</h1>
                    <p>Year and Section: {yearAndSection}</p>
                    <p> {studentCount + 1} members</p>
                  </Link>
                )
              )}
        </div>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.teacherCourses?.data?.map(
                ({ id, name, yearAndSection, teacher, studentCount }) => (
                  <Link className="items" key={id} to={`/class/${id}`}>
                    <h1>{name}</h1>
                    <p>Year and Section: {yearAndSection}</p>
                    <p> {studentCount + 1} members</p>
                  </Link>
                )
              )}
        </div>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.teacherCourses?.data?.map(
                ({ id, name, yearAndSection, teacher, studentCount }) => (
                  <Link className="items" key={id} to={`/class/${id}`}>
                    <h1>{name}</h1>
                    <p>Year and Section: {yearAndSection}</p>
                    <p> {studentCount + 1} members</p>
                  </Link>
                )
              )}
        </div>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.teacherCourses?.data?.map(
                ({ id, name, yearAndSection, teacher, studentCount }) => (
                  <Link className="items" key={id} to={`/class/${id}`}>
                    <h1>{name}</h1>
                    <p>Year and Section: {yearAndSection}</p>
                    <p> {studentCount + 1} members</p>
                  </Link>
                )
              )}
        </div>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.teacherCourses?.data?.map(
                ({ id, name, yearAndSection, teacher, studentCount }) => (
                  <Link className="items" key={id} to={`/class/${id}`}>
                    <h1>{name}</h1>
                    <p>Year and Section: {yearAndSection}</p>
                    <p> {studentCount + 1} members</p>
                  </Link>
                )
              )}
        </div>
      </MainContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 75%;
  height: 100%;
  justify-content: center;

  button {
    border: none;
    color: white;
    background-color: #0e5937;
    margin-left: auto;
    margin-right: 0.5em;
    margin-top: 10px;
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
  flex-wrap: wrap;
  gap: 30px;
  margin: 1em;

  .buttoncontainer {
    display: flex;
    width: 100%;
    height: 80px;
    button {
      border: none;
      color: white;
      background-color: #0e5937;
      margin-left: auto;
      margin-right: 0.5em;
      margin-top: 10px;
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
  }
  .items {
    border-radius: 1em;
    flex-direction: column;
    display: flex;
    padding: 2em;

    background-color: #f2f2f2;
    height: 100%;
    margin-bottom: 10px;
    text-decoration: none;

    :hover {
      background-color: #e8e8e8;
    }
    > p {
      color: #646464;
      font-size: 20px;
      margin: 5px 0;
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

export default TeacherAllClass;
