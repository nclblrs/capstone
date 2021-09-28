import { gql } from "@apollo/client";

export const GET_STUDLEFTSIDEBAR = gql`
  query studentLeftSidePanel {
    studentLeftSidePanel {
      classGroups {
        id
        name
      }
    }
  }
`;
