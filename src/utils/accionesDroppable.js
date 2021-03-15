let reordenar = (lista, inicioIndex, finIndex) => {
  const resultado = [...lista]
  const [removido] = resultado.splice(inicioIndex, 1)
  resultado.splice(finIndex,0, removido)
  return resultado
}

let mover = (listaOrigen, listaDestino, droppableOrigen, droppableDestino) => {
  const listaOrigenTmp = [...listaOrigen]
  const listaDestinoTmp = [...listaDestino]
  const [itemAPasar] = listaOrigenTmp.splice(droppableOrigen.index, 1)
  listaDestinoTmp.splice(droppableDestino.index, 0, itemAPasar)

  const resultado = {
    [droppableOrigen.droppableId]:listaOrigenTmp,
    [droppableDestino.droppableId]:listaDestinoTmp
  }
  return resultado
}

export {
  reordenar,
  mover
}