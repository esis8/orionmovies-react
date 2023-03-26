import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedGenre } from '../actions/actions.js';
import '../styles/dropdowngenre.scss'


function DropDownGenre(){



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
        <div className="menuDrop" onClick={handleMenuClick}>
            <div className="nav__option">{selectedGenre === "" ? "GENRE" : selectedGenre.toUpperCase()} <i className="bi bi-chevron-down"></i></div>
            {isMenuOpen ?             
                <ul className="menuDrop__label">
                    <li className="menuDrop__option" data-value="" onClick={handleOptionClick}>All</li>
                    <li className="menuDrop__option" data-value="Action" onClick={handleOptionClick}>Action</li>
                    <li className="menuDrop__option" data-value="Adventure" onClick={handleOptionClick}>Adventure</li>
                    <li className="menuDrop__option" data-value="Animation" onClick={handleOptionClick}>Animation</li>
                    <li className="menuDrop__option" data-value="Comedy" onClick={handleOptionClick}>Comedy</li>
                    <li className="menuDrop__option" data-value="Crime" onClick={handleOptionClick}>Crime</li>
                    <li className="menuDrop__option" data-value="Documentary" onClick={handleOptionClick}>Documentary</li>
                    <li className="menuDrop__option" data-value="Drama" onClick={handleOptionClick}>Drama</li>
                    <li className="menuDrop__option" data-value="Family" onClick={handleOptionClick}>Family</li>
                    <li className="menuDrop__option" data-value="Fantasy" onClick={handleOptionClick}>Fantasy</li>
                    <li className="menuDrop__option" data-value="History" onClick={handleOptionClick}>History</li>
                    <li className="menuDrop__option" data-value="Horror" onClick={handleOptionClick}>Horror</li>
                    <li className="menuDrop__option" data-value="Music" onClick={handleOptionClick}>Music</li>
                    <li className="menuDrop__option" data-value="Mystery" onClick={handleOptionClick}>Mystery</li>
                    <li className="menuDrop__option" data-value="Romance" onClick={handleOptionClick}>Romance</li>
                    <li className="menuDrop__option" data-value="Science" onClick={handleOptionClick}>Science</li>
                    <li className="menuDrop__option" data-value="Fiction" onClick={handleOptionClick}>Fiction</li>
                    <li className="menuDrop__option" data-value="TV" onClick={handleOptionClick}>TV</li>
                    <li className="menuDrop__option" data-value="Movie" onClick={handleOptionClick}>Movie</li>
                    <li className="menuDrop__option" data-value="Thriller" onClick={handleOptionClick}>Thriller</li>
                    <li className="menuDrop__option" data-value="War" onClick={handleOptionClick}>War</li>
                    <li className="menuDrop__option" data-value="Western" onClick={handleOptionClick}>Western</li>
                </ul>: ""}
        </div>
    )

}

export default DropDownGenre