import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav>
        <Link
            to="/admin/perfil"
            className="font-bold  uppercase text-gray-500 mx-10"
            >Perfil</Link>

        <Link
            to="/admin/cambiar-password"
            className="font-bold  uppercase text-gray-500"
            >Cambiar Password</Link>
    </nav>
  )
}

export default AdminNav