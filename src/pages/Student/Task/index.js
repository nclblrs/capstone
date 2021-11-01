import React from "react";
import styled from "styled-components";

import { MdAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";

import { Link } from "react-router-dom";

const Task = () => {
  return (
    <ActivityContainer>
      <>
        <LSideContainer>
          <ActivityHeader>
            <ActivityContent>
              <h1>Chapter 3 - Requirements Analysis</h1>
              <span>Submitted by: Krizia | August 30, 2021 7:00 PM</span>
            </ActivityContent>
            <span>Attachment:</span>
            <Attachment> TEST</Attachment>
            <ActivityButtons></ActivityButtons>
          </ActivityHeader>
        </LSideContainer>
        <RSideContainer>
          <RSideAbout>
            <h3>ABOUT</h3>
            <ul>
              <li>
                <TiGroup size={18} />
                &nbsp; Due Date: <span></span>
              </li>
              <li>
                <MdAccountCircle size={18} />
                &nbsp; Assigned by: Nicole
              </li>
              <li>
                <MdAccountCircle size={18} />
                &nbsp; Activity to: <span>Krizia</span>
              </li>
              <li>
                <TiGroup size={18} />
                &nbsp; Description:
              </li>
              <li>
                Attachment:
                <Attachment> TEST</Attachment>
              </li>
            </ul>
          </RSideAbout>
          <GoBack to={`/`}>Go back</GoBack>
        </RSideContainer>
      </>
    </ActivityContainer>
  );
};

export default Task;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
`;

const LSideContainer = styled.div`
  margin: 0 1em;
  display: flex;
  width: 70%;
  flex-direction: column;
`;

const ActivityHeader = styled.div`
  position: relative;
  top: 0px;
  margin: 1em;
  padding: 2em 1em;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 10px;
`;

const ActivityContent = styled.div`
  padding: 1em;
  width: 100%;
  border-bottom: 1px solid black;
  margin-bottom: 1em;

  > h1 {
    margin: 0;
    color: #0f482f;
    font-weight: normal;
    font-size: 26px;
  }
  > span {
    margin-top: 5px;
    color: #646464;
    font-size: 18px;
    display: flex;
    align-items: center;
  }
  .description {
    margin-top: 25px;
  }
`;

const ActivityButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
  position: absolute;
  right: 30px;
  top: 50px;
  > button {
    font-size: 15px;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
    outline: none;
    height: 32px;
    width: 120px;
  }
`;

const RSideContainer = styled.div`
  width: 24%;
  min-width: 400px;
  margin: 0 1em;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    font-weight: normal;
    display: flex;
    margin: 0 10px;
    margin-bottom: 20px;
  }
`;

const RSideAbout = styled.div`
  border-radius: 10px;
  margin: 1em 0;
  background-color: #f2f2f2;
  width: 100%;
  padding: 2em;
  ul {
    padding: 0 1em;
    font-size: 18px;
    color: #646464;
    font-weight: normal;
    list-style-type: none;
  }
  li {
    padding: 6px 0px;
    > p {
      color: #0e5937;
    }
    > span {
      color: #0e5937;
    }
  }
`;

const Attachment = styled.a`
  background: #0e5937;
  color: white;
  width: 100%;
  text-align: left;
  border-radius: 5px;
  padding: 10px 32px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  margin-top: 1em;
`;

const GoBack = styled(Link)`
  text-decoration: none;
  font-size: 16px;
  width: 200px;
  height: 40px;
  border: none;
  color: white;
  background-color: #0f482f;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background-color: #0e5937;
  }
`;
