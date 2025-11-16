import { Navigate } from "react-router-dom";
import { Content } from "./ui/ui";
import { useLogin } from "@/features/login";

const Profile = () => {
  const { user, isLoading } = useLogin();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Navigate to={"/"} replace />;
  }

  return <Content />;
};

export default Profile;
