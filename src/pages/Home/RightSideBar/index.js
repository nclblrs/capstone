import React from "react";
import styled from "styled-components";

const RightSideBar = () => {
  return (
    <div>
      <RSideContainer></RSideContainer>
    </div>
  );
};

const RSideContainer = styled.div`
  height: 350px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 90px;
  background-color: white;
  width: 15em;
  border-radius: 10px;
`;

export default RightSideBar;
