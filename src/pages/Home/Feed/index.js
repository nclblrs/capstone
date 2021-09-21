import React from "react";
import styled from "styled-components";
import filter from "./images/filter.svg";
import clip from "./images/clip.svg";

const Feed = () => {
  return (
    <FeedContainer>
      <FeedPost>
        <FeedPostDiv>
          <img
            class="profilepic"
            src="https://images.unsplash.com/photo-1568822617270-2c1579f8dfe2?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dGVhY2hlcnxlbnwwfDJ8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
            alt="Your profile pic"
          />
          <form>
            <textarea
              placeholder=" 
            
              Write Something"
            ></textarea>
            <select>
              <option value="Select Group" selected disabled>
                Select Group
              </option>
              <option value="TEST 1">TEST 1</option>
              <option value="TEST 2">TEST 2</option>
              <option value="TEST 3">TEST 3</option>
            </select>
            <button class="attach">
              Attach File
              <img class="attachicon" src={clip} alt="" />
            </button>
            <button class="postbutton">Post</button>
          </form>
        </FeedPostDiv>
      </FeedPost>
      <FeedFilter>
        <p>What's new?</p>
        <button>
          Filter Posts
          <img src={filter} alt="" />
        </button>
      </FeedFilter>
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
  font-family: "Roboto", sans-serif;
  button,
  select {
    width: 150px;
    height: 44px;
    font-size: 15px;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;

    &:hover {
      background-color: #0f2520;
      color: white;
      cursor: pointer;
      border: solid #0f482f 1px;
    }
  }
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
  margin: 20px auto;
  justify-content: center;

  select,
  .attach {
    margin: 20px auto;
    margin-right: 10px;
  }

  .postbutton {
    display: flex;
    margin: 0;
    margin-left: auto;
    margin-right: 30px;
    background-color: #0f482f;
  }

  textarea {
    width: 750px;
    height: 90px;
    resize: none;
    font-size: 18px;
    border: solid #0e5937 1px;
    border-radius: 5px;
    margin: auto;
    ::placeholder {
      color: #0f482f;
      align-items: center;
    }
  }

  .profilepic {
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

  .attachicon {
    padding-left: 10px;
    width: 24px;
    filter: brightness(0) invert(1);
    text-align: center;
    &:hover {
      filter: brightness(0) invert(1);
    }
  }
`;

const FeedFilter = styled.div`
  display: flex;
  position: sticky;
  top: 400px;
  height: 80px;
  width: 100%;
  align-items: center;
  margin: 20px auto;
  border-top: solid #0e5937 1px;

  p {
    margin: auto 10px;
    font-size: 20px;
    color: #646464;
  }

  button {
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    margin-left: auto;
  }
  img {
    padding-left: 10px;
    width: 30px;
    filter: brightness(0) invert(1);
    &:hover {
      filter: brightness(0) invert(1);
    }
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