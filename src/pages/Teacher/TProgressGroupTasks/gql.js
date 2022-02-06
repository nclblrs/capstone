import { gql } from "@apollo/client";

export const GET_ACTIVITIES = gql`
  query ($courseId: ID!) {
    courseActivities(courseId: $courseId) {
      data {
        id
        title
        dueAt
        createdAt
        course {
          id
        }
        mySubmission {
          id
        }
      }
    }
  }
`;

export const COURSEGROUP_GROUPACTIVITIES_SUBMISSIONS = gql`
  query courseGroupActivitiesAndGroupSubmissions(
    $courseId: ID!
    $groupId: ID!
  ) {
    courseGroupActivitiesAndGroupSubmissions(
      courseId: $courseId
      groupId: $groupId
    ) {
      group {
        name
        leader {
          user {
            firstName
            lastName
          }
        }
        students {
          data {
            user {
              firstName
              lastName
            }
          }
        }
      }
      course {
        name
        subjCode
        yearAndSection
      }
      data {
        groupActivity {
          id
          title
          createdAt
          dueAt
        }
        groupSubmission {
          id
          description
          attachment
          createdAt
          submittedAt
          tasks {
            data {
              title
              description
              dueAt
              submittedAt
              status
            }
          }
        }
      }
    }
  }
`;
export const GROUPSUBMISSION_GROUP = gql`
  query groupSubmissionOfGroup($groupActivityId: ID!, $groupId: ID!) {
    groupSubmissionOfGroup(
      groupActivityId: $groupActivityId
      groupId: $groupId
    ) {
      id
      tasks {
        data {
          id
          title
          submittedAt
          createdAt
          dueAt
          student {
            id
            user {
              id
              firstName
            }
          }
        }
      }
    }
  }
`;
