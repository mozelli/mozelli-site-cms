import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { app } from "./firebase";
import type { JSX } from "react";

interface Props {
  children: JSX.Element;
}

export default function PrivateRoutes({ children }: Props) {
  const auth = getAuth(app);
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Carregando...</p>;

  return user ? children : <Navigate to="/login" replace />;
}
