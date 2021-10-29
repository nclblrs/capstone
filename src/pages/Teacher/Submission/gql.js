import { gql } from "@apollo/client";

export const GET_SUBMISSION = gql`
  query submission($submissionId: ID!) {
    submission(submissionId: $submissionId) {
      id
      description
      createdAt
      grade
      activity {
        id
      }
      student {
        user {
          firstName
          lastName
        }
      }
    }
  }
`;

export const COURSE_ACTIVITYSUBMISSIONS = gql`
  query activitySubmissions($activityId: ID!) {
    activitySubmissions(activityId: $activityId) {
      data {
        id
        activity {
          id
        }
        student {
          user {
            id
            firstName
            lastName
          }
        }
      }
    }
  }
`;
