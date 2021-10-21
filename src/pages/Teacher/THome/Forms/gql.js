import { gql } from "@apollo/client";

export const CREATE_COURSE = gql`
  mutation createCourse(
    $name: String!
    $subjCode: String!
    $yearAndSection: String!
  ) {
    createCourse(
      name: $name
      subjCode: $subjCode
      yearAndSection: $yearAndSection
    ) {
      id
    }
  }
`;
