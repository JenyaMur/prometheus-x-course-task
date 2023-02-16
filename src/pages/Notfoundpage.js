import { Link } from "react-router-dom";
import img from '../img/error.png';

export default function Notfoundpage() {
    return (
        <div>
            <Link to='/' className="btn btn-outline-primary">Go home</Link>
            <br/>
            <img src={img} alt="error 404" className="img-fluid"/>
        </div>
    )
}