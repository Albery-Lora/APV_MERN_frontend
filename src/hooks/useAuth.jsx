//creando un custom hook

import { useContext } from "react"; //para extraer los datos del context
import AuthContext from "../context/AuthProvider"; //para especificar de qué context queremos extraer los datos


const useAuth = () =>{

    return useContext(AuthContext);
}


export default useAuth
