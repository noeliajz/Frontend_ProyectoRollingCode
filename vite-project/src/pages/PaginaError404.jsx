import React from 'react'
import Error404 from "../assets/Error404.jpg";

const PaginaError404 = () => {
  return (
    <>
    <div className='d-flex box-sizing-border-box h-100vh' style={{boxSizing: 'border-box', width: '100vw', height: '100vh'}}>
    <img className='w-100 fluid' src={Error404} alt=""  /> 
    </div>
    </>
  )
}

export default PaginaError404
