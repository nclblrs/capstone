import React from "react";
import styled from "styled-components";
import { BsPaperclip } from "react-icons/bs";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";
import { CREATE_AGENDA, AGENDA_ATTACHMENT } from "./gql";
import { upload } from "utils/upload";
import { toast } from "react-toastify";
import { useCurrentUserContext } from "contexts/CurrentUserContext";

const AddAgendaForm = ({ onCreateFinish }) => {
  const { user } = useCurrentUserContext();
  const { register, watch, handleSubmit } = useForm();
  const attachedFileName = watch("file", false)?.[0]?.name ?? undefined;

  const [createAgenda, { loading: createAgendaLoading }] =
    useMutation(CREATE_AGENDA);
  const [addAttachmentToAgenda] = useMutation(AGENDA_ATTACHMENT);

  const loading = createAgendaLoading;

  const handleCreateAgenda = async (data) => {
    const { title, endsAt, description, file: files } = data;
    const file = files[0];

    try {
      const { data: createAgendaData } = await createAgenda({
        variables: {
          title,
          description,
          endsAt,
        },
      });

      const agendaId = createAgendaData?.createAgenda?.id;

      if (!agendaId) throw Error("something wrong");

      if (file) {
        const { cloudinaryString } = await upload(
          file,
          user.uploadPreset,
          `Agenda_${agendaId}`
        );

        const { data: addAttachmentToAgendaData } = await addAttachmentToAgenda(
          {
            variables: { id: agendaId, attachment: cloudinaryString },
          }
        );

        if (!addAttachmentToAgendaData?.addAttachmentToAgenda?.id)
          throw Error("something is wrong");
      }

      toast.success("Create Agenda");
      onCreateFinish();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <Form onSubmit={handleSubmit(handleCreateAgenda)}>
      <div>
        <label>Agenda Title</label>
        <input {...register("title", { required: true })} />
      </div>
      <div>
        <label>Due</label>
        <input type="datetime-local" {...register("endsAt")} />
      </div>
      <div>
        <label>Description</label>
        <input className="desc" {...register("description")} />
      </div>
      <div>
        <label className="file"> File </label>
        <label className="attachmentLabel">
          {attachedFileName ? attachedFileName : "Attach File"}
          <BsPaperclip size={15} className="attachicon" />
        </label>
        <input
          id="attach-file-agenda"
          type="file"
          {...register("file")}
          className="attachmentInput"
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

export default AddAgendaForm;
