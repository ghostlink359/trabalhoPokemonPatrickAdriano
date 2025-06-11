import { useEffect, useState } from "react";
import "../../styles/View.css";
import { Link, useParams } from "react-router";
import api from "../../services/api";

const BerryView = () => {
    const { id } = useParams();
    const [berry, setBerry] = useState();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get(`/berry/${id}`)
            .then(res => {
                setBerry(res.data);
                setHasError(false);
            })
            .catch(() => {
                setBerry({});
                setHasError(true);
            });
    }, [id]);

    if (hasError) {
        return (
            <div className="view-container">
                <p>Erro ao carregar os dados da Berry.</p>
                <Link to="/berries" className="back-button">Voltar</Link>
            </div>
        );
    }

    if (!berry) return <div className="view-container">Carregando...</div>;

    return (
        <div className="view-container">
            <h1>{berry.name.charAt(0).toUpperCase() + berry.name.slice(1)}</h1>

            <img
                className="card-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.name.toLowerCase()}-berry.png`}
                alt={berry.name}
            />

            <p><strong>ID:</strong> {berry.id}</p>
            <p><strong>Tempo de crescimento:</strong> {berry.growth_time}</p>
            <p><strong>Colheita máxima:</strong> {berry.max_harvest}</p>
            <p><strong>Tamanho:</strong> {berry.size} mm</p>
            <p><strong>Suavidade:</strong> {berry.smoothness}</p>
            <p><strong>Secura do solo:</strong> {berry.soil_dryness}</p>
            <p><strong>Potência do presente natural:</strong> {berry.natural_gift_power || 'N/A'}</p>
            <p><strong>Tipo do presente natural:</strong> {berry.natural_gift_type?.name || 'N/A'}</p>

            <Link to="/berries" className="back-button">Voltar</Link>
        </div>
    );
};

export default BerryView;
