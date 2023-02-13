import React from "react";
import { useParams } from "react-router-dom";
import BookPriceData from "../components/book-price-data/bookPriceData";
import useBooks from "../hook/useBooks";
import Notfoundpage from "./Notfoundpage";
import './singlepage.sass';
import BookInfoData from "../components/book-info-data/BookInfoData";

export default function Singlepage() {
  let {books} = useBooks();
  if (books.length === 0) {
    books = JSON.parse(localStorage.getItem("books"))
  }
  const {id} = useParams()
  const book = books.filter(el => el.id === +id);
  if (book.length !== 0) {
    const {author, price, image, description, shortDescription, title} = book[0];
    const cart = JSON.parse(localStorage.getItem("cart"));
    if (cart) {
      const buy = cart.filter(el => el.id === +id);
      if (buy.length !== 0) {
        return (
          <BookInfoData image={image} title={title} author={author} shortDescription={shortDescription} description={description}>
            <BookPriceData price={price} title={title} id={id} amount={buy[0].amount}/> 
          </BookInfoData>
        )
      }
  }
    return (
      <BookInfoData image={image} title={title} author={author} shortDescription={shortDescription} description={description}>
        <BookPriceData price={price} title={title} id={id}/>
      </BookInfoData>
  )
  } else {
  return <Notfoundpage />
  }
}
