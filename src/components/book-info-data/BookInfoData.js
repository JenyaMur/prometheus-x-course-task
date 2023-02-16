import NavMenu from "../nav-menu/NavMenu";
import img from '../../img/imageNotFound.png';

export default function BookInfoData({image, title, author, shortDescription, description, children}) {
    return (
        <div>
          <NavMenu />
          <div className="main-block row">
            <div className="book-image col-12 col-sm-6 col-md-5 col-lg-4 col-xl-3 text-center">
              <img src={image || img} width="250" alt="first book" />
            </div>
            <div className="book-details col-12 col-sm-6 col-md-4 col-lg-4 col-xl-5">
              <p className="fw-bold">{title}</p>
              <p className="fw-bold">{author}</p>
              <p className="fst-italic">{shortDescription}</p>
            </div>
            <div className="book-form-price col-12 col-md-3 col-lg-4 col-xl-4">
              {children}
            </div>
          </div>
            <p className="text-description mt-3">{description}</p>
        </div>
    )
}