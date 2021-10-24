import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";

import { STUDENTS_WITHOUT_GROUP, CREATE_CLASS_GROUP } from "./gql";

const CreateClassGroupForm = ({ courseId, onCreateFinish }) => {
  const [createClassGroup, { loading: mutationLoading }] =
    useMutation(CREATE_CLASS_GROUP);
  const { data, loading, refetch } = useQuery(STUDENTS_WITHOUT_GROUP, {
    variables: { courseId },
  });
  const students = data?.studentsWithoutGroup?.data ?? [];
  const [items, setItems] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await createClassGroup({
        variables: { courseId, studentIds: items.map(({ value }) => value) },
      });

      if (data?.createClassGroup?.id) {
        toast.success("Created group");
        onCreateFinish();
        refetch();
      } else {
        throw Error("Something is wrong");
      }
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <div>
        <label>Members</label>
        <MultiSelect
          items={items}
          setItems={setItems}
          students={students}
          loading={loading}
        />
      </div>
      <button disabled={mutationLoading}>
        {mutationLoading ? "Creating..." : "Submit "}
      </button>
    </Form>
  );
};

const Form = styled.form`
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 500px;

  label {
    display: inline-block;
    width: 140px;
  }

  button {
    color: white;
    border: none;
    background-color: #0e5937;
    width: 100px;
    padding: 0.4em;
    font-size: 15px;
    margin-left: auto;
    cursor: pointer;
    margin-top: 10px;
  }
`;

export default CreateClassGroupForm;

const MultiSelectContainer = styled.div`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
  height: max-content;
  width: 100%;
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

const Item = styled.div`
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

const Dropdown = styled.div`
  position: absolute;
  background-color: #0f482f;
  color: white;
  top: 100%;
`;

const DropdownItem = styled.div`
  padding: 8px;
  cursor: pointer;
  :hover {
    background-color: #0004;
  }
`;

const MultiSelect = ({ items, setItems, students, loading }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [handleBlur, setHandleBlur] = useState(null);
  const [inputValue, setInputValue] = useState("");

  const filteredStudents = students
    .map(({ id, user }) => ({
      id,
      name: `${user.firstName} ${user.lastName}`,
    }))
    .filter(({ id }) => !items.map(({ value }) => value).includes(id))
    .filter(({ name }) =>
      name.toLowerCase().includes(inputValue.toLowerCase())
    );

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);
  };

  const removeItem = (value) => {
    setItems(items.filter((item) => item.value !== value));
  };

  const addItem = (item) => {
    setItems([...items, item]);
    setInputValue("");
  };

  const handleKeyDown = (e) => {
    // ENTER
    if (e.keyCode === 13) {
      e.preventDefault();
      const studentToAdd = filteredStudents[0];
      if (studentToAdd)
        addItem({ label: studentToAdd.name, value: studentToAdd.id });
    }

    // BACKSPACE
    if (e.keyCode === 8 && inputValue === "") {
      const newItems = [...items];
      newItems.pop();
      setItems(newItems);
    }
  };

  return (
    <MultiSelectContainer
      onClick={(e) => {
        e.target?.querySelector("input")?.focus();
      }}
    >
      {items.map(({ label, value }) => (
        <Item>
          {label}
          <span onClick={() => removeItem(value)}>✖</span>
        </Item>
      ))}

      <input
        onKeyDown={handleKeyDown}
        onFocus={() => {
          setShowDropdown(true);
          clearTimeout(handleBlur);
        }}
        onBlur={() =>
          setHandleBlur(setTimeout(() => setShowDropdown(false), 100))
        }
        placeholder="Student"
        value={inputValue}
        onChange={handleInputChange}
      />

      <Dropdown style={{ display: showDropdown ? "block" : "none" }}>
        {loading ? (
          <DropdownItem>Loading...</DropdownItem>
        ) : filteredStudents.length === 0 ? (
          <DropdownItem>Empty</DropdownItem>
        ) : (
          filteredStudents.map(({ name, id }) => (
            <DropdownItem
              onClick={() =>
                addItem({
                  label: name,
                  value: id,
                })
              }
            >
              {name}
            </DropdownItem>
          ))
        )}
      </Dropdown>
    </MultiSelectContainer>
  );
};
