import { ProtectedRoute } from "@/features/login";
import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";

const CreateFormPage = () => {
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      Form
      <Button onClick={() => navigate(-1)}>Back</Button>
    </ProtectedRoute>
  );
};

export default CreateFormPage;
