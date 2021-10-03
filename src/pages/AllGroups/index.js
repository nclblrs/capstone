import React from "react";
import styled from "styled-components";

const AllGroups = () => {
  return (
    <PageContainer>
      <MainContainer>
        <div className="buttoncontainer">
          <p>ALL GROUPS</p>
        </div>
        <div className="itemcontainer"></div>
      </MainContainer>
    </PageContainer>
  );
};

const PageContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const MainContainer = styled.div`
  margin: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 95%;
  border-radius: 10px;
  height: 600px;
  padding: 1em;

  .buttoncontainer {
    display: flex;
    width: 100%;
    height: 80px;
    padding: 10px;
    button {
    }
    > p {
      font-size: 20px;
    }
  }

  .itemcontainer {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin: 2em;
    li {
      padding: 10px 8px;
    }
  }
  .items {
    border-radius: 1em;
    flex-direction: column;
    display: flex;
    padding: 2em;
    width: 24%;
    background-color: #f2f2f2;
    height: 250px;
    margin-bottom: 20px;
    text-decoration: none;
    justify-content: space-between;

    :hover {
      background-color: #e8e8e8;
    }
    > p {
      color: #646464;
      font-size: 20px;
      margin: 10px 0;
    }

    h1 {
      font-weight: bold;
      color: #0f482f;
      font-size: 24px;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      margin: 0;
    }
  }
`;

export default AllGroups;
