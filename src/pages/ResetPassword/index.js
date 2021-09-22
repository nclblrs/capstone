import { useMutation } from "@apollo/client";
import { useParams } from "react-router";

import { RESET_PASSWORD } from "./gql";

const ResetPassword = () => {
  const { token } = useParams();
  const [resetPassword, { loading }] = useMutation(RESET_PASSWORD);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPassword = e.target.newPassword.value;

    try {
      const { data } = await resetPassword({
        variables: { token, newPassword },
      });

      if (!data) {
        console.log("something is wrong");
        return;
      }

      alert("successfully changed password");
      window.location.href = "/login";
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="password" placeholder="New password" name="newPassword" />
      <button type="submit" disabled={loading}>
        Reset Password
      </button>
    </form>
  );
};

export default ResetPassword;
