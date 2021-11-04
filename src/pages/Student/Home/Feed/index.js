import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_FEED } from "./gql";
/* import { FaFilter } from "react-icons/fa"; */
import PostsFeed from "components/PostsFeed";

const Feed = () => {
  const { data: studentFeed, loading: studFeedLoading } = useQuery(GET_FEED);
  const posts = studentFeed?.studentHomeFeed?.data ?? [];
  return (
    <FeedContainer>
      <PostsContainer>
        <FeedHeader>
          <PostFormContainer></PostFormContainer>
          <FeedFilter>
            <p>What's new?</p>
            {/*  <button className="filterbutton">
              Filter Posts &nbsp;
              <FaFilter size={15} className="filtericon" />
  </button> */}
          </FeedFilter>
        </FeedHeader>
        <FeedItemsContainer>
          {studFeedLoading ? "Loading..." : <PostsFeed posts={posts} />}
        </FeedItemsContainer>
      </PostsContainer>
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  margin: 0 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  button,
  select {
    display: flex;
    width: 150px;
    height: 33px;
    font-size: 16px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    &:hover {
      background-color: #157348;
      color: white;
      cursor: pointer;
      border: solid #0f482f 1px;
    }
  }
`;

const FeedFilter = styled.div`
  display: flex;
  position: sticky;
  top: 400px;
  height: 60px;
  width: 100%;
  align-items: center;
  margin: 22px auto;
  border-top: solid #0e5937 1px;
  p {
    margin: 5px 10px;
    font-size: 20px;
    color: #646464;
  }
  button {
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    margin-left: auto;
    margin-top: 5px;
  }
`;

const FeedHeader = styled.div`
  position: sticky;
  top: 80px;
  padding-top: 10px;
  width: 100%;
  background: white;
  z-index: 1;
`;

const FeedItemsContainer = styled.div`
  width: 100%;
`;

const PostFormContainer = styled.div`
  display: flex;
  position: sticky;
  top: 100px;
  width: 100%;
  z-index: 1;
`;

const PostsContainer = styled.div`
  margin: 0 2em;
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: center;
`;

export default Feed;
