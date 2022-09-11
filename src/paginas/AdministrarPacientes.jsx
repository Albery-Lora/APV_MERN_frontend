import { useState } from "react"
import Formulario from "../componentes/Formulario"
import ListadoPacientes from "../componentes/ListadoPacientes"

const AdministrarPacientes = () => {

  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  return (
   <div className="flex flex-col md:flex-row">
    <button
      type="button"
      className="bg-indigo-600 text-white font-bold uppercase mx-10 p-3 rounded-md mb-10 md:hidden"
      onClick={()=> setMostrarFormulario(!mostrarFormulario)}  //con el argumento "!mostrarFormulario" puedo hacer que cambie su estado anterior: al hacer click, si estaba en TRUE pasa a false, y viceversa
    >{mostrarFormulario ? 'Ocultar Formulario' : 'Mostrar Formulario'}</button>
    
    <div className={`${mostrarFormulario ? 'block' : 'hidden' } md:block md:w-1/2 lg:w-2/5`}>
      <Formulario/>
    </div>

    <div className="md:w-1/2 lg:w-3/5">
      <ListadoPacientes/>
    </div>
   </div>
  )
}

export default AdministrarPacientes