import React from "react";
import styled from "styled-components";
import { GET_COURSES } from "./gql";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";

const AllCourses = () => {
  const { loading, data } = useQuery(GET_COURSES);

  return (
    <PageContainer>
      <MainContainer>
        <ul>
          <li>Classes</li>
          <li>Course Groups</li>
          <li>Study Groups</li>
        </ul>
        <div className="buttoncontainer">
          <h2>ALL CLASSES</h2>
          <button>Show Inactive</button>
        </div>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.studentCourses?.data?.map(
                ({ id, name, yearAndSection, teacher, studentCount }) => (
                  <Link className="items" key={id} to={`/class/${id}`}>
                    <h1>{name}</h1>
                    <p>
                      Teacher: {teacher?.user?.lastName},{" "}
                      {teacher?.user?.firstName}
                    </p>
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

const MainContainer = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  border-radius: 10px;
  height: 600px;
  padding: 1em;
  ul {
    list-style-type: none;
    display: flex;
    flex-wrap: wrap;
    gap: 50px;
    align-items: center;
    justify-content: center;
    letter-spacing: 1px;
    margin-bottom: 0;
    font-size: 18px;
    color: #646464;
    margin-top: 0;
  }
  li {
    cursor: pointer;
    border-bottom: 3px solid #0e5937;
    padding: 10px;
    margin-top: 0;
    font-weight: bold;
  }
  li:hover {
    color: white;
    background-color: #0e5937;
    border-radius: 10px;
    padding: 0.5em;
    font-weight: normal;
  }

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
    > h2 {
      font-size: 24px;
      color: #0f482f;
      letter-spacing: 1px;
      cursor: pointer;
    }
  }

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
    border-radius: 1em;
    flex-direction: column;
    display: flex;
    padding: 2em;
    width: 24%;
    background-color: #f2f2f2;
    height: 250px;
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

export default AllCourses;
