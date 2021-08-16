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
          <p title="Introduction to Computing">Introduction to Computing</p>
        </LSideLinks>
        <LSideLinks>
          <img src={apple} alt="" />
          <p title="Computer Programming 1">Computer Programming 1</p>
        </LSideLinks>
        <LSideLinks>
          <img src={apple} alt="" />
          <p title="Mathematics in the Modern World">
            Mathematics in the Modern World
          </p>
        </LSideLinks>
        <LSideLinks>
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
      <Line />
      <LSideItem>
        <h4>
          GROUPS
          <img src={pen} alt="" />
        </h4>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 1 - Computer Programming">
            Group 1 - Computer Programming
          </p>
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
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
      <Line />
      <LSideItem>
        <h4>
          STUDY GROUPS
          <img src={pen} alt="" />
        </h4>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="NightOwls">NightOwls</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="RGB">RGB</p>
        </LSideLinks>
        <LSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Group 10 - Science">ITGo</p>
        </LSideLinks>
        <LSideLinks>
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
    </LSideContainer>
  );
};

const LSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 80px;
  background-color: #f2f2f2;
  width: 20%;
  border-radius: 10px;
  flex-direction: column;
  height: 911px;
`;

const LSideItem = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.2em;
  h4 {
    color: #646464;
    text-align: left;
    font-size: 26px;
    margin: 10px 0;
    display: flex;
    align-items: center;
    margin-bottom: 1em;
    img {
      margin-left: 10px;
      width: 16px;
    }
  }
`;

const LSideLinks = styled(Link)`
  color: #003249;
  font-size: 22px;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
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

const Line = styled.hr`
  display: flex;
  margin: 1em;
`;
export default LeftSideBar;
