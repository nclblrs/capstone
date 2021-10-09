import { gql } from "@apollo/client";


export const GET_FEED = gql`
  query PostsResult {
    PostsResult {
      data {
        id
        attachment
        content
        tags
        createdAt
        group {
          id
          name
          type
        }
        course {
          id
          name
        }
        user {
          id
          firstName
          lastName
        }
      }
    }
  }
`;
