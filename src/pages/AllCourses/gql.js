import { gql } from "@apollo/client";

export const GET_COURSES = gql`
  query courses {
    courses {
      data {
        id
        name
        subjCode
        courseCode
        yearAndSection
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
