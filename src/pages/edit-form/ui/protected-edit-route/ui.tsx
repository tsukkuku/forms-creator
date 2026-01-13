import type { FormData } from "@/shared/model";
import { getAuth } from "firebase/auth";
import { doc, DocumentReference, getFirestore } from "firebase/firestore";
import { type ReactNode } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Navigate } from "react-router-dom";

interface ProtectedEditRouteProps {
  formID: string;
  children: ReactNode;
}

export const ProtectedEditRoute = ({
  formID,
  children,
}: ProtectedEditRouteProps) => {
  const db = getFirestore()
  const { currentUser } = getAuth();
  const [data, loading] = useDocumentData(
    doc(db, "forms", formID) as DocumentReference<FormData>
  );

  if (loading) return <h1>Loading...</h1>;

  if (currentUser?.uid !== data?.creatorID) {
    return <Navigate to={`/form/${formID}`} />;
  }

  return <>{children}</>;
};
