import React, { useState } from "react";
import {Link} from 'react-router-dom';
import { faTrash, faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './cartItem.sass';

export default function CartItem({item, toggle, setToggle}) {
    const [value, setValue] = useState(item.amount);
    const cart = JSON.parse(localStorage.getItem("cart"));

    const minusAmount = () => {
        if(value > 1) {
            setValue(value - 1);
            const newCart = cart.map(el => {if(el.id === item.id) {
                el.amount = el.amount - 1;
                el.totalPrice = +(el.totalPrice - el.price).toFixed(2)
                } return el
            });
            localStorage.setItem('cart', JSON.stringify(newCart));
            setToggle(!toggle);
        }
    }
    const addAmount = () => {
        if (value < 42) {
            setValue(value + 1);
            const newCart = cart.map(el => {if(el.id === item.id) {
                el.amount = el.amount + 1;
                el.totalPrice = +(el.totalPrice + el.price).toFixed(2)
            } return el
            });
            localStorage.setItem('cart', JSON.stringify(newCart));
            setToggle(!toggle);
        }
    }
    const removeItem = () => {
        const newCart = cart.filter(el => el.id !== item.id)

        if(newCart.length === 0) {
            localStorage.removeItem('cart');
        } else {
            localStorage.setItem('cart', JSON.stringify(newCart));
        }
        setToggle(!toggle);

    }

    return (
        <div className="row cartItemRow">
            <div className="col-12 col-sm-6 itemCartTitle">{item.name}</div>
            <div className="col-12 col-sm-6 itemCartAmount">
                <div>
                    <button onClick={minusAmount} disabled={value <= 1 ? true : false}><FontAwesomeIcon icon={faCircleMinus} /></button>
                    <span>{value}</span>
                     <button onClick={addAmount} disabled={value >= 42 ? true : false}><FontAwesomeIcon icon={faCirclePlus} /></button>
                </div>
                <div>
                    <span>{(item.price*value).toFixed(2)} $</span>
                    <Link to="#" onClick={removeItem} className="trashIcon"><FontAwesomeIcon icon={faTrash} /></Link>
                </div>    
            </div>
        </div>
    )
}