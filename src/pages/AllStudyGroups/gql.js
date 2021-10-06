import { gql } from "@apollo/client";

export const GET_STUDYGROUPS = gql`
  query studentStudyGroups {
    studentStudyGroups {
      data {
        id
        name
        studentCount
        course {
          name
        }
        admins {
          data {
            user {
              firstName
              middleName
              lastName
            }
          }
        }
      }
    }
  }
`;
