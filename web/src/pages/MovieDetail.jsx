/**
 * MovieDetail Component
 * Detailed view page for individual movies with full information display
 * Features: edit movie modal, delete confirmation, return navigation
 */

import { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router";
import UpdateMovieModal from "../components/UpdateMovieModal";
import DeleteMovieModal from "../components/DeleteMovieModal";

import m from "./MovieDetail.module.css";

function MovieDetail() {
	// Get movie ID from URL parameters and navigation hook
	const { id } = useParams();
	const navigate = useNavigate();
	const [movie, setMovie] = useState(null);

	// API call to get specific movie by ID (memoized to prevent infinite re-renders)
	const fetchMovie = useCallback(async () => {
		try {
			const response = await fetch(`http://localhost:3000/api/movies/${id}`);
			const data = await response.json();
			setMovie(data);
		} catch (error) {
			console.error("Error fetching movie:", error);
		}
	}, [id]);

	// Fetch movie details when component mounts or ID changes
	useEffect(() => {
		fetchMovie();
	}, [fetchMovie]);

	// Event handlers for movie CRUD operations
	const handleMovieUpdated = () => {
		fetchMovie(); // Refresh the movie data
	};

	const handleMovieDeleted = () => {
		navigate("/"); // Navigate back to movie list after deletion
	};

	// Loading state while fetching movie data
	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<main>
			<div className="container">
				<button 
					className={m.returnButton} 
					onClick={() => navigate("/")}
				>
					← All Movies
				</button>
				<div className={m.movieDetail}>
					<div className={m.imageContainer}>
						<img
							src={`http://localhost:3000/images/${movie.image_name}`}
							alt={movie.name}
						/>
					</div>
					<div className={m.movieInfo}>
						<h1>{movie.name}</h1>
						<h3>Director: {movie.director}</h3>
						<h4>Genre: {movie.genre}</h4>
						{movie.description && (
							<div>
								<h4>Description:</h4>
								<p>{movie.description}</p>
							</div>
						)}
						<div className={m.actions}>
							<UpdateMovieModal 
								movie={movie} 
								onMovieUpdated={handleMovieUpdated} 
							/>
							<DeleteMovieModal 
								movie={movie} 
								onMovieDeleted={handleMovieDeleted} 
							/>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}

export default MovieDetail;