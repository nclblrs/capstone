import { gql } from "@apollo/client";

export const GET_GROUPSUBMISSION = gql`
  query groupSubmission($groupSubmissionId: ID!) {
    groupSubmission(groupSubmissionId: $groupSubmissionId) {
      id
      group {
        id
        name
        leader {
          id
          user {
            firstName
            lastName
          }
        }
        course {
          id
          name
          teacher {
            user {
              firstName
              lastName
            }
          }
        }
      }
      tasks {
        data {
          id
          attachment
          description
          status
          dueAt
          student {
            user {
              firstName
              lastName
            }
          }
        }
      }
      groupActivity {
        id
        title
        description
      }
    }
  }
`;
