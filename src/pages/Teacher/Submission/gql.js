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
        points
      }
      student {
        user {
          firstName
          lastName
          profilePicture
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
          course {
            id
          }
        }
        student {
          user {
            id
            firstName
            lastName
            profilePicture
          }
        }
      }
    }
  }
`;

export const GRADE_SUBMISSION = gql`
  mutation gradeSubmission($submissionId: ID!, $grade: Int!) {
    gradeSubmission(submissionId: $submissionId, grade: $grade) {
      id
      grade
    }
  }
`;
