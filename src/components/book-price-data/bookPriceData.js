import { useState } from "react";
import usePurchase from "../../hook/usePurchase";
import './bookPriceData.sass';
import { faCircleMinus, faCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function BookPriceData({price, title, id, amount}) {
  const [sum, setSum] = useState(price);
  const [value, setValue] = useState(1);
  const [visible, setVisible] = useState(true);
  const {addPurchase} = usePurchase();
  
  const addValue = (e) => {
    e.preventDefault();
    setValue(value + 1);
    setSum(((value + 1)*price).toFixed(2));
  }
  const minusValue = (e) => {
    e.preventDefault();
    setValue(value - 1);
    setSum(((value - 1)*price).toFixed(2));
  }

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
    e.target.value = e.target.value.replace(/^[\D0]+|\D/g, "");
    setValue(+e.target.value);
    if (e.target.value > 42) {
      e.target.value = 42;
      setValue(42);
    }
    setSum((e.target.value*price).toFixed(2));
  }
  function addToCart(e) {
    e.preventDefault();
    if(sum > 0) {
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
  }

  return (
      <form className="buy_container" onSubmit={addToCart} data-testid="form-component" >
        <p className="space-between fw-bold text-end">
          Price: <span id="book-price">{price} $</span>
        </p>
        <div className="space-between fw-bold text-end">
          <label htmlFor="count_books">Count:</label>
          { visible && <div className="input-row">
            <button onClick={minusValue} data-testid="minus-book" disabled={value < 1 ? true : false} className="correctBookValue">
              <FontAwesomeIcon icon={faCircleMinus} />
            </button>
            <input
            type="number" 
            inputMode="numeric" 
            pattern="[0-9]*"
            placeholder="0"
            required
            id="count_books"
            max="42"
            min="0"
            className="form-control mt-1 mb-1"
            autoFocus
            data-testid="inputBookValue"
            value={value}
            onChange={countTotalPrice}
            onKeyDown={e => {
              if( e.code === 'Enter') {
                e.preventDefault();
                addToCart(e);
              }}}
          />
            <span hidden data-testid="count-book">{`${value} book`}</span>
            <button onClick={addValue} data-testid="add-book" disabled={value >= 42 ? true : false} className="correctBookValue">
              <FontAwesomeIcon icon={faCirclePlus} />
            </button>
          </div>
            }
          { !visible &&  <div className="form-control mt-1 mb-1 div-input"> {+(sum / price).toFixed()} </div> }
        </div>
        <p className="space-between fw-bold text-end">
          Total price: <span id="total-price">{sum} $</span>
        </p>
        { visible && <button
          type="submit"
          className="button-buy float-end btn btn-success"
          disabled={sum > 0 ? false : true}
        >
          Add to cart
        </button> }
        { !visible && <p className="user-buy-message">Book added to cart. Quantity: {+(sum / price).toFixed()}</p>}
      </form>
  )
}
