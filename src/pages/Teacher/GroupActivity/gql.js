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

export const CREATE_GROUPSUBMISSION = gql`
  mutation createGroupSubmission($groupActivityId: ID!) {
    createGroupSubmission(groupActivityId: $groupActivityId) {
      id
    }
  }
`;
