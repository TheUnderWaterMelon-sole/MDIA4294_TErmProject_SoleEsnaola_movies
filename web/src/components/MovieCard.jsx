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
				<p className={m.director}>Director: {movie.director}</p>
				<p className={m.genre}>Genre: {movie.genre}</p>
				{movie.description && (
					<p className={m.description}>
						{movie.description.length > 100 
							? `${movie.description.substring(0, 100)}...` 
							: movie.description
						}
					</p>
				)}
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