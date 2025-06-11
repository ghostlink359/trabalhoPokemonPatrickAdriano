import './BerryList.css';
import '../../styles/Card.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router';

function BerryCard({ data }) {
    const [berryData, setBerryData] = useState(null);
    const [hasError, setHasError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        api.get(`/berry/${data.name}`)
            .then(res => {
                setBerryData(res.data);
                setHasError(false);
            })
            .catch(() => {
                setBerryData({});
                setHasError(true);
            });
    }, [data]);

    const handleClick = () => {
        if (berryData?.id) {
            navigate(`/berries/${berryData.id}`);
        }
    };

    if (!berryData) return <div className="card">Carregando...</div>;
    if (hasError) return <div className="card">Erro ao carregar os dados da Berry.</div>;

    return (
        <div className="card" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img
                className="card-image"
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${data.name.toLowerCase()}-berry.png`}
                alt={data.name}
            />

            <h2>{berryData.id} - {berryData.name}</h2>

            <h3>Firmeza:</h3>
            <p>{berryData.firmness.name}</p>

            <h3>Suavidade:</h3>
            <p>{berryData.smoothness}</p>

            <h3>Potência Natural:</h3>
            <p>{berryData.natural_gift_power || 'N/A'}</p>
        </div>
    );
}

export default BerryCard;
