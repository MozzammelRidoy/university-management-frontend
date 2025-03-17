import { Button, Row } from "antd";
import PHForm from "../components/form/PHForm";
import PHInput from "../components/form/PHInput";
import { useChangePasswordMutation } from "../redux/features/admin/userManagement_Api";
import { useAppDispatch } from "../redux/hooks";
import { logout } from "../redux/features/auth/authSlice";
import { toast } from "sonner";
import { Navigate, useNavigate } from "react-router-dom";

const ChangePassword = () => {
  const [changePassword] = useChangePasswordMutation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onSubmit = async (data) => {
    const toastId = toast.loading("Changing...");
    const res = await changePassword(data);
    if (res?.data?.success) {
      dispatch(logout());
      toast.success(res?.data?.message || "Password Change Success", {
        id: toastId,
        duration: 1000,
      });
      navigate("/login");
    }
    toast.dismiss(toastId);
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PHForm onSubmit={onSubmit}>
        <PHInput type={"text"} name={"oldPassword"} label={"Old Password"} />

        <PHInput type={"text"} name={"newPassword"} label={"New Password"} />

        <Button htmlType="submit">Password Change</Button>
      </PHForm>
    </Row>
  );
};

export default ChangePassword;
