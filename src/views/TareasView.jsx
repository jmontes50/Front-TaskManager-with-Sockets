import React, { useState, useEffect, useContext } from "react";
import io from "socket.io-client";
import { useParams } from "react-router-dom";
import { DragDropContext } from "react-beautiful-dnd";
import { mover, reordenar } from "../utils/accionesDroppable";
import DroppableWrap from "../components/DroppableWrap.jsx";
import FormularioTarea from "../components/FormularioTarea";
import { AuthContext } from "../context/authContext";
import { Redirect } from "react-router-dom";
import Loading from "../components/Loading";

let ObjetoToArray = (objeto) => {
  let nuevoArray = Object.entries(objeto);
  return nuevoArray;
};

const ENDPOINT = "https://task-manager-backend-webinar.herokuapp.com/usuario";
let socket;

export default function TareasView() {
  const [estado, setEstado] = useState({
    tareasPorHacer: [],
    tareasFinalizadas: [],
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [redireccionar, setRedireccionar] = useState(null);
  const { userState } = useContext(AuthContext);

  const { id } = useParams();

  const iniciarConexionSockets = () => {
    socket = io(ENDPOINT);
    socket.emit("tareas", id);
  };

  useEffect(() => {
    if (!userState) {
      setRedireccionar("/login");
    }
  }, [userState]);

  useEffect(() => {
    iniciarConexionSockets();
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on("tareas", (tareas) => {
      const porHacer = tareas.filter((tarea) => tarea.tarea_estado === false);
      const finalizadas = tareas.filter((tarea) => tarea.tarea_estado === true);
      setEstado({ tareasPorHacer: porHacer, tareasFinalizadas: finalizadas });
    });
  });

  if (redireccionar) {
    return <Redirect to={redireccionar} />;
  }

  const obtenerLista = (nombre) => {
    return estado[nombre];
  };

  const crearTarea = (tareaNueva) => {
    socket.emit("nueva_tarea", tareaNueva);
  };

  const editarTarea = (tarea) => {
    let {
      tarea_id,
      tarea_titulo,
      tarea_descripcion,
      tarea_estado,
    } = tarea;
    let tareaEditada = {
      id: tarea_id,
      tarea: {
        titulo: tarea_titulo,
        estado: !tarea_estado,
        descripcion: tarea_descripcion,
        usuario: id, //id de params
      },
    }
    socket.emit("editar_tarea", tareaEditada);
  }

  const titulosLista = [
    { titulo: "Por Hacer", color: "#FF3838" },
    { titulo: "Terminado!", color: "#0AAAF4" },
  ];

  function handleOnDragEnd(result) {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      //en caso sea la misma lista
      let listaAManejar = obtenerLista(source.droppableId);
      const listaReordenada = reordenar(
        listaAManejar,
        source.index,
        destination.index
      );
      setEstado({ ...estado, [source.droppableId]: [...listaReordenada] });
    } else {
      //en caso sea otra lista
      let listaOrigen = obtenerLista(source.droppableId);
      let listaDestino = obtenerLista(destination.droppableId);
      const resultado = mover(listaOrigen, listaDestino, source, destination);
      editarTarea(listaOrigen[source.index]);
      setEstado({ ...estado, ...resultado });
    }
  }

  return (
    <div>
      {redireccionar !== null ? (
        <Loading />
      ) : (
        <div className="container pt-5">
          <button
            className="btn btn-primary btn-lg btn-agregar-tarea"
            onClick={handleShow}
          >
            <i className="fas fa-plus mr-2"></i>
            <span>Agregar Tarea</span>
          </button>
          <DragDropContext onDragEnd={handleOnDragEnd}>
            <div className="row">
              {ObjetoToArray(estado).map(([nombreLista, valores], i) => (
                <DroppableWrap
                  droppableId={nombreLista}
                  listaTareas={valores}
                  titulosLista={titulosLista}
                  posicion={i}
                  key={i}
                />
              ))}
            </div>
          </DragDropContext>
        </div>
      )}
      <FormularioTarea
        show={show}
        handleClose={handleClose}
        crearTarea={crearTarea}
      />
    </div>
  );
}
