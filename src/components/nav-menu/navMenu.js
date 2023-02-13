import { useNavigate, Link } from "react-router-dom";
import './navMenu.sass'

export default function NavMenu() {
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    return (
        <nav className="menu-navigation">
            <button className="btn btn-outline-secondary" onClick={goBack}>Go back</button>
            <Link to="/" className="btn btn-outline-secondary">Home</Link>
        </nav>
    )
}