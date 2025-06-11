import { useEffect, useState } from "react";
import api from '../../services/api'
import LocationCard from "./LocationCard";
import "../../styles/List.css";
import Pagination from "../utils/Pagination";

export default function LocationList() {
    const [locations, setLocations] = useState();
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(0);
    const limit = 20;

    useEffect(() => {
        api.get(`/location?limit=${limit}&offset=${page * limit}`).then(res => {
            setLocations(res.data.results);
            setLoading(false);
        }).catch(err => {
            console.error("Erro ao carregar os locais:", err);
            setLoading(false);
        });
    }, [page]);


    if (loading) {
        return <><span>Carregando .. </span></>
    }

    if (!locations) {
        return <span> Carregando .. </span>
    }
    return (
        <>
            <Pagination setPage={setPage} page={page} />

            <div className="list">
                {
                    locations && locations.map(location => (
                        <div key={location.name}>
                            <LocationCard key={location.name} name={location.name} />
                        </div>
                    ))
                }
            </div>

        </>
    )
}