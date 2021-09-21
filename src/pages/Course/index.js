import React from "react";
import { GET_COURSE } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";

const Course = () => {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_COURSE, {
    variables: { courseId: id },
  });
  const { name, subjCode, teacher } = data?.course ?? {};
  const { firstName, middleName, lastName } = teacher?.user ?? {};
  return (
    <CourseContainer>
      <CoursePostContainer>
        <CoursePost>test</CoursePost>
      </CoursePostContainer>
      {loading
        ? "Loading..."
        : `${name} ${subjCode} ${firstName} ${middleName} ${lastName}`}
    </CourseContainer>
  );
};

const CourseContainer = styled.div`
  display: flex;
  top: 120px;
  width: 100%;
  flex-direction: column;
  padding: 2em;
`;

const CoursePostContainer = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
  width: 20%;
  border-radius: 10px;
  flex-direction: column;
  height: max-content;
`;

const CoursePost = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
  border-radius: 10px;
  height: 255px;
  width: 100%;
  margin: auto;
`;

const RSideClass = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
  width: 20%;
  border-radius: 10px;
  flex-direction: column;
  height: max-content;
`;

const RSideItems = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1em;
`;

export default Course;
