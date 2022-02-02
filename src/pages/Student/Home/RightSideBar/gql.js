import { gql } from "@apollo/client";

export const GET_AGENDARIGHTSIDEBAR = gql`
  query agendaRightSidePanel {
    agendaRightSidePanel {
      activities {
        id
        title
        dueAt
      }
      groupActivities {
        id
        title
        dueAt
      }
      tasks {
        id
        title
        dueAt
        groupSubmission {
          id
        }
      }
    }
  }
`;
