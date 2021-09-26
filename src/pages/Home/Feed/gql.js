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
