import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query studentCourses {
    studentCourses {
      data {
        id
        name
        subjCode
        courseCode
        yearAndSection
        studentCount
        teacher {
          user {
            firstName
            lastName
          }
        }
      }
    }
  }
`;
