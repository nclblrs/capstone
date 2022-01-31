import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { GRADE_GROUPSUBMISSION } from "../gql";
import { toast } from "react-toastify";

const GradeSubmissionForm = ({ groupSubmissionId, onCreateFinish }) => {
  const { register, handleSubmit } = useForm();

  const [gradeGroupSubmission, { loading }] = useMutation(
    GRADE_GROUPSUBMISSION
  );

  const handleGradeGroupSubmission = async (data) => {
    const { grade } = data;

    try {
      const { data } = await gradeGroupSubmission({
        variables: {
          groupSubmissionId,
          grade: parseInt(grade),
        },
      });

      if (!data?.gradeGroupSubmission?.id) throw Error("something is wrong");

      toast.success("Created Grade");
      onCreateFinish();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(handleGradeGroupSubmission)}>
      <div>
        <label>Grade</label>
        <input
          type="number"
          {...register("grade", {
            required: true,
            min: 0,
          })}
        />
      </div>
      <button disabled={loading}>{loading ? "Creating..." : "Submit "}</button>
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

export default GradeSubmissionForm;
