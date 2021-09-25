import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query group($groupId: ID!) {
    group(groupId: $groupId) {
      id
      name
      type
      groupCode
      course {
        id
        name
      }
      leader {
        user {
          firstName
          lastName
        }
      }
      admins {
        data {
          user {
            firstName
            lastName
          }
        }
      }
    }
  }
`;
