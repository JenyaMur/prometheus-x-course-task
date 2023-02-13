import React from "react";
import { Link } from 'react-router-dom';
import './BookElement.sass';
import img from '../../img/imageNotFound.png';

export default function BookElement({id, author, price, image, title}) {
    return (
        <div className="card book-box">
            <img src={image || img} className="img-fluid card-section-img" alt={`${title} - ${author}`} />
            <div className="card-body card-body-section">
                <div className="book-title-section">
                    <h5 className="card-title">{title.length < 25 ? title : `${title.substr(0, 24)}...`}</h5>
                </div>
                <p className="card-text">{author}</p>
            </div>
            <div className="card-bottom">
                <div className="card-book-price"><span className="book-section-price">{price} $ </span></div>
                <Link to={`/book/${id}`} className="btn btn-secondary">View</Link>
            </div>
        </div>
    )
}