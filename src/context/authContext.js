import React, { createContext, useEffect, useState } from "react"
import { firebase, auth } from "../config/Firebase"
import {
  crearUsuario,
  obtenerUsuarios,
  elUsuarioExiste,
} from "../services/usuarioService"
import Loading from "../components/Loading"

const proveedorGoogle = new firebase.auth.GoogleAuthProvider()

export const AuthContext = createContext(null)

export const AuthProvider = (props) => {
  const [userState, setUserState] = useState(null)
  const [authPending, setAuthPending] = useState(true)

  const signInWithGoogle = async () => {
    const { user } = await auth.signInWithPopup(proveedorGoogle) //logeo con google
    const { content } = await obtenerUsuarios() //obtengo los usuarios registrados
    const uidName = `${user.uid}.${user.displayName}` //aquí estaba limitado a un solo campo en el modelo de la DB asi que he juntado ambas cosas
    if (elUsuarioExiste(uidName, content)) {
      //reviso si ya existe
      return
    } else {
      await crearUsuario(uidName) //en caso de no registro nuevo usuario con el uid y el nombre, 
    }
  }

  const signUp = (username, password) => {
    return auth.createUserWithEmailAndPassword(username, password)
  }

  const signOut = () => auth.signOut()

  useEffect(() => {
    return auth.onAuthStateChanged((userAuth) => {
      setUserState(userAuth)
      setAuthPending(false)
    })
  }, [])

  if (authPending) {
    return <Loading />
  }

  return (
    <AuthContext.Provider
      value={{
        signInWithGoogle: signInWithGoogle,
        signUp: signUp,
        signOut: signOut,
        userState: userState,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  )
}
