import { createContext, useState } from "react";

export const BooksContext = createContext(null);

export const BooksProvider = ({children}) => {
    const [books, setBooks] = useState([]);

    const addBooks = (arr) => {
        setBooks(arr);
    }
    const value = {books, addBooks};
    return (
        <BooksContext.Provider value={value}>
            {children}
        </BooksContext.Provider>
    )
}