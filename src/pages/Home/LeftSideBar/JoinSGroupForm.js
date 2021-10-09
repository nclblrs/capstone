import styled from "styled-components";

const JoinSGroupForm = () => {
  return (
    <Form>
      <div>
        <label>Group Code</label>
        <input />
      </div>
      <div>
        <label>Group Name</label>
        <input disabled />
      </div>
      <div>
        <label>Admin</label>
        <input disabled />
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

export default JoinSGroupForm;
