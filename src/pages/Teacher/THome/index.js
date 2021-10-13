import React from "react";
import styled from "styled-components";
import RightSideBar from "./RightSideBar";
import Feed from "./Feed";

const Home = () => {
  return (
    <HomeContainer>
      <Feed />
      <RightSideBar />
    </HomeContainer>
  );
};
const HomeContainer = styled.div`
  display: flex;
  width: 100%;
`;

export default Home;
