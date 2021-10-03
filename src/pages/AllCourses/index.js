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
        <div className="buttoncontainer">
          <p>ALL CLASSES</p>
        </div>
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.courses?.data?.map(
                ({ id, name, yearAndSection, teacher }) => (
                  <Link className="items" key={id} to={`/class/${id}`}>
                    <h1>{name}</h1>
                    <p>
                      Teacher: {teacher?.user?.lastName},{" "}
                      {teacher?.user?.firstName}
                    </p>
                    <p>Year and Section: {yearAndSection}</p>
                    <p> *** members</p>
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

  .buttoncontainer {
    display: flex;
    width: 100%;
    height: 80px;
    padding: 10px;
    button {
    }
    > p {
      font-size: 20px;
    }
  }

  .itemcontainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2em;
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
    justify-content: space-between;

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
