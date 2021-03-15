import React,{useContext} from "react";
import {AuthContext} from "../context/authContext"
import { Modal, Button } from "react-bootstrap"
import { useForm } from "react-hook-form"
import { obtenerUsuario } from "../services/usuarioService"

export default function FormularioTarea({ show, handleClose, crearTarea }) {
  let { register, handleSubmit, errors } = useForm()

  const {userState} = useContext(AuthContext)

  let escucharSubmit = async (data) => {
    const uidName = `${userState.uid}.${userState.displayName}`
    const {usuario_id} = await obtenerUsuario(uidName)
    let nuevaTarea = {
      ...data,
      estado:JSON.parse(data.estado),
      usuario: usuario_id
    }
    crearTarea(nuevaTarea)
    handleClose()
  }

  return (
    <div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(escucharSubmit)}>
            <div className="form-group">
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                name="titulo"
                id="titulo"
                placeholder="Ej. Programar Reunión"
                className="form-control"
                ref={register({ required: true })}
              />
              {errors.titulo &&
                errors.titulo.type === "required" && (
                  <small className="text-danger">Es obligatorio!!</small>
                )}
            </div>
            <div className="form-group">
              <label htmlFor="descripcion">Descripción</label>
              <input
                type="text"
                name="descripcion"
                id="descripcion"
                placeholder="Ej. Programar Reunión Día Jueves para el Webinar!!!!!"
                className="form-control"
                ref={register({ required: true })}
              />
              {errors.descripcion &&
                errors.descripcion.type === "required" && (
                  <small className="text-danger">Es obligatorio!!</small>
                )}
            </div>
            <div className="form-group">
              <label>Estado Civil</label>
              <select
                name="estado"
                className="form-control"
                ref={register({ required: true })}
              >
                <option value={false} defaultValue>
                  Por Hacer
                </option>
                <option value={true}>Finalizado</option>
              </select>
              {errors.estado && errors.estado.type === "required" && (
                <small className="text-danger">Es obligatorio!!</small>
              )}
            </div>
            <hr />
            <div className="d-flex justify-content-end">
              <Button
                variant="secondary"
                onClick={handleClose}
                className="mr-2"
              >
                Cerrar
              </Button>
              <Button variant="primary" type="submit">
                Guardar
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
