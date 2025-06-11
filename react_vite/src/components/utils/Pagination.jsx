import { useState } from "react";


export default function Pagination({ page, setPage }) {
    const [pageForm, setPageForm] = useState(0);

    const handlePrev = () => setPage((prev) => Math.max(prev - 1, 0));
    const handleNext = () => setPage((prev) => prev + 1);


    return (
        <div className="pokemon-pagination">

            <button onClick={handlePrev} disabled={page === 0}>Anterior</button>
            <span>Página {page + 1}</span>
            <button onClick={handleNext}>Próxima</button>
            <span>Ir para página:</span>
            <input
                type="number"
                min={1}
                onChange={e => {
                    const value = Number(e.target.value);
                    if (value >= 1) setPageForm(value - 1);
                }}
                className="pokemon-page-input"
            />
            <button
                onClick={() => setPage(pageForm)}
            >
                Confirmar
            </button>
        </div>
    )
}