//Aqui empiezo a crear un state global que usare para comprobar en todas las paginas si el usuario está o no autenticado
//Provider es de donde nace la aplicacion/este state global
//createContext nos permite crear un context que a su vez nos permite acceder al State de forma global 

import axios from "axios";
import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/axios";
import useAuth from "../hooks/useAuth";

//creando el context de este provider
const AuthContext = createContext();

//Este provider sera como un componente grande que tendra como hijos a todos los componentes de la App

const AuthProvider = ({children})=>{

    const [cargando, setCargando] = useState(true);
    const [auth, setAuth] = useState({})


    useEffect(()=>{
        const autenticaUsuario = async () => {
            const token = localStorage.getItem('token');

            if(!token){
                setCargando(false)
                return
            };
            
            //Esta es la misma configuracion que podemos crear al hacer el pedido Axios, pero por didactica la creamos como una variable. Aqui vmosa a crear un Header con token para la autenticacion. Respetar mayusculas y minusculas al escribir lo siguiente. Esto mandara un Header autenticado en nuestro request "get" de Axios

            const config = {
                headers: {
                    "Content-type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios('/veterinarios/perfil', config) 
                
                setAuth(data);

            } catch (error) {
                console.log(error)
                setAuth({})
            }

            setCargando(false);

        }

        autenticaUsuario()
    }, [])

    //funcion que cierra sesion. Primero borra token del Local Storage y luego vacea el json con credenciales de login
    
    const cerrarSesion = ()=>{
        localStorage.removeItem('token');
        setAuth({})
    }

    //actualizar el perfil de un veterinario
    const actualizarPerfil = async datos =>{
        const token = localStorage.getItem('token');

        if(!token){
            setCargando(false)
            return
        };
        
        const config = {
            headers: {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/perfil/${datos._id}`
            const {data} = await clienteAxios.put(url, datos, config)

            // console.log(data)
            return{
                msg: 'Almacenado Correctamente',
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }

        }
    }

    const guardarPassword = async (datos) =>{
        const token = localStorage.getItem('token');

        if(!token){
            setCargando(false)
            return
        };
        
        const config = {
            headers: {
                "Content-type" : "application/json",
                Authorization : `Bearer ${token}`
            }
        }

        try {
            const url = `/veterinarios/actualizar-password`
            const {data} = await clienteAxios.put(url, datos, config)

            console.log(data)
            return{
                msg: data.msg
            }

        } catch (error) {
            return {
                msg: error.response.data.msg,
                error: true
            }

        }
    }

    return(
        <AuthContext.Provider
            value={{
                auth,
                setAuth,
                cargando,
                cerrarSesion,
                actualizarPerfil,
                guardarPassword
            }}
        >
            {children}
        </AuthContext.Provider>

    )
}

export {
    AuthProvider
}

export default AuthContext 