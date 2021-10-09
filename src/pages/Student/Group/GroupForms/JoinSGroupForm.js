import styled from "styled-components";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useHistory } from "react-router";

import { JOIN_STUDY_GROUP } from "../gql";

const JoinSGroupForm = () => {
  const history = useHistory();

  const [joinStudyGroup, { loading }] = useMutation(JOIN_STUDY_GROUP);

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    console.log(data);

    const { groupCode } = data;

    try {
      const { data } = await joinStudyGroup({
        variables: {
          groupCode,
        },
      });

      if (data?.joinStudyGroup?.id) {
        toast.success("Joined group successfully");
        history.push(`/group/${data?.joinStudyGroup?.id}`);
      } else {
        throw Error("something is wrong");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Group Code</label>
        <input {...register("groupCode", { required: true })} />
      </div>
      <div>
        <label>Group Name</label>
        <input disabled />
      </div>
      <div>
        <label>Admin</label>
        <input disabled />
      </div>

      <button disabled={loading}>Submit</button>
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
