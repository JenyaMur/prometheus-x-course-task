import React from "react";

export default function SelectForm({cb}) {

    function priceFilter(e) {
        cb(e.target.value);
    }

    return (
        <form>
            <select name="price-select" className="form-select" onChange={priceFilter}>
                <option defaultValue hidden>Price:</option>
                <option value="1">All</option>
                <option value="2">less than 15</option>
                <option value="3">15 - 30</option>
                <option value="4">more than 30</option>
            </select>
        </form>
    )
}