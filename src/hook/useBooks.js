import { useContext } from "react";
import { BooksContext } from "../hoc/BooksProvider";

export default function useBooks() {
    return useContext(BooksContext)
}