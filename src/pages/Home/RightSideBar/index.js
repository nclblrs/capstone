import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { FaRegLightbulb } from "react-icons/fa";

const RightSideBar = () => {
  var today = new Date(),
    date =
      parseInt(today.getMonth() + 1) +
      "-" +
      today.getDate() +
      "-" +
      today.getFullYear();
  console.log(date);
  return (
    <RSideContainer>
      <RSideItem>
        <h4>REMINDER</h4>
        <p>
          Today's Agenda
          <br />
          Current Date : {date}
        </p>
      </RSideItem>
      <RSideItem>
        <RSideLinks>
          <FaRegLightbulb size={18} />
          <p title="Synchronous Meeting - Computer Programming 1">
            Synchronous Meeting - Computer Programming 1
          </p>
        </RSideLinks>
        <RSideLinks>
          <FaRegLightbulb size={18} />
          <p title="Assessment 10 - Mathematics in the Modern World">
            Assessment 10 - Mathematics in the Modern World
          </p>
        </RSideLinks>
        <RSideLinks>
          <FaRegLightbulb size={18} />
          <p title="Chapter 1-3 - Introduction to Computing">
            Chapter 1-3 - Introduction to Computing
          </p>
        </RSideLinks>
        <RSideLinks>
          <FaRegLightbulb size={18} />
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
  top: 100px;
  background-color: #f2f2f2;
  width: 300px;
  min-width: 300px;
  border-radius: 10px;
  flex-direction: column;
  height: max-content;
  padding: 29px;
`;

const RSideItem = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    margin: 0;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    font-weight: normal;
    img {
      margin-left: 10px;
      width: 16px;
    }
  }
  p {
    font-size: 16px;
    margin: 0;
    margin-bottom: 30px;
  }
`;

const RSideLinks = styled(Link)`
  color: #0f482f;
  text-align: left;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  text-decoration: none;
  img {
    width: 20px;
  }
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
    font-size: 18px;
  }
`;

export default RightSideBar;
