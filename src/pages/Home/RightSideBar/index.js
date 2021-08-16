import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import lightbulb from "./images/light-bulb.svg";

const RightSideBar = () => {
  return (
    <RSideContainer>
      <RSideItem>
        <h4>Reminder</h4>
        <p>Today's Agenda</p>
        <p> Tue, September 7, 2021</p>
      </RSideItem>
      <RSideItem>
        <RSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Synchronous Meeting - Computer Programming 1">
            Synchronous Meeting - Computer Programming 1
          </p>
        </RSideLinks>
        <RSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Assessment 10 - Mathematics in the Modern World">
            Assessment 10 - Mathematics in the Modern World
          </p>
        </RSideLinks>
        <RSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Chapter 1-3 - Introduction to Computing">
            Chapter 1-3 - Introduction to Computing
          </p>
        </RSideLinks>
        <RSideLinks>
          <img src={lightbulb} alt="" />
          <p title="Introduction - Group 1 - Introduction to Computing">
            Introduction - Group 1 - Introduction to Computing
          </p>
        </RSideLinks>
        <RSideLinks>
          <p>... See More</p>
        </RSideLinks>
      </RSideItem>
    </RSideContainer>
  );
};

const RSideContainer = styled.div`
  display: flex;
  position: sticky;
  top: 120px;
  background-color: #f2f2f2;
  width: 20%;
  border-radius: 10px;
  flex-direction: column;
  height: 477px;
`;

const RSideItem = styled.div`
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
    img {
      margin-left: 10px;
      width: 16px;
    }
  }
  p {
    font-size: 22px;
    margin: 0;
  }
`;

const RSideLinks = styled(Link)`
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

export default RightSideBar;
