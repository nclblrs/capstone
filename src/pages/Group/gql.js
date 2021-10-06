import { gql } from "@apollo/client";

export const GET_GROUP = gql`
  query group($groupId: ID!) {
    group(groupId: $groupId) {
      id
      name
      type
      groupCode
      course {
        id
        name
      }
      leader {
        user {
          firstName
          lastName
        }
      }
      admins {
        data {
          user {
            firstName
            lastName
          }
        }
      }
      students {
        data {
          user {
            firstName
            middleName
            lastName
          }
        }
      }
    }
  }
`;

export const GROUP_POSTS = gql`
  query groupPosts($groupId: ID!) {
    groupPosts(groupId: $groupId) {
      data {
        id
        content
        attachment
        category
        createdAt
        tags
        user {
          id
          profilePicture
          firstName
          lastName
        }
        activity {
          id
          title
          description
          attachment
          dueAt
          course {
            id
          }
        }
        groupActivity {
          id
          title
          description
          attachment
          dueAt
          course {
            id
          }
        }
      }
    }
  }
`;

export const CREATE_GROUP_POST = gql`
  mutation createPost(
    $groupId: ID!
    $content: String!
    $category: String!
    $tags: [String]
  ) {
    createPost(
      groupId: $groupId
      content: $content
      category: $category
      tags: $tags
    ) {
      id
    }
  }
`;

export const ADD_ATTACHMENT_TO_POST = gql`
  mutation addAttachmentToPost($id: ID!, $attachment: String!) {
    addAttachmentToPost(id: $id, attachment: $attachment) {
      id
    }
  }
`;

export const GET_TAGS = gql`
  query groupPostTags($groupId: ID!) {
    groupPostTags(groupId: $groupId) {
      name
      count
    }
  }
`;
