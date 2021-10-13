import React from "react";
import styled from "styled-components";
import { FaLaptop } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import { TiGroup } from "react-icons/ti";

const Activity = () => {
  return (
    <ActivityContainer>
      <LSideContainer>
        <ActivityHeader>
          <ActivityContent>
            <h1>Group Activity 1</h1>
            <span>Computer Programming | Due: August 30, 2021 7:00pm</span>
          </ActivityContent>
          <ActivityButtons>
            <button>Assign Task</button>
            <button>Attach File</button>
          </ActivityButtons>
        </ActivityHeader>
      </LSideContainer>
      <RSideContainer>
        <RSideAbout>
          <h3>ABOUT</h3>
          <ul>
            <li>
              <TiGroup size={18} />
              &nbsp; Due Date:
            </li>
            <li>
              <MdAccountCircle size={18} />
              &nbsp; Professor:
            </li>
            <li>
              <MdAccountCircle size={18} />
              &nbsp; Activity Type:
            </li>
            <li>
              <FaLaptop size={18} />
              &nbsp; Subject:
            </li>
            <li>
              <TiGroup size={18} />
              &nbsp; Description:{" "}
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                vel mauris facilisis, tristique magna quis, tristique augue.
                Fusce dignissim elementum lorem a accumsan. Integer ac neque nec
                leo sagittis convallis. Praesent arcu lacus, malesuada ac mollis
                sit amet, interdum quis est.
              </p>
            </li>
            <li>
              Attachment:<Attachment></Attachment>
            </li>
          </ul>
        </RSideAbout>
      </RSideContainer>
    </ActivityContainer>
  );
};

export default Activity;

const ActivityContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 0 30px;
`;

const LSideContainer = styled.div`
  margin: 0 1em;
  display: flex;
  width: 70%;
`;

const ActivityHeader = styled.div`
  position: sticky;
  top: 0px;
  margin: 1em;
  padding: 2em 0;
  background-color: #f2f2f2;
  width: 100%;
  border-radius: 10px;
  height: 150px;
`;

const ActivityContent = styled.div`
  width: 60%;
  margin: 1em;

  > h1 {
    margin: 0;
    color: #0f482f;
    font-weight: normal;
    font-size: 22px;
  }
  > span {
    margin: 0;
    color: #646464;
    font-size: 16px;
    display: flex;
    align-items: center;
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
  width: 30%;
  margin: 0 1em;
  h3 {
    color: #646464;
    text-align: left;
    font-size: 18px;
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
`;
