import React, { useState, useEffect } from "react";
import ky from 'ky';
import BookElement from "../components/bookItem/BookElement";
import Search from "../components/search/search";
import SelectForm from "../components/selectForm/selectForm";
import useBooks from '../hook/useBooks';
import './Homepage.sass';

export default function Homepage() {

const {books, addBooks} = useBooks();
const[select, setSelect] = useState('1');
const [search, setSearch] = useState(" ");

useEffect(() => {
    ky.get('/books.json')
      .json().then((resp) => addBooks(resp.books))
      .catch(e=>console.log(e))
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

localStorage.setItem('books', JSON.stringify(books));

return (
     <div>
        <div className="search-filter-row">
            <Search cb={setSearch}/>
            <SelectForm cb={setSelect}/>
        </div>
        <div className="row justify-content-evenly mb-3">
        {   
            // eslint-disable-next-line array-callback-return
            books.map(book => {
                const bookEl = <BookElement id={book.id} author={book.author} price={book.price} image={book.image} title={book.title} key={book.id}/>;
                if(book.title.toLowerCase().includes(search.toLowerCase().trim())) {
                    if(select === "1") {
                        return bookEl
                    } 
                    if(select === "2" && book.price < 15) {
                        return bookEl
                    }
                    if(select === "3" && book.price >= 15 && book.price <= 30) {
                        return bookEl
                    } 
                    if(select === "4" && book.price > 30) {
                        return bookEl
                    }  
                 } 
            }  
            ) 
        }
        </div>
    </div>
) 
}


