import React from "react";
import styled from "styled-components";
import RightSideBar from "./RightSideBar";
import Feed from "./Feed";
import LeftSideBar from "./LeftSideBar";

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
  display: flex;
  justify-content: center;
  margin: 0 30px;
`;

export default Home;
