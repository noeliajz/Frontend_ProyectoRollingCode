//Llamar a la variable de entorno
const URL_usuario = import.meta.env.VITE_API_USUARIOS
const URL_producto = import.meta.env.VITE_API_PRODUCTOS

// todas las consultas a la api las tiene este archivo
export const iniciarSesion = async (usuario) => {
    try {
      const respuesta = await fetch('http://localhost:4000/apiStock/',{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(usuario)
      });
  
      // Verificar si la respuesta es válida
      if (!respuesta.ok) {
        throw new Error('Error en la respuesta de la API: ' + respuesta.status);
      }
  
      // Verificar que el Content-Type sea JSON antes de parsear
      const contentType = respuesta.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        const listaUsuarios = await respuesta.json();
  
        // Buscar el usuario por email
        const usuarioBuscado = listaUsuarios.find((itemUsuario) => itemUsuario.email === usuario.email);
        if (usuarioBuscado) {
          // Verificar contraseña
          if (usuarioBuscado.password === usuario.password) {
            return usuarioBuscado;
          } else {
            console.log('Contraseña incorrecta');
            return null;
          }
        } else {
          console.log('El email no existe');
          return null;
        }
      } else {
        throw new Error('La respuesta no es un JSON válido');
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  

export const obtenerListaProductos = async() => {
    try {
        const respuesta = await fetch(URL_producto);
        const listaProductos = await respuesta.json();
        return listaProductos;
    } catch (error) {
        console.log(error);
    }
}

export const crearProducto = async(producto)=>{
    try{
        const respuesta = await fetch(URL_producto,{
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                "Authorization": "Bearer ${}"
            },
            body: JSON.stringify(producto)
        });
      return respuesta; // el status de la respuesta 201
    }catch(error){
        console.log(error)
    }
}
export const editarProducto = async(producto, id)=>{
    try{
        const respuesta = await fetch(URL_producto+'/'+id,{
            method: "PUT",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(producto)
        });
      return respuesta; // el status de la respuesta 200
    }catch(error){
        console.log(error)
    }
}
export const borrarProducto = async(id)=>{
    try{
        const respuesta = await fetch(URL_producto+'/'+id,{
            method: "DELETE"
        });
      return respuesta; // el status de la respuesta 200
    }catch(error){
        console.log(error)
    }
}

export const obtenerProducto = async(id)=>{
    try{
        const respuesta = await fetch(URL_producto+'/'+id);
        const producto = await respuesta.json();
        return producto; // voy a retornar un objeto producto.
    }catch(error){
        console.log(error)
    }
}