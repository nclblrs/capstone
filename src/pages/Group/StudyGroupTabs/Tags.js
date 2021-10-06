import React from "react";
import { GET_TAGS } from "../gql";
import { useQuery } from "@apollo/client";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";

const TagsInfo = () => {
  let { id } = useParams();
  const { loading: tagLoading, data: tagData } = useQuery(GET_TAGS, {
    variables: { groupId: id },
  });
  const tags = tagData?.groupPostTags ?? [];
  return (
    <>
      {tagLoading
        ? "Loading..."
        : tags.map(({ name: tagName, count }) => (
            <TagLink key={id} to={`/group/${id}?tag=${tagName}`}>
              #{tagName} <span>{count}</span>
            </TagLink>
          ))}
    </>
  );
};

const TagLink = styled(Link)`
  margin: 10px 0px;
  text-decoration: none;
  font-size: 18px;
  color: #0e5937;
  span {
    font-size: 16px;
    border-radius: 50%;
    padding: 3px 6px;
    background: #0e5937;
    border: 2px solid white;
    color: white;
    text-align: center;
  }
`;

export default TagsInfo;
