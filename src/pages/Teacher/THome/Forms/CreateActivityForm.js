import styled from "styled-components";
import { BsPaperclip } from "react-icons/bs";
import { useForm } from "react-hook-form";

const CreateActivityForm = () => {
  const { register, watch } = useForm();
  const attachedFileName = watch("file", false)?.[0]?.name ?? undefined;

  return (
    <Form>
      <div>
        <label>Activity Name</label>
        <input />
      </div>
      <div>
        <label>Due Date</label>
        <input />
      </div>
      <div>
        <label>Activity Type</label>
        <select>
          <option Disabled Selected>
            Select Type
          </option>
          <option>Individual Activity</option>
          <option>Group Activity</option>
        </select>
      </div>
      <div>
        <label>Course</label>
        <select>
          <option Disabled Selected>
            Select Course
          </option>
        </select>
      </div>
      <div>
        <label>Total Points</label>
        <input />
      </div>
      <div>
        <label className="file"> File </label>
        <label for="attach-file-post" className="attachmentLabel">
          {attachedFileName ? attachedFileName : "Attach File"}
          <BsPaperclip size={15} className="attachicon" />
        </label>
        <input
          id="attach-file-post"
          type="file"
          {...register("file")}
          className="attachmentInput"
        />
      </div>
      <div>
        <label>Description</label>
        <input className="desc" />
      </div>

      <button>Submit</button>
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
    width: 130px;
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

export default CreateActivityForm;
