import { gql } from "@apollo/client";

export const GET_STUDLEFTSIDEBAR = gql`
  query studentLeftSidePanel {
    studentLeftSidePanel {
      courses {
        id
        name
      }
      studyGroups {
        id
        name
      }
      classGroups {
        id
        name
        course {
          name
        }
      }
    }
  }
`;
