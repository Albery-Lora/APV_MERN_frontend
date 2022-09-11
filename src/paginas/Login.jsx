import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom' //useNavigate se usa para redireccionar al usuario
import Alerta from '../componentes/Alerta'
import useAuth from '../hooks/useAuth'
import clienteAxios from '../config/axios'

const Login = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alerta, setAlerta] = useState({});

  const { setAuth } = useAuth();
  
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();

      //validar que no hayan campos vacios
      if([email, password].includes('')){

        setAlerta({msg: 'Todos los campos son obligatorios', 
        error: true});
        
        return;
      }

      try {
        const {data} = await clienteAxios.post('/veterinarios/login', {email,password})

        //almacenar token de autenticacion de sesion en el Local Storage
        localStorage.setItem('token', data.token)
        // console.log(data)

        //modificar el json de setAuth para agregar datos del usuario
        setAuth(data);

        //redirecciona al ususario 
        navigate('/admin')


      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });
      }
  }


  const {msg} = alerta
  return (
    <>
    
        <div>
            <h1 className='text-indigo-600 font-black text-6xl'>Inicia Sesión y Administra tus {""} {/*{""} para crear un espacio en blanco en React  */}<span className='text-black'>Pacientes</span></h1>
        </div>
        
        
        <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

        {msg && <Alerta
            alerta={alerta}
        />}


           <form onSubmit={handleSubmit}>
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
                      onChange={e => setEmail(e.target.value)}

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
                      placeholder='Ingresa tu Password'
                      className='border w-full p-3 mt-3 bg-gray-50 rounded-xl'
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                  />
                </div>

                <input 
                      type="submit" 
                      value='Iniciar Sesión'
                      className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'

                  />
           </form>

           <nav  className='mt-10 lg:flex lg:justify-between'>
            {/*  Link de router DOM es el sustituto de React de "a" en HTML, y en vez de  "href" usamos "to". "Link" carga el link mas rapido que "a"*/}
              <Link 
                to="/registrar" 
                className='hover:underline block text-center my-5 text-gray-500'>¿No tienes una cuenta? Regístrate Aquí
              </Link>
              
              <Link
               to="/olvide-password" className='hover:underline block text-center my-5 text-gray-500'>Olvidé mi Password
              </Link>

           </nav>
        </div>
</>
  )
}

export default Login