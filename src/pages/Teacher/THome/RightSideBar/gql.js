import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query teacherCourses {
    teacherCourses {
      data {
        id
        yearAndSection
        name
      }
    }
  }
`;
