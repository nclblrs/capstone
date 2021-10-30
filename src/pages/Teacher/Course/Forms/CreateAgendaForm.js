import React from "react";
import styled from "styled-components";
import Dropdown, { DropdownButtons } from "components/Dropdown";
import { FaPenSquare } from "react-icons/fa";

const CreateAgendaForm = () => {
  return (
    <Form>
      <div>
        <label>Agenda Title</label>
        <input type="text" name="Agendatitle" />
      </div>
      <div>
        <label for="Start Time">Start Time</label>
        <input type="datetime-local" />
      </div>
      <div>
        <label for="End Time">End Time</label>
        <input type="datetime-local" />
      </div>
      <div>
        <label> Share </label>
        <Dropdown
          popperComponent={
            <DropdownButtons>
              <button>Group Name 1</button>
              <button>Group Name 2</button>
            </DropdownButtons>
          }
        >
          <button className="Sharebutton">
            Select Group &nbsp;
            <FaPenSquare size={20} color="#0e5937" class="pen" />
          </button>
        </Dropdown>
      </div>
      <div>
        <label>Description</label>
        <input className="desc" />
      </div>
    </Form>
  );
};

const Form = styled.form`
  width: 100%;
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: inline-block;
    width: 140px;
  }

  input {
    width: 400px;
    font-size: 16px;
  }

  button,
  select {
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
  select {
    width: 140px;
    margin-top: 5px;
    text-overflow: ellipsis;
  }
  option {
    text-overflow: ellipsis;
  }
  .attachmentLabel {
    font-size: 15px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    align-items: center;
    justify-content: center;
    background-color: #0e5937;
    color: white;
    border: none;
    text-align: center;
    cursor: pointer;
    outline: none;
    padding: 5px 20px;
    height: 32px;
    margin: 5px 0 5px 0;
    position: absolute;
  }
  .attachmentInput {
    visibility: hidden;
  }
  .desc {
    height: 100px;
    margin-top: 10px;
  }
  .attachicon {
    padding-left: 10px;
    width: 24px;
    text-align: center;
  }
  .file {
    margin-top: 10px;
  }
`;

export default CreateAgendaForm;
