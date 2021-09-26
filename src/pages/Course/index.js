import React from "react";
import { GET_COURSE } from "./gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import clip from "./images/clip.svg";

const Course = () => {
  let { id } = useParams();
  const { loading, data } = useQuery(GET_COURSE, {
    variables: { courseId: id },
  });
  const { name, subjCode, teacher, courseCode, yearAndSection } =
    data?.course ?? {};
  const { firstName, lastName } = teacher?.user ?? {};
  return (
    <CourseContainer>
      <CoursePostsContainer>
        <CoursePost>
          <form>
            <textarea
              placeholder=" 
            
              Write Something"
            ></textarea>
            <select>
              <option value="Category" selected disabled>
                Category
              </option>
              <option value="TEST 1">TEST 1</option>
              <option value="TEST 2">TEST 2</option>
              <option value="TEST 3">TEST 3</option>
            </select>
            <button class="attach">
              Attach File
              <img class="attachicon" src={clip} alt="" />
            </button>
            <button class="postbutton">Post</button>
          </form>
        </CoursePost>
        <CourseFilter></CourseFilter>
        <CoursePostItems></CoursePostItems>
        <CoursePostItems></CoursePostItems>
        <CoursePostItems></CoursePostItems>
        <CoursePostItems></CoursePostItems>
      </CoursePostsContainer>
      <RSideContainer>
        <RSideAbout>
          <h4>ABOUT</h4>
          {loading ? (
            "Loading..."
          ) : (
            <>
              <h5>{name}</h5>
              <h5>
                Class Code: &nbsp;<p>{courseCode}</p>
              </h5>
              <h6>Subject Code: {subjCode}</h6>
              <h6>
                Faculty: {firstName}
                &nbsp;
                {lastName}
              </h6>
              <h6>Section: {yearAndSection}</h6>
            </>
          )}
        </RSideAbout>
        <RSideToDo>
          <h4>TO-DO</h4>
          TESSSSSSSSSSSSST
        </RSideToDo>
      </RSideContainer>
    </CourseContainer>
  );
};

const CourseContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 1em;
`;

const CoursePostsContainer = styled.div`
  display: flex;
  width: 60%;
  flex-direction: column;
  margin: 20px auto;
  button,
  select {
    width: 150px;
    height: 44px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;

    &:hover {
      background-color: #0f2520;
      color: white;
      cursor: pointer;
      border: solid #0f482f 1px;
    }
  }
`;

const CoursePost = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 255px;
  border-radius: 10px;
  padding: 1em 2em;
  select,
  .attach {
    margin: 20px auto;
    margin-right: 10px;
  }

  .postbutton {
    display: flex;
    margin: 0;
    margin-left: auto;
    background-color: #0f482f;
  }

  textarea {
    width: 100%;
    height: 90px;
    resize: none;
    font-size: 18px;
    border: solid #0e5937 1px;
    border-radius: 5px;
    ::placeholder {
      color: #0f482f;
      align-items: center;
    }
  }

  .attachicon {
    padding-left: 10px;
    width: 24px;
    filter: brightness(0) invert(1);
    text-align: center;
    &:hover {
      filter: brightness(0) invert(1);
    }
  }
`;

const CourseFilter = styled.div`
  display: flex;
  position: sticky;
  top: 400px;
  height: 80px;
  width: 100%;
  align-items: center;
  margin: 20px auto;
  border-bottom: solid #0e5937 1px;
`;

const CoursePostItems = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 255px;
  border-radius: 10px;
  margin: 50px auto;
`;

const RSideContainer = styled.div`
  display: flex;
  width: 25%;
  flex-direction: column;
  margin: 20px auto;
  border-radius: 10px;
  position: sticky;
  top: 120px;
  p {
    margin: 0;
    color: #646464;
  }
  h4 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
    font-weight: normal;
  }

  h5 {
    color: #0f482f;
    text-align: left;
    font-size: 24px;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
    font-weight: normal;
  }
  h6 {
    font-size: 22px;
    margin: 10px 30px;
    color: #646464;
    font-family: Roboto;
    font-weight: normal;
    text-align: left;
  }
`;

const RSideAbout = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: 362px;
  border-radius: 10px;
  padding: 2em;
  margin-bottom: 2em;
`;

const RSideToDo = styled.div`
  display: flex;
  position: sticky;
  top: 530px;
  width: 100%;
  flex-direction: column;
  background-color: #f2f2f2;
  height: max-content;
  border-radius: 10px;
  padding: 2em;
`;

export default Course;
