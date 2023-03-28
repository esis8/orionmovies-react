import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGenre } from '../actions/actions.js';
import '../styles/dropdowngenre.scss'


function DropDownGenre(){

    const genres = ['All', 'Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science', 'Fiction', 'Thriller', 'War', 'Western'];

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    function handleMenuClick() {
        setIsMenuOpen(!isMenuOpen);
      }
    
    const selectedGenre = useSelector(state => state.selectedGenre);
    const dispatch = useDispatch();

    function handleOptionClick(event){
        const option = event.currentTarget.dataset.value;
        dispatch(setSelectedGenre(option));
        setIsMenuOpen(false)
    }

    return(
        <li className={`nav__option menuDrop`} onClick={handleMenuClick}>
            {selectedGenre === "" ? "GENRE" : selectedGenre.toUpperCase()} <i className="bi bi-chevron-down"></i>
            {isMenuOpen ?             
                <ul className="menuDrop__label">
                {genres.map((genre)=>(
                        <li className="menuDrop__option" data-value={genre === "All" ? "" : genre} onClick={handleOptionClick}>{genre}</li> 
                    ))}
                </ul>: ""}
        </li>
    )

}

export default DropDownGenre