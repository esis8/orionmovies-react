import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import '../styles/addForm.scss';
import { useNavigate } from "react-router-dom";


const AddForm = () =>{

    const genres = ['Action', 'Adventure', 'Animation', 'Comedy', 'Crime', 'Documentary', 'Drama', 'Family', 'Fantasy', 'History', 'Horror', 'Music', 'Mystery', 'Romance', 'Science', 'Fiction', 'Thriller', 'War', 'Western'];

    const [popUp, SetPopUp] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '',
        rating: '',
        genre: [],
        castAndCrew: ['', '', '', '', ''],
        releaseDate: '',
        url: '',
        type: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };

    const handleCheckBoxChange = (e) => {
        const { name, value } = e.target;
        const isChecked = e.target.checked;
        if(isChecked){
            setFormData({...formData, [name]: [...formData[name], value]})
        }else{
            const newValues = formData[name].filter((val)=>val !== value);
            setFormData({...formData, [name]:newValues})
        }
    };

    const handleCastAndCrewChange = (e, index)=>{
        const { value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            castAndCrew: prevData.castAndCrew.map((prevValue, i)=>
            i=== index ? value: prevValue),}));
        };

  const handleRadioChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleAcceptClick(){
    SetPopUp(false);
    navigate("/");
  }
    

    const handleSubmit = async(e) =>{
        e.preventDefault();
        const newContent = {
            id: uuidv4(),
            ...formData,
        };
        try{
            const res = await fetch('http://localhost:5000/data',{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                  },
                body: JSON.stringify(newContent)  
            });
            if(res.ok){
                setFormData({
                    name: '',
                    rating: '',
                    genre: [],
                    castAndCrew: ['', '', '', '', ''],
                    releaseDate: '',
                    url: '',
                    type: '',
                });
                SetPopUp(true)
            }else{
                console.log("something went wrong");
            }
        }catch(err){
            console.error(err)
        }
    };



    return (
        <div className="formAdd">
            <h2>Please complete the form with the movie or series you want to add!</h2>
            <form onSubmit={handleSubmit}>
                    <label htmlFor="name"><span>Name <b>*</b></span>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} id="name" placeholder="Titanic"/>
                    </label>

                <label htmlFor="rating" className="form__rating"><span>Rating <b>*</b></span>
                <input type="number" name="rating" value={formData.rating} onChange={handleInputChange} min="0" max="100" id="rating" placeholder="88"/>
                </label>
                <fieldset className="form__genre">
                    <legend>Genre</legend>
                    {genres.map(genre=>(
                        <label htmlFor={genre} key={genre}>
                            <span>{genre}</span>
                            <input type="checkbox" name="genre" value={genre} id={genre} onChange={handleCheckBoxChange}/>
                        </label>
                    ))}

                </fieldset>
                <label htmlFor="url"><span>Image (URL) <b>*</b></span>
                    <input type="text" name="url" value={formData.url} onChange={handleInputChange} id="url" placeholder="https://www.themoviedb.org/t/p/w300_and_h450_bestv2/rBTJZrf5UWaxzg5YJd2eqpeaSvm.jpg"/>
                </label>
                <fieldset className="form__cast">
                <legend>Enter 5 main actors.</legend>
                {formData.castAndCrew.map((value, index)=>(
                    <label key={index} htmlFor={`cast${index + 1}`} > Actor {index + 1}
                        <input  type="text" value={value} onChange={(e)=>handleCastAndCrewChange(e, index)} placeholder="Leonardo DiCaprio"/>
                    </label>
                ))}
                </fieldset>
                <fieldset className="form__movie">
                    <legend>Movie/Serie</legend>

                    <label htmlFor="type"> Movie
                    <input type="radio" name="type" value="movie" checked={formData.type === 'movie'} onChange={handleRadioChange} id="type"/>
                    </label>

                    <label htmlFor="type"> Serie
                    <input type="radio" name="type" value="series" checked={formData.type === 'series'} onChange={handleRadioChange} id="type"/>
                    </label>

                </fieldset>

                <label htmlFor="releaseDate">
                    Release Date:
                <input type="date" name="releaseDate" id="releaseDate" onChange={handleInputChange}/>
                </label>
                


            <button type="submit">SUBMIT</button>
            </form>

            {popUp ? 
            <div className="popUp">

                <div>
                    <p>Movie/Series added successfully!</p>

                    <button onClick={handleAcceptClick}>Accept</button>
                </div>

            </div> : ""}
        </div>
    )
}

export default AddForm;