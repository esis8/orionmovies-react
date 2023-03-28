import '../styles/notFound.scss';
import { useNavigate } from "react-router-dom";

const NotFound = () =>{

    const navigate = useNavigate();

    function handleAcceptClick(){
        navigate("/");
      }


    return (

        <div className="notFound">
            <h2>Movie or Series not found!</h2>
            <button onClick={handleAcceptClick}>GO HOME</button>
        </div>
    )
}

export default NotFound;