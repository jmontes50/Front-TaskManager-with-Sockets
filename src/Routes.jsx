import React, {Fragment} from 'react'
import { Route, Redirect } from "react-router-dom"
import TareasView from "./views/TareasView"
import LoginView from "./views/LoginView"
import InicioView from "./views/InicioView"
import UsuariosView from "./views/UsuariosView"

export default function Routes() {
  return (
    <Fragment>
      <Route path='/' exact component={InicioView} />
      <Route path='/tareas/:id' exact component={TareasView} />
      <Route path='/login' exact component={LoginView} />
      <Route path='/usuarios' exact component={UsuariosView}/>
    </Fragment>
  )
}
