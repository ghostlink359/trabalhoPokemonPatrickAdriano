import './PokemonList.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'
import PokemonCard from './PokemonCard'
import Pagination from '../utils/Pagination';

function PekemonList() {
    const [pokemons, setPokemons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const limit = 20;

    useEffect(() => {
        api.get(`/pokemon?limit=${limit}&offset=${page * limit}`).then(res => {
            setPokemons(res.data.results);
            setLoading(false);
        }).catch(err => {
            console.error("Erro ao carregar os pokémons:", err);
            setLoading(false);
        });
    }, [page]);


    return (
        <>
            <h1>Lista de Pokémons</h1>

            <Pagination page={page} setPage={setPage} />
            {loading ? <p>Carregando pokémons...</p> :
                <div className='pokemon-list'>
                    {pokemons && pokemons.map((item) => (
                        <PokemonCard key={item.name} data={item} />
                    ))}
                </div>
            }
        </>
    )
}

export default PekemonList
