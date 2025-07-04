import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "@/firebase";

const Login = () => {
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  onAuthStateChanged(auth, (user) => {
    if (user) navigate("/dashboard");
  });

  const login = () => {
    signInWithPopup(auth, provider).then(
      () => {
        navigate("/dashboard");
      },
      (error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode);
        console.error(errorMessage);
      }
    );
  };

  return (
    <div className="flex">
      <div className="bg-primary h-screen w-1/2 p-2">
        <h1 className="text-secondary font-bold text-3xl">
          CMS - Mozelli Marketing
        </h1>
      </div>
      <div className="flex items-center mx-auto">
        <div className="flex flex-col">
          <button
            type="submit"
            onClick={login}
            className="bg-primary text-secondary p-2 mt-6 rounded-xs hover:cursor-pointer hover:bg-secondary-foreground"
          >
            Entrar com o Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
