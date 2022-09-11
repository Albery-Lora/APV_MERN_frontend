
//En este documento van las rutas a las paginas o archivos de React. A las vistas.

//En el sigte import: Todo debe estar dentro de BrowserRouter, Routes es un conjunto de Rutas y Route una ruta en especifico
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import AuthLayout from './layout/AuthLayout'
import RutaProtegida from './layout/RutaProtegida'
import Login from './paginas/Login'
import Registrar from './paginas/Registrar'
import OlvidePassword from './paginas/OlvidePassword'
import ConfirmarCuenta from './paginas/ConfirmarCuenta'
import NuevoPassword from './paginas/NuevoPassword'
import AdministrarPacientes from './paginas/AdministrarPacientes'
import { AuthProvider } from './context/AuthProvider'
import {PacientesProvider} from './context/PacientesProvider'
import EditarPerfil from './paginas/EditarPerfil'
import CambiarPassword from './paginas/CambiarPassword'


function App() {

  //importar variables de entorno en VITE. En el .env file, deben empezar con VITE_ para que sea leida por vite, esto es por razones de seguridad
  // console.log(import.meta.env.VITE_BACKEND_URL);



  return (
    <BrowserRouter>
      <AuthProvider> {/* El Provider ahora rodea toda la aplicacion. Por tanto todo el state que defina en ese documento rodeara/afectara a todos los hijos */}
      <PacientesProvider>
          <Routes>
            
            <Route path="/" element={<AuthLayout/>}> {/* el path="/"señala que este es el path principal/padre/master page, desde donde se copian los elementos del layout. Todo lo que cambie en este componente afectara a todas las demas paginas. Esto no quiere decir que esta sera el homepage/primer pagina */}
                    <Route index element={<Login/>}/> {/*"index" para indicar que se muestre este contenido en el componente principal "AuthLayout". "index señala que está sí será la homepage/pagina inicial"  */}
                    <Route path="registrar" element ={<Registrar/>}/> {/* para los demas componentes que no sean ni el principal(AuthLayout) ni el homepage(Login) debemos indicar un path. Solo ponemos como valor el nombre("registrar") en este caso, porque con VITE ya se asume el path que señalamos como principal(el que pusimos en Auth layout. path="/"). Para ver el resultado ahora vamos a http://localhost:3000/registrar */}
                    <Route path="olvide-password" element ={<OlvidePassword/>}/> 
                    <Route path="olvide-password/:token" element ={<NuevoPassword/>}/> 
                    <Route path="confirmar/:id" element ={<ConfirmarCuenta/>}/> 

                    
            </Route>


            <Route path="/admin" element={<RutaProtegida/>}>
              <Route index element={<AdministrarPacientes/>}/>
              <Route path="perfil" element={<EditarPerfil />}></Route>
              <Route path="cambiar-password" element={<CambiarPassword />}></Route>

            </Route>



          </Routes>
        </PacientesProvider>
      </AuthProvider>
    </BrowserRouter>
    )
}

export default App
