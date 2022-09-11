import { useState } from "react"
import { Link } from "react-router-dom"
import axios from 'axios'
import Alerta from "../componentes/Alerta"
import clienteAxios from "../config/axios"




const Registrar = () => {

    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [repetirPassword, setRepetirPassword] = useState('');
    const [alerta, setAlerta] = useState({});

    const handleSubmit = async e =>{

      e.preventDefault();

      //validar que no hayan campos vacios
      if([nombre, email, password, repetirPassword].includes('')){

        setAlerta({msg: 'Hay campos vacíos', error: true});
        return;
      }

      if(password !== repetirPassword){
        setAlerta({msg: 'Los password no son iguales', error: true});
        return;
      }
      
      if(password.length < 6){
        setAlerta({msg: 'El Password es muy corto. Debe ser mínimo 6 caracteres', error: true});
        return;
      }
      
      //si pasa la validacion, borrar el msj de error/limpiar el objeto "alerta"
      setAlerta({})

      //Crear el usuario en la API
      try {

        
        //".post()" es un metodo de axios para enviar data a una API. En este caso enviamos el nombre, email y password
        await clienteAxios.post(`/veterinarios`, {nombre, email, password})

        setAlerta({
          msg: 'Creado Correctamente, revisa tu Email',
          error: false
        })
      } catch (error) {
        //imprime el msj de error que creamos en el Backend
        const errorBackend = error.response.data.msg;
        
        setAlerta({
          msg: errorBackend,
          error: true
        })

      }

    }

    const {msg} = alerta
    return (
      <>
        
        <div>
            <h1 className='text-indigo-600 font-black text-6xl'>
              Crea tu Cuenta y Aministra {""} {/*{""} para crear un espacio en blanco en React  */}
              <span className="text-black">tus Pacientes</span>
            </h1>
        </div>    

        
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {/* /* si msg existe(no es string vacio) ENTONCES(&&) carga el componente Alerta */ }
           {msg && <Alerta
            alerta={alerta}
           />}

           <form 
            onSubmit={handleSubmit}
           >

                <div className='my-5'>
                  <label htmlFor="nombre"
                        className='uppercase text-gray-600 block text-xl font-bold' 
                  >
                      Nombre
                  </label>
                  <input 
                      type="text" 
                      id='nombre'
                      placeholder='Tu Nombre'
                      className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                      value={nombre}
                      onChange={e =>setNombre(e.target.value)}

                  />
                </div> 


                <div className='my-5'>
                  <label htmlFor="email"
                        className='uppercase text-gray-600 block text-xl font-bold' 
                  >
                      Email
                  </label>
                  <input 
                      type="email" 
                      id='email'
                      placeholder='Email de Registro'
                      className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                      value={email}
                      onChange={e =>setEmail(e.target.value)}
                  />
                </div>

                <div className='my-5'>
                  <label 
                        htmlFor="password"
                        className='uppercase text-gray-600 block text-xl font-bold' 
                  >
                      Password
                  </label>
                  <input 
                      type="password" 
                      id='password'
                      placeholder='Tu Password'
                      className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                      value={password}
                      onChange={e =>setPassword(e.target.value)}
                  />
                </div>

                <div className='my-5'>
                  <label 
                        htmlFor="password"
                        className='uppercase text-gray-600 block text-xl font-bold' 
                  >
                      Repetir Password
                  </label>
                  <input 
                      type="password" 
                      id='password'
                      placeholder='Repite tu Password'
                      className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                      value={repetirPassword}
                      onChange={e =>setRepetirPassword(e.target.value)}
                  />
                </div> 
           
                <input 
                      type="submit" 
                      value='Crear Cuenta'
                      className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'

                  />
           
           
           
            </form>

            <nav  className='mt-10 lg:flex lg:justify-between'>
            {/*  Link de router DOM es el sustituto de React de "a" en HTML, y en vez de  "href" usamos "to". "Link" carga el link mas rapido que "a"*/}
              <Link 
                to="/" 
                className='hover:underline block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión
              </Link>
              
              <Link
               to="/olvide-password" className='hover:underline block text-center my-5 text-gray-500'>Olvidé mi Password
              </Link>

           </nav>        
          
          </div> 
      
      
      
      
      
      </>
    )
  }
  
  export default Registrar