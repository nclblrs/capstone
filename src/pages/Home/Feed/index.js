import React from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/client";
import { GET_GROUP } from "./gql";
import { FaFilter } from "react-icons/fa";
import { BsPaperclip } from "react-icons/bs";

const Feed = () => {
  const { loading, data } = useQuery(GET_GROUP);
  const studyGroups = data?.studentLeftSidePanel?.studyGroups ?? [];
  const classGroups = data?.studentLeftSidePanel?.classGroups ?? [];
  return (
    <FeedContainer>
      <FeedHeader>
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
            <ButtonContainer>
              <select>
                <option value="Select Group" selected disabled>
                  Select Group
                </option>
                {loading
                  ? "Loading..."
                  : studyGroups.map(({ name }) => (
                      <option value="">{name}</option>
                    ))}
                {loading
                  ? "Loading..."
                  : classGroups.map(({ name }) => (
                      <option value="">{name}</option>
                    ))}
              </select>
              <button class="attach">
                Attach File
                <BsPaperclip size={25} class="attachicon" />
              </button>
            </ButtonContainer>
            <button class="postbutton">Post</button>
          </form>
        </FeedPostDiv>

        <FeedFilter>
          <p>What's new?</p>
          <button class="filterbutton">
            Filter Posts &nbsp;
            <FaFilter size={15} class="filtericon" />
          </button>
        </FeedFilter>
      </FeedHeader>
      <FeedItemsContainer>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem></FeedItem>
        <FeedItem>Last</FeedItem>
      </FeedItemsContainer>
    </FeedContainer>
  );
};

const FeedContainer = styled.div`
  margin: 0 1.5em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 60%;
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

const FeedPostDiv = styled.div`
  width: 100%;
  background-color: #f2f2f2;
  height: 248px;
  border-radius: 10px;
  padding: 28px 48px;

  form {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 18px;
    position: relative;
  }

  .postbutton {
    position: absolute;
    right: -10px;
    bottom: -12px;
  }

  textarea {
    display: flex;
    width: 100%;
    height: 90px;
    resize: none;
    font-size: 18px;
    border: solid #0e5937 1px;
    border-radius: 5px;

    ::placeholder {
      color: #a7a4a4;
      align-items: center;
      padding-left: 12px;
      padding-top: 20px;
    }
  }

  .profilepic {
    border-top-left-radius: 50% 50%;
    border-top-right-radius: 50% 50%;
    border-bottom-right-radius: 50% 50%;
    border-bottom-left-radius: 50% 50%;
    width: 90px;
    height: 90px;
    margin-right: 20px;
    margin-left: -10px;
    object-fit: cover;
    border: solid #0f482f 2px;
    float: left;
  }

  .attachicon {
    padding-left: 10px;
    text-align: center;
  }
  .filtericon {
    padding-left: 15px;
    text-align: center;
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
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
  padding-top: 20px;
  width: 100%;
  background: white;
`;

const FeedItemsContainer = styled.div`
  width: 100%;
`;

const FeedItem = styled.div`
  display: flex;
  border-radius: 1em;
  background-color: #f2f2f2;
  height: 300px;
  margin: 1em 0;
  width: 100%;
`;

export default Feed;
