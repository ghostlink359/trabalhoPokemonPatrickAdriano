import './BerryList.css';
import "../../styles/Card.css"
import { useEffect, useState } from 'react';
import api from '../../services/api';
import BerryCard from './BerryCard';
import Pagination from '../utils/Pagination';

function BerryList() {
    const [berries, setBerries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const limit = 20;

    useEffect(() => {
        setLoading(true);
        api.get(`/berry?limit=${limit}&offset=${page * limit}`)
            .then(res => {
                setBerries(res.data.results);
                setLoading(false);
            })
            .catch(err => {
                console.error("Erro ao carregar as berries:", err);
                setLoading(false);
            });
    }, [page]);

    return (
        <>
            <h1>Lista de Berries</h1>

            <Pagination page={page} setPage={setPage} />
            {loading ? <p>Carregando berries...</p> :
                <div className='berry-list'>
                    {berries && berries.map((item) => (
                        <BerryCard key={item.name} data={item} />
                    ))}
                </div>
            }
        </>
    );
}

export default BerryList;
