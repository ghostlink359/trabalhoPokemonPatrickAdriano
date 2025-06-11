import { useNavigate } from "react-router"
import './index.css'


export default function Home() {
    const navigate = useNavigate();

    function handleClick() {
        navigate("/pokemons");
    }

    return (
        <>
            <div className="home-container">
                <h1>Página de listagem de pokémons</h1>
                <p>
                    Esta página foi criada na aula de Programação Frontend
                    no curso de Eng de Soft.
                </p>
                <button className="home-btn" onClick={handleClick}>Listar Pókemons</button>

            </div>
        </>

    )
}

