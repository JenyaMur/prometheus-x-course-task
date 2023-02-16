import { useLocation, Navigate } from "react-router-dom";
import { useAuth } from "../hook/useAuth";

export default function PrivateAuth({children}) {
    const location = useLocation(),
          {user} = useAuth(); 
    if (!user) {
        return <Navigate to='/login' state={{from: location}} />
    }
    return children
}