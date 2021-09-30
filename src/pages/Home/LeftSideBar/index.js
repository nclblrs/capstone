import React from "react";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { GET_STUDLEFTSIDEBAR } from "./gql";
import { HiOutlineLightBulb } from "react-icons/hi";
import Dropdown, { DropdownButtons } from "components/Dropdown";
import { FaPlusCircle, FaLaptop, FaPenSquare } from "react-icons/fa";

const LeftSideBar = () => {
  const { loading, data } = useQuery(GET_STUDLEFTSIDEBAR);
  const courses = data?.studentLeftSidePanel?.courses ?? [];
  const studyGroups = data?.studentLeftSidePanel?.studyGroups ?? [];
  const classGroups = data?.studentLeftSidePanel?.classGroups ?? [];
  return (
    <LSideContainer>
      <LSideItem>
        <h4>
          CLASSES
          <button>
            <Dropdown
              popperComponent={
                <DropdownButtons>
                  <button>Join Class</button>
                </DropdownButtons>
              }
            >
              <FaPlusCircle size={20} class="button-icon" />
            </Dropdown>
          </button>
        </h4>
        {loading
          ? "Loading..."
          : courses.map(({ id, name }) => (
              <LSideLinks key={id} to={`/class/${id}`}>
                <FaLaptop size={18} />
                <p title={name}>{name}</p>
              </LSideLinks>
            ))}
        <LSideLinks>
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
      <Line />
      <LSideItem>
        <h4>GROUPS</h4>
        {loading
          ? "Loading..."
          : classGroups.map(({ id, name }) => (
              <LSideLinks key={id} to={`/group/${id}`}>
                <HiOutlineLightBulb size={18} />
                <p title={name}>{name}</p>
              </LSideLinks>
            ))}
        <LSideLinks>
          <p>... See More</p>
        </LSideLinks>
      </LSideItem>
      <Line />
      <LSideItem>
        <h4>
          STUDY GROUPS
          <button>
            <Dropdown
              popperComponent={
                <DropdownButtons>
                  <button>Join Group</button>
                  <button>Create Study Group</button>
                </DropdownButtons>
              }
            >
              <FaPenSquare size={20} class="button-icon" />
            </Dropdown>
          </button>
        </h4>
        {loading
          ? "Loading..."
          : studyGroups.map(({ id, name }) => (
              <LSideLinks key={id} to={`/group/${id}`}>
                <HiOutlineLightBulb size={18} />
                <p title={name}>{name}</p>
              </LSideLinks>
            ))}
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
  top: 100px;
  background-color: #f2f2f2;
  width: 300px;
  min-width: 300px;
  border-radius: 10px;
  flex-direction: column;
  height: max-content;
  padding: 29px;
  .button-icon {
    color: #0e5937;
  }
`;

const LSideItem = styled.div`
  display: flex;
  flex-direction: column;
  h4 {
    color: #646464;
    text-align: left;
    font-size: 22px;
    display: flex;
    margin: 0;
    margin-bottom: 20px;
    font-weight: normal;
    button {
      justify-content: flex-end;
      margin-left: auto;
      padding: 0;
      border: none;
      background: none;
      cursor: pointer;
    }
  }
`;

const LSideLinks = styled(Link)`
  color: #0f482f;
  text-align: center;
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
  text-decoration: none;
  p {
    font-size: 18px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 0;
  }
`;

const Line = styled.hr`
  display: flex;
  margin: 20px 0;
  color: #e8e8e8;
`;
export default LeftSideBar;
