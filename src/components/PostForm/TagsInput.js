import { useState } from "react";
import styled from "styled-components";

const TagsInput = ({ tags, setTags }) => {
  const [inputValue, setInputValue] = useState("");

  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleInputChange = (e) => {
    const value = e.target.value
      ? e.target.value.replace(/[^0-9a-zA-Z]+/gi, "")
      : "";

    setInputValue(value.toLowerCase());
  };

  const handleKeyDown = (e) => {
    // ENTER
    if (e.keyCode === 13) {
      e.preventDefault();
      addTag(inputValue);
    }

    // BACKSPACE
    if (e.keyCode === 8 && inputValue === "") {
      const newTags = [...tags];
      newTags.pop();
      setTags(newTags);
    }
  };

  const addTag = (tag) => {
    if (tag === "" || tags.includes(tag)) return;

    setTags([...tags, tag]);
    setInputValue("");
  };

  return (
    <TagsContainer
      onClick={(e) => {
        e.target?.querySelector("input")?.focus();
      }}
    >
      {tags.map((tagName, index) => (
        <Tag key={index} name={tagName} removeTag={removeTag} />
      ))}
      <input
        onKeyDown={handleKeyDown}
        placeholder="Tag"
        value={inputValue}
        onChange={handleInputChange}
      />
    </TagsContainer>
  );
};

const Tag = ({ name, removeTag }) => {
  return (
    <TagContainer>
      #{name}
      <span onClick={() => removeTag(name)}>✖</span>
    </TagContainer>
  );
};

export default TagsInput;

const TagContainer = styled.div`
  padding: 10px;
  display: flex;
  align-items: center;
  background-color: #f2f2f2;
  border-radius: 10px;
  height: 30px;

  > span {
    width: 100%;
    cursor: pointer;
    text-align: right;
    color: white;
    background-color: #a2a2a2;
    border-radius: 50%;
    font-size: 10px;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 4px;
    :hover {
      color: black;
    }
  }
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  height: max-content;
  width: 400px;
  background: white;
  border: 1px black solid;
  padding: 4px;
  cursor: text;

  > input {
    height: 30px;
    outline: none;
    border: none;
    width: 100px;
  }
`;
