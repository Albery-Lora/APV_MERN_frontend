//aqui usamos el metodo "axios.create()" para crear una variable con la URL base de nuestro endpoint API

import axios from "axios";


const clienteAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`
})


export default clienteAxios