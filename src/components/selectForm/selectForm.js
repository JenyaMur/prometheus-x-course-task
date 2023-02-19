export default function SelectForm({cb}) {

    function priceFilter(e) {
        cb(e.target.value);
    }

    return (
        <form>
            <select name="price-select" className="form-select" onChange={priceFilter}>
                {/* <option defaultValue hidden disabled>Price:</option> */}
                <option value="1">Price: all</option>
                <option value="2">less than 15</option>
                <option value="3">15 - 30</option>
                <option value="4">more than 30</option>
            </select>
        </form>
    )
}