// rafce nos permite crear la estructura basica de un componente

//En las ultimas versiones de React, ya nos es necesario agregar: import React from 'react'

//para mostrar contenido de otros componentes debajo del componente principal, usamos import {Outlet} from 'react-router-dom'
import {Outlet} from 'react-router-dom' 

const AuthLayout = () => {
  return (
    //agregar un fragment. Esto es mejor que un div porque no genera mas codigo HTML
    <>
     <main className='container mx-auto md:grid md:grid-cols-2 mt-12 gap-12 p-5 items-center'>


      <Outlet/> {/* Outlet representa los componentes hijos individuales dentro de este componente padre AuthLayout. Lo que ponga antes de Outlet se aplica en las vistas antes de cada componente hijo, y lo que ponga despues de Outlet, se aplicara despues de cada elemento hijo */}




    </main>

    </>
  )
}

export default AuthLayout