import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation createCourse($name: String!, $yearAndSection: String!) {
    createCourse(name: $name, yearAndSection: $yearAndSection) {
      id
    }
  }
`;
