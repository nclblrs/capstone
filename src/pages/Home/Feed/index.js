import React from "react";
import styled from "styled-components";

const Feed = () => {
  return (
    <FeedContainer>
      <FeedPost>
        <FeedPostDiv>
          <img
            src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Your profile pic"
          />
          <form>
            <textarea placeholder="Write Something"></textarea>
            <select>
              <option value="Select Group" disabled>
                Select Group
              </option>
              <option value="TEST 1">TEST 1</option>
              <option value="TEST 2">TEST 2</option>
              <option value="TEST 3">TEST 3</option>
            </select>
            <button>Attach File</button>
            <button class="postbutton">Post</button>
          </form>
        </FeedPostDiv>
      </FeedPost>
      <FeedItem></FeedItem>
      <FeedItem></FeedItem>
      <FeedItem></FeedItem>
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  margin: 0 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 50%;
`;

const FeedPost = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
  border-radius: 10px;
  height: 255px;
  width: 100%;
`;

const FeedPostDiv = styled.div`
  display: flex;
  margin: 30px auto;

  select,
  button {
    width: 150px;
    height: 44px;
    font-size: 15px;
    margin: 10px auto;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    background-color: #0f482f;
    color: white;
    border-radius: 5px;
    border: solid #0f482f 1px;
  }
  .postbutton {
    display: flex;
    margin-right: 30px;
    margin-left: auto;
    align-items: center;
    justify-content: center;
  }
  textarea {
    width: 750px;
    height: 90px;
    resize: none;
    font-size: 18px;
    border-color: #0f482f;
    margin: auto;
    border-radius: 5px;
  }

  img {
    border-top-left-radius: 50% 50%;
    border-top-right-radius: 50% 50%;
    border-bottom-right-radius: 50% 50%;
    border-bottom-left-radius: 50% 50%;
    width: 90px;
    height: 90px;
    margin: 0 25px;
    object-fit: cover;
    border: solid #0f482f 2px;
  }
`;

const FeedItem = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  height: 300px;
  margin: 2em 0;
  width: 100%;
`;

export default Feed;
