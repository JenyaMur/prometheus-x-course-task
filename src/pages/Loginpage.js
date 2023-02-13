import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import avatar from '../img/avatar.png';
import avatar1 from '../img/avatar1.jpg';
import avatar2 from '../img/avatar2.png';
import avatar3 from '../img/avatar3.png';
import avatar4 from '../img/avatar4.jpg';
import { useAuth } from "../hook/useAuth";
import './Loginpage.sass';

export default function Loginpage() {
    const navigate = useNavigate();
    const {user, signIn, foto, installFoto} = useAuth();
    const [disabled, setDisabled] = useState(true);
    useEffect(() => {user && navigate('/')});
    const hadleSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const user = form.username.value.trim();
        if(user.length > 3 && user.length < 17) {
            signIn(user, () => {
                navigate('/', { replace: true });
                localStorage.setItem('userName', user)
            });
        }
    }
    const controlBtn = (e) => {
        e.target.value.trim().length > 3 && e.target.value.trim().length < 17 ? setDisabled(false) : setDisabled(true);
    }
    const changeFoto = (e) => {
        if(e.target.alt === "profile_avatar") {
            installFoto(e.target.src);
            localStorage.setItem('foto', e.target.src)
        } 
    }

    return (
        <div className="parent-block">
            <div className="sign-up-block">
                <img
                src={foto}
                alt="profile_avatar"
                className="img-fluid main-photo-avatar photo-avatar"
                />
                <div className="mt-3 mb-3" onClick={changeFoto}>
                    <p className="text-center mt-3 mb-3">You can select a profile photo:</p>
                    <img src={avatar1} alt="profile_avatar" className="img-fluid photo-avatar"/>
                    <img src={avatar2} alt="profile_avatar" className="img-fluid photo-avatar"/>
                    <img src={avatar3} alt="profile_avatar" className="img-fluid photo-avatar"/>
                    <img src={avatar4} alt="profile_avatar" className="img-fluid photo-avatar"/>
                    <img src={avatar} alt="profile_avatar" className="img-fluid photo-avatar"/>
                </div>
                <form onSubmit={hadleSubmit} className="text-center mt-3">
                    <input
                        type="text"
                        id="user_name"
                        name="username"
                        placeholder="Type your name..."
                        onChange={controlBtn}
                        className="form-control"
                    />
                    <p className="mt-1 login-clue">Name should have 4-16 symbols </p>
                    <button type="submit" className="btn btn-primary" disabled={disabled}>
                        Sign-in
                    </button>
                </form>
            </div>
      </div>
    )
}