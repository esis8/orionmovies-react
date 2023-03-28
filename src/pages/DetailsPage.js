import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

function DetailsPage(){

    const { id } = useParams();
    const navigate = useNavigate();
    const [details, setDetails] = useState([])

    useEffect(()=>{
        async function getData(){
            try{
                const response = await fetch('http://localhost:5000/data')
                const data = await response.json();
                const item = data.filter(item => item.id.toString() === id);
                setDetails(item[0])
                
            }catch(err) {console.log(err);}
        }

        getData();

    },[id])

    async function handleDeleteData(){
        try{
            const response = await fetch(`http://localhost:5000/data/${id}`, {
                method: 'DELETE',
            });
            const data = await response.json();
            //console.log(data) //Respuesta despues de eliminar
            navigate("/");
        }catch(err){
            console.log(err)
        }
    }



/*     if (!details) {
        return <div>Loading...{id}</div>;
      } */

      return (
        <div>
            <h1>Hola</h1>
            <h1>{}</h1>
            <h1>{details.name}</h1>
            <img src={details.url} alt={details.name} />
            <p>{details.releaseDate}</p>
            <p>{details.rating}</p>
            <button onClick={handleDeleteData}>DELETE</button>
        </div>
      );


}

export default DetailsPage;