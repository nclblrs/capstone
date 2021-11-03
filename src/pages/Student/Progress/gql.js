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
        students {
          data {
            id
            user {
              id
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
      myTask {
        id
      }
    }
  }
`;
export const CREATE_TASK = gql`
  mutation createTask(
    $groupSubmissionId: ID!
    $studentId: ID!
    $note: String!
    $dueAt: Date!
    $title: String!
  ) {
    createTask(
      groupSubmissionId: $groupSubmissionId
      studentId: $studentId
      note: $note
      dueAt: $dueAt
      title: $title
    ) {
      id
      dueAt
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
