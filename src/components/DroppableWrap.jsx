import React from "react";
import { Droppable, Draggable } from "react-beautiful-dnd"
import Swal from "sweetalert2"

const obtenerEstilosItem = (isDragging, draggableStyle) => ({
  // cambia solo si se esta moviendo
  background: isDragging ? "lightblue" : null,
  //demás estilos del item
  ...draggableStyle,
});

const mostrarInfo = (titulo, descripcion,color) => {
  Swal.fire({
    title:titulo,
    text:descripcion,
    confirmButtonText:"Cerrar Ventana",
    confirmButtonColor:color
  })
}

export default function DroppableWrap({
  droppableId,
  listaTareas,
  titulosLista,
  posicion,
}) {

  return (
    <div className="col-12 col-lg-6">
      <h3 className="tarea-titulo medium p-3">
        {titulosLista[posicion].titulo}
      </h3>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className=""
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {listaTareas.map(({ tarea_id, tarea_titulo, tarea_descripcion }, index) => {
              return (
                <Draggable key={tarea_id} draggableId={`${tarea_id}`} index={index}>
                  {(provided, snapshot) => (
                    <div
                      className="tarea-item poppins p-3 m-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={obtenerEstilosItem(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <div
                        style={{
                          backgroundColor: titulosLista[posicion].color,
                        }}
                      ></div>
                      <div className="d-flex justify-content-between">
                        <h6>{tarea_titulo}</h6>
                        <button 
                          className="btn btn-outline-secondary btn-sm"
                          onClick={()=>{mostrarInfo(tarea_titulo,tarea_descripcion,titulosLista[posicion].color)}}
                        >
                          Ver Más
                        </button>
                      </div>
                      {/* <p className="light">{descripcion.slice(0, 70)}... </p> */} 
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}
