import { useEffect, useState } from "react";
import "../../styles/Card.css"
import api from "../../services/api";

export default function LocationCard({ name }) {
    const [location, setLocation] = useState();

    useEffect(() => {
        api.get(`/location/${name}`).then((res) => {
            setLocation(res.data)
        })
    }, [name])

    return (
        <>

            <div className="card">
                {!location ? <span>Carregando</span> :
                    <>
                        <h2>
                            {location.id} - {location.names[0].name}
                        </h2>
                        <h3>Informações:</h3>
                        <ul>
                            <li>Região: {location.region.name}</li>
                            <li>Geração: {location.game_indices[0]?.generation.name}</li>
                        </ul>
                    </>
                }
            </div>
        </>
    );

}