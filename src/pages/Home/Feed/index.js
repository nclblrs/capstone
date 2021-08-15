import React from "react";
import styled from "styled-components";

const Feed = () => {
  return (
    <div>
      <FeedContainer>
        <FeedPost>Create a post</FeedPost>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
      </FeedContainer>
    </div>
  );
};

const FeedContainer = styled.div`
  margin: 0 1em;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  font-family: "Lato", sans-serif;
  width: 40em;
`;

const FeedPost = styled.div`
  margin: 0 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: "Lato", sans-serif;
  width: 40em;
  background-color: white;
  height: 150px;
  position: sticky;
  top: 80px;
  border-radius: 10px;
  border: solid black 1px;
`;

const FeedItem = styled.div`
  width: 100%;
  border-radius: 10px;
  background-color: white;
  height: 200px;
`;

export default Feed;
