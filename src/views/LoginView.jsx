import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Redirect } from "react-router-dom";

export default function LoginView() {
  const [redireccionar, setRedireccionar] = useState(null);
  const { userState, signInWithGoogle } = useContext(AuthContext);

  useEffect(() => {
    if (userState) {
      setRedireccionar("/usuarios");
    }
  }, [userState]);

  if (redireccionar) {
    return <Redirect to={redireccionar} />;
  }

  return (
    <div className="h-100 d-flex justify-content-center align-items-center">
      <div className="login-main">
        <h1 className="poppins semi-bold mb-4">Ingresa a TareasApp</h1>
        <button
          className="btn btn-danger btn-lg btn-block d-flex align-items-center justify-content-center poppins"
          onClick={signInWithGoogle}
        >
          <i className="fab fa-google mr-2"></i>
          Ingresa con Google
        </button>
      </div>
    </div>
  );
}
