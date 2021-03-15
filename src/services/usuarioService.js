import axios from "axios"

const URL = "https://task-manager-backend-webinar.herokuapp.com/usuario"
// const URL = "http://localhost:5000/usuario"

const crearUsuario = async (uid) => {
  try{
    let headers = {
      "Content-Type": "application/json"
    }
    let objUsuario = {
      usuario_nombre:uid
    }
    let {data} = await axios.post(URL, objUsuario, {headers} )
    console.log(data)
  }catch(error){
    console.log(error)
  }
}

let obtenerUsuarios = async () => {
  try {
    let {data} = await axios.get(`http://localhost:5000/usuarios`)
    // console.log("obtenerUsuarios",{data})
    return data
  } catch (error) {
    console.log(error)
  }
}

let elUsuarioExiste = (uid, Usuarios) => {
  let uids = Usuarios.map(({usuario_nombre}) => usuario_nombre)
  let contiene = uids.includes(uid) //retorna true/false según si el usuario existe
  return contiene
}

let obtenerUsuario = async (uid) => {
  let {content} = await obtenerUsuarios()
  let usuarioEncontrado = content.find((usuario)=> usuario.usuario_nombre === uid)
  return usuarioEncontrado
}

export {
  crearUsuario,
  obtenerUsuarios,
  elUsuarioExiste,
  obtenerUsuario
}
