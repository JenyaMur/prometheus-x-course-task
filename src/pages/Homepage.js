import { useState, useEffect } from "react";
import ky from 'ky';
import BookElement from "../components/bookItem/BookElement";
import Search from "../components/search/Search";
import SelectForm from "../components/selectForm/SelectForm";
import useBooks from '../hook/useBooks';
import './Homepage.sass';

export default function Homepage() {

const {books, addBooks} = useBooks();
const[select, setSelect] = useState('1');
const [search, setSearch] = useState(" ");

useEffect(() => {
    ky.get('/prometheus-x-course-task/books.json')
      .json().then((resp) => addBooks(resp.books))
      .catch(e=>console.log(e))
// eslint-disable-next-line react-hooks/exhaustive-deps
},[])

localStorage.setItem('books', JSON.stringify(books));

    let userSearch;
    if(select === "1") {
        userSearch = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase().trim()));
    }
    if(select === "2") {
        userSearch = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase().trim()) && book.price < 15);
    }
    else if(select === "3") {
        userSearch = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase().trim()) && book.price >= 15 && book.price <= 30);
    }
    else if(select === "4") {
        userSearch = books.filter(book => book.title.toLowerCase().includes(search.toLowerCase().trim()) && book.price > 30);
    }

return (
     <div>
        <div className="search-filter-row">
            <Search cb={setSearch}/>
            <SelectForm cb={setSelect}/>
        </div>
        <div className="row justify-content-evenly mb-3">
        {   
            userSearch.map(book => <BookElement id={book.id} author={book.author} price={book.price} image={book.image} title={book.title} key={book.id}/> )
        }
        {
            !userSearch.length && <p className="text-center">Sorry, we can't find <b>{search}</b>, try another one</p>
        }
        </div>
    </div>
) 
}


