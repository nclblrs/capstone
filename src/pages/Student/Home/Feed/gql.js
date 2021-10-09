import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query studentLeftSidePanel {
    studentLeftSidePanel {
      studyGroups {
        id
        name
      }
      classGroups {
        id
        name
      }
    }
  }
`;

export const GET_FEED = gql`
  query studentHomeFeed {
    studentHomeFeed {
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
