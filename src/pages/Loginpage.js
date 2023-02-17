import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {useForm} from 'react-hook-form';
import { useAuth } from "../hook/useAuth";
import avatar from '../img/avatar.png';
import avatar1 from '../img/avatar1.jpg';
import avatar2 from '../img/avatar2.png';
import avatar3 from '../img/avatar3.png';
import avatar4 from '../img/avatar4.jpg';
import './Loginpage.sass';

export default function Loginpage() {
    const navigate = useNavigate();
    const {user, signIn, foto, installFoto} = useAuth();
    const {register, formState: {errors, isValid}, handleSubmit } = useForm({mode: "all"});

    useEffect(() => {user && navigate('/')});

    const changeFoto = ({target: {alt, src}}) => {
        if(alt === "profile_avatar") {
            installFoto(src);
            localStorage.setItem('foto', src)
        }
    }
    function createUser({username}) {
        signIn(username, () => {
            navigate('/', { replace: true });
            localStorage.setItem('userName', username)
        });
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
                <form onSubmit={handleSubmit(createUser)} className="text-center mt-3">
                    <input
                        placeholder="Type your name..."
                        className="form-control mb-3"
                        {...register("username", {
                            required: "You should type your name",
                            pattern: {
                                value: /^\w{4,16}$/,
                                message: 'You can use: english letters, numbers or _' 
                            },
                            minLength: {
                                value: 4,
                                message: "Minimum 4 symbols. You can use: english letters, numbers or _" 
                            },
                            maxLength: {
                                value: 16,
                                message: "Maximum 16 symbols. You can use: english letters, numbers or _"
                            }
                        })}
                    />
                    {errors?.username && <p className="mt-1 login-clue">{errors?.username.message}</p>}
                    <button type="submit" className="btn btn-primary" disabled={!isValid}>
                        Sign-in
                    </button>
                </form>
            </div>
      </div>
    )
}