import { useEffect, useState } from "react";
import "./PokemonView.css";
import "../../styles/View.css";
import { Link, useParams } from "react-router";
import api from "../../services/api";

const PokemonView = () => {
    const { id } = useParams();
    const [pokemon, setPokemon] = useState();
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        api.get(`/pokemon/${id}`).then(res => {
            setPokemon(res.data);
        })
            .catch(() => {
                setPokemon({});
                setHasError(true);
            });
    })

    if (hasError) {
        return (
            <div className="view-container">
                Erro ao carregar os dados do Pokémon.
                <Link to="/pokemons">Voltar</Link>
            </div>
        );
    }

    if (!pokemon) return <div className="view-container">Carregando...</div>;

    return (
        <div className="view-container">
            <h1>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h1>
            <img
                src={pokemon.sprites.front_default}
                alt={pokemon.name}
                width={150}
                height={150}
            />
            <p>
                <strong>ID:</strong> {pokemon.id}
            </p>
            <p>
                <strong>Tipo(s):</strong>{" "}
                {pokemon.types.map((t) => t.type.name).join(", ")}
            </p>
            <p>
                <strong>Peso:</strong> {pokemon.weight / 10} kg
            </p>
            <p>
                <strong>Altura:</strong> {pokemon.height / 10} m
            </p>
            <Link to="/pokemons">Voltar</Link>
        </div>
    )
};

export default PokemonView;