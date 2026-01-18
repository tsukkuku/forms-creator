import { Forms } from "./ui/forms";
import { ProtectedRoute } from "@/features/login";

const Profile = () => {
  return (
    <ProtectedRoute>
      <Forms />
    </ProtectedRoute>
  );
};

export default Profile;
