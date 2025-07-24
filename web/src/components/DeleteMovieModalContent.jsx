// DeleteMovieModalContent.jsx
import g from "../global.module.css";
import m from "./AddMovieModalContent.module.css";

function DeleteMovieModalContent( { movie, onClose, onMovieDeleted } ) {
	// Send the data to the API when the user submits the form
	const handleDeleteMovie = (event) => {
		// Stop the HTML form from submitting
		event.preventDefault();

		// Send the DELETE request to the API to delete the movie
		fetch(`http://localhost:3000/api/movies/${movie.id}`, { method: "DELETE" })
			.then((response) => response.json())
			.then(() => {
				// Call the onMovieDeleted function that was passed as a prop
				//    @NOTE: This is passed down from MovieList.jsx and just calls the fetchMovies function to repopulate the movies
				onMovieDeleted();

				// Close the modal.
				onClose();
			});
	};

	return (
		<div className={`${m["modal-container"]}`}>
			<div className={`${m["modal"]} ${g["card"]}`}>
				<h3>
					Are you sure you want to delete {movie.name} directed by {movie.director}?
				</h3>
				<form onSubmit={handleDeleteMovie}>
					<button className={`${g["button"]} ${g["delete"]}`} type='submit'>
						Yes, delete this movie... 🎬💀
					</button>
				</form>
				<button className={m["modal__close-button"]} onClick={onClose}>
					x
				</button>
			</div>
		</div>
	);
}

export default DeleteMovieModalContent;