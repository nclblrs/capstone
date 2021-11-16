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
  mutation submitTask(
    $taskId: ID!
    $attachment: String
    $description: String!
  ) {
    submitTask(
      taskId: $taskId
      attachment: $attachment
      description: $description
    ) {
      id
      attachment
    }
  }
`;

export const GET_TASK = gql`
  query task($taskId: ID!) {
    task(taskId: $taskId) {
      id
      title
      note
      attachment
      description
      dueAt
      createdAt
      status
      submittedAt
      student {
        id
        user {
          firstName
          lastName
        }
      }
      groupSubmission {
        id
        group {
          leader {
            id
            user {
              firstName
              lastName
            }
          }
        }
        myTask {
          id
          title
          description
          attachment
          submittedAt
          status
        }
        tasks {
          data {
            id
            title
            attachment
            description
            status
          }
        }
      }
    }
  }
`;

export const CHANGE_TASK_STATUS = gql`
  mutation changeTaskStatus($taskId: ID!, $status: TaskStatus!) {
    changeTaskStatus(taskId: $taskId, status: $status) {
      id
      status
    }
  }
`;
