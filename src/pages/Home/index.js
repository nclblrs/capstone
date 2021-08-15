import React from "react";
import styled from "styled-components";
import LeftSideBar from "./LeftSideBar";
import RightSideBar from "./RightSideBar";
import Feed from "./Feed";

const Home = () => {
  return (
    <HomeContainer>
      <LeftSideBar />
      <Feed />
      <RightSideBar />
    </HomeContainer>
  );
};
const HomeContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: center;
`;
export default Home;
