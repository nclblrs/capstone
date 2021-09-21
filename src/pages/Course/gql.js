import { gql } from "@apollo/client";

export const GET_COURSE = gql`
  query course($courseId: ID!) {
    course(courseId: $courseId) {
      id
      name
      subjCode
      yearAndSection
      teacher {
        id
        user {
          firstName
          middleName
          lastName
        }
      }
    }
  }
`;