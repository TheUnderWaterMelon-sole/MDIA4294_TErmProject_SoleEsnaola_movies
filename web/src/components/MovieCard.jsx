// src/components/MovieCard.jsx
import m from "./MovieCard.module.css";
import UpdateMovieModal from "./UpdateMovieModal";
import DeleteMovieModal from "./DeleteMovieModal";

function MovieCard({ movie, onMovieUpdated, onMovieDeleted }) {
	return (
		<div className={m.card}>
			<div className={m.imageContainer}>
				<img
					src={`http://localhost:3000/images/${movie.image_name}`}
					alt={movie.name}
					className={m.image}
				/>
			</div>
			<div className={m.content}>
				<h3 className={m.title}>{movie.name}</h3>
				<p className={m.director}><strong>Director:</strong> {movie.director}</p>
				<p className={m.genre}><strong>Genre:</strong> {movie.genre}</p>
				
				<div className={m.actions} onClick={(e) => e.stopPropagation()}>
					<UpdateMovieModal 
						movie={movie} 
						onMovieUpdated={onMovieUpdated} 
					/>
					<DeleteMovieModal 
						movie={movie} 
						onMovieDeleted={onMovieDeleted} 
					/>
				</div>
			</div>
		</div>
	);
}

export default MovieCard;