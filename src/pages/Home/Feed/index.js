import React from "react";
import styled from "styled-components";

const Feed = () => {
  return (
    <div>
      <FeedContainer>
        <FeedPost>
          <form>
            <ProfilePic src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" />
            <PostText placeholder="Write Something"></PostText>
            <Button>Post</Button>
          </form>
        </FeedPost>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
      </FeedContainer>
    </div>
  );
};

const FeedContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const FeedPost = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
  width: 62em;
  border-radius: 10px;
  flex-direction: column;
  height: 255px;
  padding: 1em;
  border: solid black 1px;
`;

const FeedItem = styled.div`
  display: flex;
  width: 62em;
  border-radius: 1em;
  background-color: #f2f2f2;
  height: 300px;
  margin: 2em 0;
`;

const Button = styled.button`
  display: flex;
  width: 7em;
  height: 44px;
  font-size: 22px;
  margin-left: auto;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  background-color: #0f482f;
  color: white;
`;

const ProfilePic = styled.img`
  border-top-left-radius: 50% 50%;
  border-top-right-radius: 50% 50%;
  border-bottom-right-radius: 50% 50%;
  border-bottom-left-radius: 50% 50%;
  width: 80px;
  margin: 1em;
`;

const PostText = styled.textarea`
  width: 830px;
  align-items: center;
  justify-content: center;
  height: 70px;
  resize: none;
  font-size: 26px;
  border-color: #0f482f;
`;
export default Feed;
