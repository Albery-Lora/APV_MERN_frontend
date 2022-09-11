import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Alerta from "../componentes/Alerta";
import clienteAxios from "../config/axios";

const NuevoPassword = () => {
  const [password, setPassword] = useState("");
  const [repetirPassword, setRepetirPassword] = useState("");
  const [alerta, setAlerta] = useState({});
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false);



  //extraer el token de la URL desde que carga la pagina
  const params = useParams();
  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios(`/veterinarios/olvide-password/${token}`);

        setAlerta({
          msg: "Coloca tu Nuevo Password",
          error: false,
        });

        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: "Hubo un error con el enlace",
          error: true,
        });
      }
    };

    comprobarToken();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    //validar que no hayan campos vacios
    if ([password, repetirPassword].includes("")) {
      setAlerta({ msg: "Hay campos vacíos", error: true });
      return;
    }

    if (password !== repetirPassword) {
      setAlerta({ msg: "Los password no son iguales", error: true });
      return;
    }

    if (password.length < 6) {
      setAlerta({
        msg: "El Password es muy corto. Debe ser mínimo 6 caracteres",
        error: true,
      });
      return;
    }

    //si pasa la validacion, cambiar el password del usuario en la DB

    const {data}  =   await clienteAxios.post(`/veterinarios/olvide-password/${token}`, {password});

    try {
      
      setAlerta({
        msg: data.msg,
        error: false,
      });

      setPasswordModificado(true);

    } catch (error) {
      
      setAlerta({
      msg: error.response.data.msg,
      error: true,
    });

    }


  };

  const { msg } = alerta;
  return (
    <>
      <div>
        <h1 className="text-indigo-600 font-black text-6xl">
          Reestablece tu Password y no Pierdas Acceso a{""}{" "}
          {/*{""} para crear un espacio en blanco en React  */}
          <span className="text-black">tus Clientes</span>
        </h1>
      </div>

      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
        {msg && <Alerta alerta={alerta} />}

        {/* si el token es valido, cargar el formulario */}
        {tokenValido && (

          <>

          <form onSubmit={handleSubmit}>
            <div className="my-5">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Nuevo Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Tu Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="my-5">
              <label
                htmlFor="password"
                className="uppercase text-gray-600 block text-xl font-bold"
              >
                Repetir Nuevo Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Repite tu Password"
                className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
                value={repetirPassword}
                onChange={(e) => setRepetirPassword(e.target.value)}
              />
            </div>

            <input
              type="submit"
              value="Guardar Nuevo Password"
              className="bg-indigo-700 w-full py-3 px-10 rounded-xl text-white uppercase bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto"
            />
          </form>

          <nav  className='mt-10 lg:flex lg:justify-between'>

            {passwordModificado &&
              <Link 
                to="/" 
                className='hover:underline block text-center my-5 text-gray-500'>Iniciar Sesión
              </Link>

            }
               

           </nav> 


          </>
        )}

        
      </div>
    </>
  );
};

export default NuevoPassword;
