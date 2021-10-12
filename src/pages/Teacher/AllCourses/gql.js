import { gql } from "@apollo/client";

export const GET_TEACHERCLASSES = gql`
  query teacherCourses {
    teacherCourses {
      data {
        id
        name
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
