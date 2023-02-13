import React from "react";
import { useAuth } from "../../hook/useAuth";
import { useNavigate, Link } from "react-router-dom";
import cart from '../../img/cart.svg'
import usePurchase from "../../hook/usePurchase";
import './header.sass';

export default function Header() {
    const {user, foto, signOut} = useAuth();
    const {deletePurchase} = usePurchase();

    const navigate = useNavigate();

    return (
        <header>
            <div className="header-project-name">X-course task / YEVHENIIA MURAVSHCHYK</div>
            <div hidden={user || localStorage.getItem('userName') ? false : true} className="header-elements">
                <Link to="/cart"><img src={cart} width="30" alt="cart" /></Link>
                <button 
                onClick={() => signOut(() => {navigate('/login', {replace: true}); localStorage.clear(); deletePurchase()})}
                className="btn btn-secondary">Sign-out</button>
                <img src={localStorage.getItem('foto') || foto} alt="profile_avatar" className="img-fluid photo-avatar" width="50px"/>
                <span>{user || localStorage.getItem('userName')}</span>
            </div>
        </header>
    )
}
       