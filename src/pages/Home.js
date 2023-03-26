import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import '../styles/home.scss'

const Home = () =>{

    const selectedGenre = useSelector(state => state.selectedGenre);
    const selectFilter = useSelector(state => state.selectFilter);
    const searchValue = useSelector(state => state.searchValue);


    const [dataList, setDataList] = useState([]);
    const [numLoaded, setNumLoaded] = useState(7);
    const [resultLits, setResultList] = useState([]);
    const [filteredList, setFilteredList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const allLoaded = numLoaded >= filteredList.length;



    useEffect(()=>{
        async function getData(){
            try{
                const response = await fetch('http://localhost:5000/data')
                const data = await response.json();
                setDataList(data)
            }catch(err) {console.log(err);}
        }

        getData();

    },[])

    useEffect(()=>{

        setIsLoading(true);

        setTimeout(()=>{
            
            const sortedDataList = dataList.sort((a,b)=> a.name.localeCompare(b.name));
            if(selectFilter === "ALL"){
                setResultList(sortedDataList)
            }else if(selectFilter === "MOVIES"){
                const filteredDatalist = sortedDataList.filter((data)=>data.type === "movie")
                setResultList(filteredDatalist)
            }else if(selectFilter === "SERIES"){
                const filteredDatalist = sortedDataList.filter((data)=>data.type === "series")
                setResultList(filteredDatalist)
            }
            if(searchValue !==""){
                const searchDataList = sortedDataList.filter((data)=>
                data.name.toLowerCase().includes(searchValue.toLowerCase()));
                setResultList(searchDataList)
            }
            setIsLoading(false);

        },2000)

    },[dataList, selectFilter, selectedGenre, searchValue])

    useEffect(()=>{
     
        if(selectedGenre !== ""){
            const filteredDatalist = resultLits.filter((data)=>data.genre.some(genre=>genre === selectedGenre));
            setFilteredList(filteredDatalist)
        }else{
            setFilteredList(resultLits)
        }
        setIsLoading(false);



    },[selectedGenre, resultLits])


    



    return (
        <div className="main">
            {isLoading ? (<div className="groupCard">
                            <div className="card loader"></div>
                            <div className="card loader"></div>
                            <div className="card loader"></div>
                            <div className="card loader"></div>
                            <div className="card loader"></div>
                            <div className="card loader"></div>
                            <div className="card loader"></div>
                            <div className="card loader"></div>
            
                        </div>):(
                    
                <div className="groupCard"> 
                        {filteredList.length === 0 && selectedGenre !== "" ?(
                            <div className="notFound">
                                <h2>No movies/series were found for this genre, if you want to add one click here.</h2>
                                <button>Add Movie/Serie</button>
                            </div>):""}

                        {filteredList.slice(0, numLoaded).map(data => (
                        <div key={data.id} className="card">
                        <img src={`${data.url}`} alt="movie/series"/>
                        <h3>{data.name}</h3>
                        <p>{data.releaseDate}</p>
                        <div className="rating">{data.rating}</div>
                        </div>
                         ))}
                        {!allLoaded ? <div onClick={() => setNumLoaded(numLoaded + 8)} className="card button">See More</div> : ""}

                </div>    
                )}            
        </div>
    )
}

export default Home;