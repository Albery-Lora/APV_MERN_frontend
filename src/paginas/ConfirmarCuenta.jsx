
//importar useEffect para que react ejecute un codigo una vez el componente esté listo
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"
import Alerta from "../componentes/Alerta";

//importar Hook "useParams" para leer el token de la URL
import { useParams } from "react-router-dom"


const ConfirmarCuenta = () => {
  //useState para cuando se confirme el usuario
  const [cuentaConfirmada, setCuentaConfirmada] = useState(false);
  
  //useState para mientras llega la respuesta de la API
  const [cargando, setCargando] = useState(true);

  const [alerta, setAlerta] = useState({});

  //leer el :id(token del usuario) de la URL con useParams
  const params = useParams();
  const {id} = params;

  useEffect(()=>{
    const confirmarCuenta = async ()=>{
      
      //Confirmar el usuario en la BD
      try {
        const url = `${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`

        
        //extraer el objeto "data" de la API con axios. Este es el obj que contiene la respuesta del servidor desde la API
        const {data} = await axios.get(url); ///".get()" es un metodo de axios para recibir data a una API. Es el metodo por defeto, por ende podriamos solo poner "axios(url)"

        setCuentaConfirmada(true);

        //si se confirma correctamente, mostrar el msj creado en el servidor
        setAlerta({
          msg: data.msg,
          error: false
        });     

      } catch (error) {
        //imprime el msj de error que creamos en el Backend   
        setAlerta({
          msg: error.response.data.msg,
          error: true
        });

      }

      setCargando(false);

    }

    confirmarCuenta();

  },[])
    return (

      



      <>
          <div>
            <h1 className='text-indigo-600 font-black text-6xl'>
              Confirma tu Cuenta y Comienza a Administrar {""} {/*{""} para crear un espacio en blanco en React  */}
              <span className="text-black">tus Pacientes</span>
            </h1>
          </div>  

          <div className="mt-20 md-mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">

            {/* cuando deje de cargar el pedido a la API, ENTONCES(&&)muestra la alerta */}

            {!cargando && <Alerta 
              alerta = {alerta}
            />}

          {/* cuando se confirme la cuenta, ENTONCES(&&)muestra el link para Iniciar Sesion*/}
          {cuentaConfirmada && 
              
              <Link 
              to="/" 
              className='hover:underline block text-center my-5 text-gray-500'>Iniciar Sesión
            </Link>

          }    

          </div>      
      </>
    )
  }
  
  export default ConfirmarCuenta