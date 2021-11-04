import React, { useState } from "react";
import styled from "styled-components";
import { BsPaperclip } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { upload } from "utils/upload";
import { useCurrentUserContext } from "contexts/CurrentUserContext";
import { SUBMIT_GROUPSUBMISSION } from "../gql";
import { toast } from "react-toastify";

const SubmitGroupSubmissionForm = ({ onCreateFinish, groupSubmissionId }) => {
  const { user } = useCurrentUserContext();
  const { register, watch, handleSubmit } = useForm();
  const attachedFileName = watch("file", false)?.[0]?.name ?? undefined;
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitGroupSubmission] = useMutation(SUBMIT_GROUPSUBMISSION);
  console.log(groupSubmissionId);
  const handleSubmitGroupSubmission = async (data) => {
    const { description, file: files } = data;
    const file = files[0];

    try {
      setIsSubmitting(true);
      let attachment = undefined;
      if (file) {
        const { cloudinaryString } = await upload(
          file,
          user.uploadPreset,
          `GroupSubmission_${groupSubmissionId}`
        );
        attachment = cloudinaryString;
      }
      const { data: submitGroupSubmissionData } = await submitGroupSubmission({
        variables: {
          groupSubmissionId: groupSubmissionId,
          attachment,
          description,
        },
      });

      const groupSubmissionsId =
        submitGroupSubmissionData?.submitGroupSubmission?.id;

      if (!groupSubmissionsId) throw Error("something is wrong");

      toast.success("Created Submission");
      onCreateFinish();
    } catch (error) {
      toast.error(error.message);
    }

    setIsSubmitting(false);
  };

  return (
    <Form onSubmit={handleSubmit(handleSubmitGroupSubmission)}>
      <div>
        <label className="file"> File </label>
        <label for="attach-file-submission" className="attachmentLabel">
          {attachedFileName ? attachedFileName : "Attach File"}
          <BsPaperclip size={15} className="attachicon" />
        </label>
        <input
          id="attach-file-submission"
          type="file"
          {...register("file")}
          className="attachmentInput"
        />
      </div>
      <div>
        <label>Description</label>
        <input
          className="desc"
          {...register("description", { required: true })}
        />
      </div>
      <button disabled={isSubmitting}>
        {isSubmitting ? "Creating..." : "Submit "}
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

export default SubmitGroupSubmissionForm;
