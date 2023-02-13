import React, { useState } from "react";
import usePurchase from "../../hook/usePurchase";
import './bookPriceData.sass';

export default function BookPriceData({price, title, id, amount}) {
  const [sum, setSum] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const [visible, setVisible] = useState(true);
  const {addPurchase} = usePurchase();

  if(amount) {
    return (
      <div className="buy_container">
        <p className="space-between fw-bold text-end">
          Price: <span id="book-price">{price} $</span>
        </p>
        <div className="space-between text-end fw-bold">
          <span>Count:</span>
          <div className="form-control mt-1 mb-1 div-input"> {amount} </div>
        </div>
        <p className="space-between fw-bold text-end">
          Total price: <span id="total-price">{(amount*price).toFixed(2)} $</span>
        </p>
        <p className="user-buy-message">Book added to cart. Quantity: {amount}</p>
      </div>
    )
  }
  
  function countTotalPrice(e) {
    e.target.value !== "" && e.target.value > 0 ? setDisabled(false) : setDisabled(true);
    e.target.value = e.target.value.replace(/^[\D0]+|\D/g, "");
    if (e.target.value > 42) {
      e.target.value = 42
    }
    setSum((e.target.value*price).toFixed(2));
  }
  function addToCart(e) {
    e.preventDefault();
    setVisible(false);
    const buyDetails = {
        id: +id,
        name: title,
        price: price,
        totalPrice: +sum,
        amount: +(sum / price).toFixed(2)
    };

  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    addPurchase([...cart , buyDetails]);
    localStorage.setItem('cart', JSON.stringify([...cart , buyDetails]));
  } else {
    addPurchase([buyDetails]);
    localStorage.setItem('cart', JSON.stringify([buyDetails]));
  }
  }

  return (
      <form className="buy_container" onSubmit={addToCart}>
        <p className="space-between fw-bold text-end">
          Price: <span id="book-price">{price} $</span>
        </p>
        <div className="space-between fw-bold text-end">
          <label htmlFor="count_books">Count:</label>
          { visible &&  <input
            type="number" 
            inputMode="numeric" 
            pattern="[0-9]*"
            placeholder="0"
            required
            id="count_books"
            max="42"
            min="0"
            className="form-control mt-1 mb-1"
            onChange={countTotalPrice}
            autoFocus
            data-testid="inputBookValue"
            defaultValue={0}
          /> }
          { !visible &&  <div className="form-control mt-1 mb-1 div-input"> {+(sum / price).toFixed()} </div> }
        </div>
        <p className="space-between fw-bold text-end">
          Total price: <span id="total-price">{sum} $</span>
        </p>
        { visible && <button
          type="submit"
          className="button-buy float-end btn btn-success"
          disabled={disabled}
        >
          Add to cart
        </button> }
        { !visible && <p className="user-buy-message">Book added to cart. Quantity: {+(sum / price).toFixed()}</p>}
      </form>
  )
}
