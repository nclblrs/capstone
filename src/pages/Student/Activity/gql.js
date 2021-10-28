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
