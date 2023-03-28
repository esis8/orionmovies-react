import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import '../styles/detalilsPage.scss'

function DetailsPage(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [popUp, SetPopUp] = useState(false);

    useEffect(()=>{

        setIsLoading(true);
        async function getData(){
            try{
                const response = await fetch('http://localhost:5000/data')
                const data = await response.json();
                const item = data.filter(item => item.id.toString() === id);
                setDetails(item[0])
                setIsLoading(false);
                
            }catch(err) {console.log(err);}
        }

        setTimeout(()=>{
        getData();
        },1000);

    },[id])

    function handleAcceptClick(){
        SetPopUp(false);
        navigate("/");
      }

    async function handleDeleteData(){
        try{
            const response = await fetch(`http://localhost:5000/data/${id}`, {
                method: 'DELETE',
            });
           await response.json();
            SetPopUp(true)
        }catch(err){
            console.log(err)
        }
    }

        if(!details){
            return navigate("/not-Found")
        }



      return (
        <div className="detailsPage">
            {isLoading ? 
            (<> 
                <section><div className="card loader"></div></section>
                <section>
                    <div className="title loader"></div>
                    <p className="p loader"></p>
                    <p className="p loader"></p>
                    <p className="p loader"></p>
                    <p className="p loader"></p>
                </section>
                
            </>) : (<>
                <section>
                <img src={details.url} alt={details.name} />
            </section>
            <section>
                <h2>{details.name}</h2>
                {details.genre && Array.isArray(details.genre)?<p>{"Genres: "} {details.genre.map((genre, index)=>(
                    <span key={genre}>{` ${genre}`}{index < details.genre.length - 1 ? ", " : "."}</span>
                ))}</p>:""}
                <p>Rating: {details.rating}</p>
                <p>{details.releaseDate}</p>
                {details.castAndCrew && Array.isArray(details.castAndCrew)?<p>Cast & Crew: {details.castAndCrew.map((person, index)=>(
                    <span key={person}>{` ${person}`}{index < details.castAndCrew.length - 1 ? ", " : "."}</span>
                ))}</p>:""}
                <button onClick={handleDeleteData}>DELETE</button>
            </section>
            </>)
            }
            {popUp ? 
            <div className="popUp">

                <div>
                    <p>Movie/Series delete successfully!</p>

                    <button onClick={handleAcceptClick}>Accept</button>
                </div>

            </div> : ""}

        </div>
      );


}

export default DetailsPage;