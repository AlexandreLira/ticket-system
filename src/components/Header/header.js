import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import "./header.css";
import avatar from "../../assets/avatar.png";

import { Link } from "react-router-dom";
import { FiHome, FiUser, FiSettings } from "react-icons/fi";
function Header() {
    const { user } = useContext(AuthContext);
    return (
        <div className="sideBar">
            <div>
                <img
                    src={user.avatarUrl ? user.avatarUrl : avatar}
                    alt="foto do usuario"
                />
            </div>
            <Link to="/dashboard">
                <FiHome color="#FFF" size={24}/>
                Chamados
            </Link>
            <Link to="/dashboard">
                <FiUser color="#FFF" size={24}/>
                Chamados
            </Link>
            <Link to="/dashboard">
                <FiSettings color="#FFF" size={24}/>
                Chamados
            </Link>
        </div>
    );
}

export default Header;
