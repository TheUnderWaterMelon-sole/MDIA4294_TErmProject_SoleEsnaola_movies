// web/pages/MovieDetail.jsx
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./MovieList.css";

function MovieDetail() {
    const { id } = useParams();
    const [movieData, setMovieData] = useState({});

    useEffect(() => {
        fetch(`http://localhost:3001/api/movies/${id}`)
            .then((response) => response.json())
            .then((data) => {
                setMovieData(data);
            });
    }, [id]);

    return (
        <main className="page-container">
            <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start" }}>
                <div style={{
                    flex: "0 0 280px",
                    background: "#23201e",
                    borderRadius: "1rem",
                    padding: "1.5rem",
                    boxShadow: "0 6px 24px rgba(0,0,0,0.11)"
                }}>
                    <img
                        className="movie-poster"
                        src={`http://localhost:3001/images/${movieData.image}`}
                        alt={movieData.title}
                        style={{ width: "100%", borderRadius: "0.7rem", background: "#151010" }}
                    />
                </div>
                <div style={{ flex: 1 }}>
                    <Link to='/' className="filter-btn" style={{ marginBottom: "2rem", display: "inline-block" }}>
                        &lt; Movie List
                    </Link>
                    <h1 className="movie-title" style={{ fontSize: "2.2rem", margin: "1rem 0 0.6rem 0", textAlign: "left" }}>
                        {movieData.title}
                    </h1>
                    <div className="movie-meta" style={{ fontSize: "1.1rem", marginBottom: "1.2rem", textAlign: "left" }}>
                        <strong>Director:</strong> {movieData.director} <br />
                        <strong>Genre:</strong> {movieData.genre}
                    </div>
                    <p style={{ lineHeight: "1.6", color: "#e5e1dc", fontSize: "1.08rem" }}>
                        {movieData.description}
                    </p>
                </div>
            </div>
        </main>
    );
}

export default MovieDetail;