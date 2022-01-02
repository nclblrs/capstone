import React from "react";
import styled from "styled-components";
import { useState } from "react";
import Modal from "components/Modal";
import { Link } from "react-router-dom";
import { GET_TEACHERCLASSES } from "./gql";
import { useQuery } from "@apollo/client";
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
        <div className="itemcontainer">
          {loading
            ? "Loading..."
            : data?.teacherCourses?.data?.map(
                ({ id, name, yearAndSection, studentCount }) => (
                  <Link className="items" key={id} to={`/progress/class/${id}`}>
                    <h1>{name}</h1>
                    <p>Year and Section: {yearAndSection}</p>
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
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 1em;
  margin-left: 300px;

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
    width: 310px;
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

export default TeacherAllClass;
