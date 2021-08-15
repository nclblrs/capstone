import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import apple from "./images/apple.svg";
import lightbulb from "./images/light-bulb.svg";
import pen from "./images/pen.svg";

const LeftSideBar = () => {
  return (
    <LSideContainer>
      <LSideItem>
        <h4>
          CLASSES
          <img src={pen} alt="" />
        </h4>
        <LSideLinks>
          <img src={apple} alt="" />
          <p title="Capstone Project 1">Capstone Project 1</p>
        </LSideLinks>
        <LSideLinks>
          <img src={apple} alt="" />
          <p title="Ethics">Ethics</p>
        </LSideLinks>
        <LSideLinks>
          <img src={apple} alt="" />
          <p title="Multimedia">Multimedia</p>
        </LSideLinks>
      </LSideItem>
      <LSideItem>
        <h4>
          STUDY GROUPS
          <img src={pen} alt="" />
        </h4>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="BSIT 3-2 Study Buddies">BSIT 3-2 Study Buddies</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 1">Group 1</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 10 - Science">Group 10 - Science</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 10 - Science">Group 10 - Science</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 10 - Science">Group 10 - Science</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 10 - Science">Group 10 - Science</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 10 - Science">Group 10 - Science</p>
        </LSideLinks>
      </LSideItem>
    </LSideContainer>
  );
};

const LSideContainer = styled.div`
  height: max-content;
  display: flex;
  position: sticky;
  top: 80px;
  background-color: white;
  width: 15em;
  border-radius: 10px;
  flex-direction: column;
`;

const LSideItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2em;
  h4 {
    color: gray;
    text-align: left;
    font-size: 16px;
    margin: 0;
    margin-bottom: 10px;
    display: flex;
    align-items: center;

    img {
      margin-left: 10px;
      width: 16px;
    }
  }
`;

const LSideLinks = styled(Link)`
  color: #003249;
  font-size: 16px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  text-decoration: none;
  img {
    width: 20px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`;

export default LeftSideBar;
