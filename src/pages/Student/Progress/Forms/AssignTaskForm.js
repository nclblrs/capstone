import React, { useState } from "react";
import styled from "styled-components";

import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_GROUPSUBMISSION, CREATE_TASK } from "../gql";
import { toast } from "react-toastify";

const AssignTaskForm = ({ onCreateFinish }) => {
  const { groupSubmissionId } = useParams();
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { loading, data } = useQuery(GET_GROUPSUBMISSION, {
    variables: { groupSubmissionId: groupSubmissionId },
  });
  const [createTask] = useMutation(CREATE_TASK);

  const { group } = data?.groupSubmission ?? {};
  const { students } = group ?? {};
  const studentsInfo = students?.data ?? [];
  const handleCreateTask = async (data) => {
    const { note, dueAt, studentId, title } = data;

    try {
      setIsSubmitting(true);
      const { data: createTaskData } = await createTask({
        variables: {
          groupSubmissionId: groupSubmissionId,
          note,
          dueAt,
          studentId,
          title,
        },
      });

      const groupSubmissionsId = createTaskData?.createTask?.id;

      if (!groupSubmissionsId) throw Error("something is wrong");

      toast.success("Created Task");
      onCreateFinish();
    } catch (error) {
      toast.error(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit(handleCreateTask)}>
      <div>
        <label>Task Title</label>
        <input className="title" {...register("title")} />
      </div>
      <div>
        <label>Due</label>
        <input type="datetime-local" className="due" {...register("dueAt")} />
      </div>
      <div>
        <label>Member</label>
        <select {...register("studentId", { required: true })}>
          <option disabled selected>
            Select Member
          </option>
          {loading
            ? "Loading..."
            : studentsInfo.map(({ id, user }) => (
                <option key={id} value={id}>
                  {user.firstName} {user.lastName}
                </option>
              ))}
        </select>
      </div>
      <div>
        <label>Description</label>
        <input className="desc" {...register("note")} />
      </div>
      <button disabled={isSubmitting}>
        {isSubmitting ? "Assigning..." : "Submit "}
      </button>
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

export default AssignTaskForm;
