import { useForms } from "@/shared/api";
import { getAuth } from "firebase/auth";
import { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedEditRouteProps {
  formID: string;
  children: ReactNode;
}

export const ProtectedEditRoute = ({
  formID,
  children,
}: ProtectedEditRouteProps) => {
  const [creatorID, setCreatorID] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = getAuth();
  const { getFormInfo } = useForms();

  useEffect(() => {
    const getCreator = async () => {
      try {
        const creator = await getFormInfo(formID);
        setCreatorID(creator.creatorID);
      } catch (e) {
        console.error("Error", e);
      } finally {
        setIsLoading(false);
      }
    };

    getCreator();
  }, [formID]);

  if (isLoading) return <h1>Loading...</h1>;

  if (currentUser?.uid !== creatorID) {
    return <Navigate to={`/form/${formID}`} />;
  }

  return <>{children}</>;
};
