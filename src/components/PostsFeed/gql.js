import { gql } from "@apollo/client";

export const POST_COMMENTS = gql`
  query postComments($postId: ID!) {
    postComments(postId: $postId) {
      data {
        id
        createdAt
        content
        user {
          id
          profilePicture
          firstName
          lastName
        }
      }
    }
  }
`;

export const CREATE_POST_COMMENT = gql`
  mutation createPostComment($postId: ID!, $content: String!) {
    createPostComment(postId: $postId, content: $content) {
      id
    }
  }
`;
