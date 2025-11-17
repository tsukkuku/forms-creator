import { Content } from "./ui/ui";
import { ProtectedRoute } from "@/features/login";

const Profile = () => {
  return (
    <ProtectedRoute>
      <Content />
    </ProtectedRoute>
  );
};

export default Profile;
