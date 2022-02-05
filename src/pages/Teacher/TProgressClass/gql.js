import { gql } from "@apollo/client";

export const GET_COURSE = gql`
  query course($courseId: ID!) {
    course(courseId: $courseId) {
      id
      name
      subjCode
      courseCode
      yearAndSection
      studentCount
      teacher {
        id
        user {
          profilePicture
          firstName
          lastName
        }
      }
      students {
        data {
          user {
            id
            profilePicture
            firstName
            lastName
          }
        }
      }
      groups {
        data {
          id
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
      }
    }
    courseActivities(courseId: $courseId) {
      data {
        id
      }
    }
    courseGroupActivities(courseId: $courseId) {
      data {
        id
      }
    }
  }
`;

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

export const GET_GROUP_ACTIVITIES = gql`
  query ($courseId: ID!) {
    courseGroupActivities(courseId: $courseId) {
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
