import { createContext, useState } from "react";
import avatar from '../img/avatar.png';

export const AuthContext = createContext(null);

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(localStorage.getItem('userName') || null);
    const [foto, setFoto] = useState(avatar)

    const signIn = (newUser, cb) => {
        setUser(newUser);
        cb();
    };
    const signOut = (cb) => {
        setUser(null);
        setFoto(avatar);
        cb();
    };

    const installFoto = (newFoto) => {
        setFoto(newFoto);
    }

    const value = {user, signIn, signOut, foto, installFoto}


    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
