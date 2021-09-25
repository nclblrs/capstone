import { useMutation } from "@apollo/client";
import styled from "styled-components";
import { ADMIN_CREATE_USER } from "./gql";

const AddNewUserForm = ({ onCreateFinish }) => {
  const [adminCreateUser, { loading }] = useMutation(ADMIN_CREATE_USER);

  const onSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const middleName = e.target.middleName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const schoolIdNumber = e.target.schoolIdNumber.value;
    const type = e.target.type.value;

    console.log(firstName);
    console.log(middleName);
    console.log(lastName);
    console.log(email);
    console.log(schoolIdNumber);
    console.log(type);

    if (type === "admin") {
    } else {
      try {
        const { data } = await adminCreateUser({
          variables: {
            firstName,
            middleName,
            lastName,
            email,
            schoolIdNumber,
            isTeacher: type === "teacher",
          },
        });

        if (data?.adminCreateUser?.id) {
          alert("Created successfully");
          onCreateFinish();
        } else {
          alert("Something is wrong");
        }
      } catch (error) {
        alert(error);
      }
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <div>
        <label>First Name</label>
        <input name="firstName" />
      </div>
      <div>
        <label>Middle Name</label>
        <input name="middleName" />
      </div>
      <div>
        <label>Last Name</label>
        <input name="lastName" />
      </div>
      <div>
        <label>Email</label>
        <input name="email" />
      </div>
      <div>
        <label>School Number</label>
        <input name="schoolIdNumber" />
      </div>
      <div>
        <label>User Type</label>
        <select name="type">
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
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
  }
`;

export default AddNewUserForm;
