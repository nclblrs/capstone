import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query group($groupId: ID!) {
    group(groupId: $groupId) {
      id
      name
      course {
        id
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
`;
