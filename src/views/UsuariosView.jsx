import React, { useState, useEffect, useContext } from "react";
import { obtenerUsuarios } from "../services/usuarioService";
import Loading from "../components/Loading";
import { Link, Redirect } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export default function UsuariosView() {
  const [usuarios, setUsuarios] = useState([]);
  const [redireccionar, setRedireccionar] = useState(null);

  const { userState } = useContext(AuthContext);

  const getUsuarios = async () => {
    try {
      const { content } = await obtenerUsuarios();
      setUsuarios(content);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (!userState) {
      setRedireccionar("/login");
    }
  }, [userState]);

  useEffect(() => {
    getUsuarios();
  }, []);

  if (redireccionar) {
    return <Redirect to={redireccionar} />;
  }


  return (
    <div className="container">
      {usuarios.length === 0 ? (
        <Loading />
      ) : (
        <div className="mt-4">
          <h1 className="poppins">Usuarios</h1>
          <p className="poppins">
            Elije un usuario para ver sus tareas
          </p>
          <div className="row">
          
          {/* {Como guardo en el nombre el uid y el displayName al separarlos con split puedo utilizar el ID y el displayName} */}
          {usuarios.map((usuario, i) => (
            <div className="col-12 col-lg-6 col-xl-4">
              <Link to={`/tareas/${usuario.usuario_id}`} key={i} className="card mb-4 nav-link">
                <div className="card-body">
                  <h4>{usuario.usuario_nombre.split(".")[1]}</h4>
                </div>
              </Link>
            </div>
          ))}
        </div>
        </div>
        
      )}
    </div>
  );
}
