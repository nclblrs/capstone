import { gql } from "@apollo/client";

export const GET_GROUPSUBMISSION = gql`
  query groupSubmission($groupSubmissionId: ID!) {
    groupSubmission(groupSubmissionId: $groupSubmissionId) {
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
      myTask {
        id
      }
    }
  }
`;

export const SUBMIT_TASK = gql`
mutation submitTask($taskId: ID!, $attachment: String!){
  submitTask(taskId: $taskId:, attachment: $attachment) {
    id
    attachment
  }
}
`;
