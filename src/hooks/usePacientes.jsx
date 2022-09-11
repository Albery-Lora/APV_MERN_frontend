//creando un custom hook

import { useContext } from "react"; //para extraer los datos del context
import PacientesContext from "../context/PacientesProvider";

const usePacientes = () =>{

    return useContext(PacientesContext);
}


export default usePacientes
