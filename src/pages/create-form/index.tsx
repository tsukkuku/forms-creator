import { ProtectedRoute } from "@/features/login";
import { Button } from "@/shared/ui";
import { useNavigate } from "react-router-dom";
import { FormHeader } from "./ui/form-header";

const CreateFormPage = () => {
  const navigate = useNavigate();

  return (
    <ProtectedRoute>
      <FormHeader />
      <Button onClick={() => navigate(-1)}>Back</Button>
    </ProtectedRoute>
  );
};

export default CreateFormPage;
