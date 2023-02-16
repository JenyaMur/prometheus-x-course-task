import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './search.sass';

export default function Search({cb}) {
    
    function inputValue(e) {
        cb(e.target.value || " ")
    }

    function searchBooks(e) {
        e.preventDefault();
    }
    return (
        <form className="search-form" onSubmit={searchBooks}>
            <input
              name="search-book"
              id="search-book"
              type="search"
              className="search-field-input"
              placeholder="Let`s try to find..."
              onChange={inputValue}
              
            />
            <button type="submit" className="search-field-button">
                <FontAwesomeIcon icon={faMagnifyingGlass} />
            </button>
        </form>
    )
}