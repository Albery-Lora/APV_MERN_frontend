import { Link } from "react-router-dom"
import { useState } from "react"
import clienteAxios from "../config/axios"
import Alerta from "../componentes/Alerta"



const OlvidePassword = () => {
  
  
  const [email, setEmail] = useState('')
  const [alerta, setAlerta] = useState({});
  
  const handleSubmit = async (e) =>{
    e.preventDefault();

    const regex = import.meta.env.VITE_EMAIL_VALIDATION;


    if(email === ''){
      setAlerta({
                  msg: 'El Email es obligatorio.', 
                  error: true
                });
        
      return;
    }

    if(email.match(regex) === null ){
      
      setAlerta({
        msg: 'Por favor introduzca un Email válido.', 
        error: true
      });

      return;
    }


      //Buscar este correo en la API
      try {

        
        //".post()" es un metodo de axios para enviar data a una API. En este caso enviamos el nombre, email y password
       const {data} = await clienteAxios.post(`/veterinarios/olvide-password`, {email})

        setAlerta({
          msg: data.msg,
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
  

  //extraer msg del objeto alerta
  const {msg} = alerta;
  return (


    <>
          <div>
            <h1 className='text-indigo-600 font-black text-6xl'>
              Recupera tu Acceso y no Pierdas {""} {/*{""} para crear un espacio en blanco en React  */}
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
                      value = {email}
                      onChange = {e => setEmail(e.target.value)}
                  />
            </div> 


            <input 
                      type="submit" 
                      value='Recuperar Cuenta'
                      className='bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto'

                  />

            </form>

            <nav  className='mt-10 lg:flex lg:justify-between'>
           
              <Link 
                to="/" 
                className='hover:underline block text-center my-5 text-gray-500'>¿Ya tienes una cuenta? Inicia Sesión
              </Link>
              
              <Link 
                to="/registrar" 
                className='hover:underline block text-center my-5 text-gray-500'>¿No tienes una cuenta? Regístrate Aquí
              </Link>

           </nav>  

          </div>
    </>
  )
}

export default OlvidePassword