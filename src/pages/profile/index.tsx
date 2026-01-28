import { Forms } from "./ui/forms";
import { ProtectedRoute } from "@/features/login";

const Profile = () => {
  return (
    <ProtectedRoute>
      <title>Профиль</title>
      <Forms />
    </ProtectedRoute>
  );
};

export default Profile;
