import styled from "styled-components";

const CreateClassGroupForm = () => {
  return (
    <Form>
      <div>
        <label>Group Name</label>
        <input />
      </div>
      <div>
        <label>Members</label>
        <input className="members" />
      </div>
      <button>Submit</button>
    </Form>
  );
};

const Form = styled.form`
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
  .members {
    height: 70px;
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
