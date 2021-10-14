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
      <MainContainer>
        <ButtonContainer>
          <button className="sortbutton">
            <Dropdown
              popperComponent={
                <DropdownButtons>
                  <button>Class Name</button>
                  <button>Year and Section</button>
                </DropdownButtons>
              }
            >
              Sort By
              <FaFilter size={18} />
            </Dropdown>
          </button>
          <button className="createclass">
            Create Class
            <IoIosAddCircle size={18} />
          </button>
          <div className="leftbuttoncontainer">
            <button className="showinactive">Show Inactive</button>
          </div>
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
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: sticky;
  width: 95%;
  margin-left: auto;
`;

const ButtonContainer = styled.div`
  position: sticky;
  display: flex;
  flex-direction: row;
  margin-left: auto;
  button {
    border: none;
    color: white;
    justify-content: center;
    margin-left: auto;
    margin-top: 10px;
    height: 50px;
    cursor: pointer;
  }

  .leftbuttoncontainer {
    margin-left: auto;
    margin-right: 57px;
    button {
      font-size: 16px;
      width: 150px;
      height: 49px;
      color: white;
      background-color: #0e5937;
      border: none;
      &:hover {
        background-color: #157348;
        color: white;
        cursor: pointer;
      }
    }
  }

  .sortbutton {
    justify-content: center;
    font-size: 16px;
    width: 120px;
    height: 49px;
    margin-right: 30px;
    background-color: #0e5937;
    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
    }
  }
  .createclass {
    font-size: 16px;
    width: 150px;
    margin-right: 63.2em;
    background-color: #0e5937;
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
  margin-top: 20px;
  margin-left: auto;

  .itemcontainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    gap: 22px;
    margin: 1em;
    li {
      padding: 10px 8px;
    }
  }
  .items {
    margin-top: 50px;
    border-radius: 1em;
    flex-direction: column;
    display: flex;
    padding: 2em;
    width: 20%;
    background-color: #f2f2f2;
    height: max-content;
    margin-bottom: 20px;
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

export default TeacherAllClass;
