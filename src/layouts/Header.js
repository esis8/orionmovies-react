import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter, setSearch } from '../actions/actions.js'
import '../styles/header.scss'
import DropDownGenre from "../components/DropDownGenre.js";
import { Link } from "react-router-dom";



const Header = () =>{


    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [isInputOpen, setIsInputOpen] = useState(false);

    const searchValue = useSelector(state => state.searchValue);



    const dispatch = useDispatch();

    function handleFilternClick(event){
        const option = event.currentTarget.dataset.value;
        dispatch(setFilter(option));
        setIsMenuOpen(false)
    }

    useEffect(()=>{

        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener("resize", handleResize);
        return () => {
         window.removeEventListener("resize", handleResize);
        }
    },[windowWidth]);

    useEffect(()=>{
        (isMenuOpen || windowWidth>1000) ? document.querySelector("nav").style.display="flex" : document.querySelector("nav").style.display="none"; 
    },[isMenuOpen, windowWidth])


function handleMenuClick() {
    if(!isMenuOpen){
        const rotate = document.querySelector("#mob");
        rotate.classList.add("rotate")
        setTimeout(()=>{
            setIsMenuOpen(!isMenuOpen);
            rotate.classList.remove("rotate")
        },500);
    }else{
        const rotate = document.querySelector("#mob");
        rotate.classList.add("rotateRevelsal")
        setTimeout(()=>{
            setIsMenuOpen(!isMenuOpen);
            rotate.classList.remove("rotateRevelsal")
        },500);
    } 
  }

function handleInputClick(){
    setIsInputOpen(!isInputOpen)
}

const handleInputChange = (event)=> {
    const option = event.target.value;
    dispatch(setSearch(option));

}


return (
    <div className="navbar">
        <Link to='/'><img src="/img/logo.png" alt="logo"/></Link>
        <nav>
            <ul className={`nav__label ${isInputOpen ? "open" : ""}`}>
                <input type={"text"} placeholder="Search..." value={searchValue} onChange={handleInputChange}  className="inputMob"/>
                <li className="nav__option" data-value="ALL" onClick={handleFilternClick}>ALL</li>
                <li className="nav__option" data-value="MOVIES" onClick={handleFilternClick}>MOVIES</li>
                <li className="nav__option" data-value="SERIES" onClick={handleFilternClick}>SERIES</li>
                <DropDownGenre/>
                <li className="nav__option mob" onClick={handleInputClick}><i className="bi bi-search"></i></li>
                <li className="nav__option mob"><Link to='/add-content'><button className="addItem"><i className="bi bi-plus"></i></button></Link></li>
            </ul>
            <div className={`search ${isInputOpen ? "open" : ""}`}>
                <input type={"text"} placeholder="Search..." value={searchValue} onChange={handleInputChange}/>
                <i className="bi bi-x-lg" onClick={handleInputClick}></i>
            </div>
                  
        </nav>
        <div className="login">
            <div>SING IN</div>
            <button>SING UP</button> 
        </div>
        <div className="menu__mob">
            <button className="login__mob">
                <i className="bi bi-person-fill"></i>
            </button>   
            <div id="mob">
                {isMenuOpen ?
                <i className="bi bi-x" onClick={handleMenuClick}></i> : 
                <i className="bi bi-list" onClick={handleMenuClick}></i>}
            </div>
        </div>

        

    </div>
)

}
export default Header;
