/**
 * MovieList Component
 * Main page component displaying all movies in a responsive 3-column grid
 * Features: movie filtering, add movie modal, edit/delete functionality
 */

import { useState, useEffect } from "react";
import { Link } from "react-router";

import MovieCard from "../components/MovieCard";
import AddMovieModal from "../components/AddMovieModal";
import MovieFilter from "../components/MovieFilter";

import m from "./MovieList.module.css";
import g from "../global.module.css";

function MovieList() {
	// State management for movies and filtering
	const [movies, setMovies] = useState([]);
	const [filteredMovies, setFilteredMovies] = useState([]);

	// Fetch movies on component mount
	useEffect(() => {
		fetchMovies();
	}, []);

	// API call to retrieve all movies from the database
	const fetchMovies = async () => {
		try {
			const response = await fetch("http://localhost:3000/api/movies");
			const data = await response.json();
			setMovies(data);
			setFilteredMovies(data);
		} catch (error) {
			console.error("Error fetching movies:", error);
		}
	};

	// Handle movie filtering by genre or director
	const handleFilter = (type, value) => {
		if (!value) {
			setFilteredMovies(movies);
			return;
		}

		const filtered = movies.filter(movie => {
			if (type === 'genre') {
				return movie.genre.toLowerCase().includes(value.toLowerCase());
			} else if (type === 'director') {
				return movie.director.toLowerCase().includes(value.toLowerCase());
			}
			return true;
		});
		
		setFilteredMovies(filtered);
	};

	// Event handlers for CRUD operations - refresh movie list after changes
	const handleMovieAdded = () => {
		fetchMovies(); // Refresh the movie list when a new movie is added
	};

	const handleMovieUpdated = () => {
		fetchMovies(); // Refresh the movie list when a movie is updated
	};

	const handleMovieDeleted = () => {
		fetchMovies(); // Refresh the movie list when a movie is deleted
	};

	return (
		<main>
			<div className={g.container}>
				<div className={m.header}>
					<h1>Movie Collection</h1>
					<AddMovieModal onMovieAdded={handleMovieAdded} />
				</div>
				
				<div className={m.filters}>
					<MovieFilter onFilter={handleFilter} />
				</div>

				<div className={m.cardsGrid}>
					{filteredMovies.map((movie) => (
						<div key={movie.id} className={m.movieCardWrapper}>
							<Link to={`/movies/${movie.id}`} className={m.movieLink}>
								<MovieCard 
									movie={movie} 
									onMovieUpdated={handleMovieUpdated}
									onMovieDeleted={handleMovieDeleted}
								/>
							</Link>
						</div>
					))}
				</div>

				{filteredMovies.length === 0 && (
					<div>
						<p>No movies found.</p>
					</div>
				)}
			</div>
		</main>
	);
}

export default MovieList;