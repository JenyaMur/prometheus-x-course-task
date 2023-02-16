import { useState } from "react";
import usePurchase from '../hook/usePurchase';
import img from '../img/cart.svg'
import NavMenu from "../components/nav-menu/NavMenu";
import './Cartpage.sass';
import CartItem from "../components/cart-item/CartItem";

export default function Cartpage() {
    const [flag, setFlag] = useState("DELETE");
    const {deletePurchase} = usePurchase();
    const [toggle, setToggle] = useState(false);
    const [showBlock, setShowBlock] = useState(false);
    const [message, setMessage] = useState(false);
    const cart = JSON.parse(localStorage.getItem("cart"));
    const deleteCart = () => {
        localStorage.removeItem('cart');
        deletePurchase();
    }
    const hideModal = (e) => {
        if (e.target.className === "modal" || e.target.className === "modal-close" ) {
            setShowBlock(false);
        }
    }
    const sendOrder = (e) => {
        e.preventDefault();
        setMessage(true);
        setTimeout(() => {
            deleteCart(); 
            setFlag("DELETE ALL")
        },2000)
    }

    if (!cart) {
        return (
            <div>
                <NavMenu />
                <div className="parent-block parent-block-cart">
                    <div>
                        <img src={img} width="250" alt="cart" />
                        <p className="text-center">Cart is empty...</p>
                        <p className="text-center">Let's go shopping!</p>
                    </div>
                </div>
            </div>
        )
    }
    
    return (
        <div>
            <NavMenu />
            <div className="text-end mb-3">
                <button className="btn btn-secondary btn-clean-up" onClick={() => {deleteCart(); setFlag("DELETE ALL")}}>{flag}</button>
                <button className="btn btn-secondary btn-order" onClick={() => setShowBlock(true)}>ORDER</button>
            </div>
            <div>
                {cart.map(item => 
                    <CartItem key={Date.now()+Math.random()} item={item} setToggle={setToggle} toggle={toggle}/>
                )
                }
                <div className="fw-bold text-end mt-3">Total price: {
                    cart.reduce( (sum, el) => (sum + el.totalPrice), 0).toFixed(2)
                    } $</div>
            </div>
            { showBlock && 
                <div className="modal" onClick={hideModal}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                        {!message && <form onSubmit={sendOrder}>
                            <div className="modal-close">&times;</div>
                            <div className="modal-title">
                                we are waiting for your data
                            </div>
                            <input
                            required
                            placeholder="Your email..."
                            name="email"
                            type="email"
                            className="modal-input"
                            autoFocus
                            />
                            <button type="submit" className="btn btn-secondary">Finish order</button>
                        </form> }
                        {message && <span> Thank you for your order. We will contact you as soon as possible</span>}
                        </div>
                    </div>
                </div> }
        </div>
    )
}