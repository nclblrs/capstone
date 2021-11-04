import { gql } from "@apollo/client";

export const COURSE_GROUPACTIVITY = gql`
  query groupActivity($groupActivityId: ID!) {
    groupActivity(groupActivityId: $groupActivityId) {
      id
      title
      description
      dueAt
      attachment
      points
      course {
        id
        name
        teacher {
          user {
            firstName
            lastName
          }
        }
        myGroup {
          leader {
            id
          }
        }
      }
      mySubmission {
        id
        attachment
        description
        submittedAt
        submittedBy {
          user {
            firstName
            lastName
          }
        }
        group {
          id
          name
        }
      }
    }
  }
`;

export const SUBMIT_GROUPSUBMISSION = gql`
  mutation submitGroupSubmission(
    $groupSubmissionId: ID!
    $description: String!
    $attachment: String
  ) {
    submitGroupSubmission(
      groupSubmissionId: $groupSubmissionId
      description: $description
      attachment: $attachment
    ) {
      id
      description
      attachment
      submittedAt
      submittedBy {
        id
        user {
          id
          firstName
        }
      }
    }
  }
`;
