import { gql } from "@apollo/client";

export const COURSE_ACTIVITY = gql`
  query activity($activityId: ID!) {
    activity(activityId: $activityId) {
      id
      title
      description
      dueAt
      attachment
      course {
        name
        teacher {
          user {
            firstName
            lastName
          }
        }
      }
      mySubmission {
        id
        attachment
        description
        submittedAt
        createdAt
      }
    }
  }
`;
export const COURSE_GROUPACTIVITY = gql`
  query groupActivity($activityId: ID!) {
    groupActivity(activityId: $activityId) {
      id
      title
      description
      dueAt
      attachment
      course {
        name
        teacher {
          user {
            firstName
            lastName
          }
        }
      }
    }
  }
`;

export const CREATE_SUBMISSION = gql`
  mutation createSubmission($description: String!, $activityId: ID!) {
    createSubmission(description: $description, activityId: $activityId) {
      id
    }
  }
`;

export const SUBMISSION_ATTACHMENT = gql`
  mutation addAttachmentToSubmission($id: ID!, $attachment: String!) {
    addAttachmentToSubmission(id: $id, attachment: $attachment) {
      id
    }
  }
`;
