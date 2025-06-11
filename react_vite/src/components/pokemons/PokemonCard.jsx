import './PokemonCard.css';
import '../../styles/Card.css';
import { useEffect, useState } from 'react';
import api from '../../services/api';
import { useNavigate } from 'react-router';

function PokemonCard({ data }) {
    const [pokemonData, setPokemonData] = useState(null);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get(`/pokemon/${data.name}`)
            .then(res => {
                setPokemonData(res.data);
                setHasError(false);
            })
            .catch(() => {
                setPokemonData({});
                setHasError(true);
            });

    }, [data]);

    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/pokemons/${pokemonData.id}`);
    }

    if (!pokemonData) return <div className="card">Carregando...</div>;

    if (hasError) return <div className="card">Erro ao carregar os dados do Pokémon.</div>;

    return (
        <div className="card" onClick={handleClick}>
            <img src={pokemonData.sprites?.front_default} alt={pokemonData.name} className="card-image" />
            <h2>{pokemonData.id} - {pokemonData.name}</h2>
            <h3>Tipos:</h3>
            <ul>
                {pokemonData.types.map((type, index) => (
                    <li key={index}>{type.type.name}</li>
                ))}
            </ul>
            <h3>Habilidades:</h3>
            <ul>
                {pokemonData.abilities.map((ability, index) => (
                    <li key={index}>{ability.ability.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default PokemonCard;
