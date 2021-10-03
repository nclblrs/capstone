import { gql } from "@apollo/client";

export const GET_GROUPS = gql`
  query groups {
    groups {
      data {
        id
        name
        type
        course {
          name
        }
        leader {
          user {
            firstName
            middleName
            lastName
          }
        }
      }
    }
  }
`;
