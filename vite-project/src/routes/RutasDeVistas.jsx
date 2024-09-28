import React from 'react'
import { Routes, Route} from 'react-router-dom'
import Inicio from "../pages/Inicio"
import PaginaError404 from '../pages/PaginaError404'
import Registrar from '../pages/Registrar'
import IniciarSesion from '../pages/IniciarSesion'
import InicioAdmin from '../pages/InicioAdmin'
import  ProductosAdmin from '../pages/ProductosAdmin'
import Contacto from '../pages/Contacto'
import InicioUsuario from '../pages/InicioUsuario'


const RutasDeVistas = () => {
  return (
    <>
    <Routes>
    <Route path='/' element={<Inicio/>}/>
    <Route path='*' element={<PaginaError404/>}/>
    <Route path='/Registrar' element={<Registrar/>}/>
    <Route path='/IniciarSesion' element={<IniciarSesion/>}/>
    <Route path='/IniciarSesion' element={<IniciarSesion/>}/>
    <Route path='/InicioAdmin' element={<InicioAdmin/>}/>
    <Route path='/ProductosAdmin' element={<ProductosAdmin/>}/>
    <Route path='/Contacto' element={<Contacto/>}/>
    <Route path='/InicioUsuario' element={<InicioUsuario/>}/>

   
    </Routes>
    </>
  )
}

export default RutasDeVistas
