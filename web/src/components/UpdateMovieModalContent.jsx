// src/components/UpdateMovieModalContent.jsx
import { useState, useEffect } from "react";

import m from "./AddMovieModalContent.module.css";
import g from "../global.module.css";

function UpdateMovieModalContent({ onMovieUpdated, movie, onClose }) {
	// Used to store the director id and genre id
	const [director, setDirector] = useState(movie.director ?? "");
	const [genre, setGenre] = useState(movie.genre ?? "");
	const [dbDirectors, setDbDirectors] = useState([]);
	const [dbGenres, setDbGenres] = useState([]);

	// Used to store the title, image and description from the form
	const [title, setTitle] = useState(movie.name ?? "");
	const [description, setDescription] = useState(movie.description ?? "");
	const [image, setImage] = useState(null);

	// Load the directors and genres from the API
	useEffect(() => {
		// Fetch directors
		fetch("http://localhost:3000/api/directors")
			.then((res) => res.json())
			.then((data) => {
				setDbDirectors(data);
				// If there are directors in the database and the movie has no director, set the first director as the default
				if (data.length > 0 && !director) {
					setDirector(data[0].id);
				}
			});

		// Fetch genres
		fetch("http://localhost:3000/api/genres")
			.then((res) => res.json())
			.then((data) => {
				setDbGenres(data);
				// If there are genres in the database and the movie has no genre, set the first genre as the default
				if (data.length > 0 && !genre) {
					setGenre(data[0].id);
				}
			});
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		// Create FormData object to send the movie data including the image file. This is required because we are sending a file
		const formData = new FormData();

		// Append the director ID, genre ID, title, description and image to the form data
		formData.append("director_id", director);
		formData.append("genre_id", genre);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("image", image);

		// Send the PUT request to the API to update the movie
		const movieResponse = await fetch(`http://localhost:3000/api/movies/${movie.id}`, {
			method: "PUT",
			body: formData,
		});

		// Check if the request was successful
		if (movieResponse.ok) {
			// Call the onMovieUpdated function that was passed as a prop
			//    @NOTE: This is passed down from MovieList.jsx and just calls the fetchMovies function to repopulate the movies
			onMovieUpdated();

			// Close the modal.
			onClose();
		}
	};

	return (
		<div className={m["modal-container"]}>
			<div className={`${m["modal"]} ${g["card"]}`}>
				<h3>Edit Movie</h3>
				<form
					action=''
					className={`${g["form-group"]} ${g["grid-container"]}`}
					onSubmit={handleFormSubmit}
					encType='multipart/form-data'
				>
					<div className={g["col-4"]}>
						<label htmlFor='director'>Director</label>
						<select
							name='director'
							id='director'
							value={director}
							onChange={(e) => setDirector(e.target.value)}
						>
							{dbDirectors &&
								dbDirectors.map((directorItem) => (
									<option key={directorItem.id} value={directorItem.id}>
										{directorItem.name}
									</option>
								))}
						</select>

						<label htmlFor='genre'>Genre</label>
						<select
							name='genre'
							id='genre'
							value={genre}
							onChange={(e) => setGenre(e.target.value)}
						>
							{dbGenres &&
								dbGenres.map((genreItem) => (
									<option key={genreItem.id} value={genreItem.id}>
										{genreItem.name}
									</option>
								))}
						</select>

						<label htmlFor='description'>Description</label>
						<textarea
							name='description'
							id='description'
							value={description}
							onChange={(e) => setDescription(e.target.value)}
						></textarea>
					</div>
					<div className={g["col-8"]}>
						<label htmlFor='title'>Title</label>
						<input
							type='text'
							name='title'
							id='title'
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<label>Current Image</label>
						<img
							src={`http://localhost:3000/images/${movie.image_name}`}
							alt='Placeholder'
						/>
						<label htmlFor='image'>Upload New Image</label>
						<input
							type='file'
							name='image'
							id='image'
							onChange={(e) => setImage(e.target.files[0])}
						/>
					</div>
					<div className={g["col-12"]}>
						<button className={`${g["button"]} ${g["success"]}`} type='submit'>
							Save
						</button>
					</div>
				</form>
				<button onClick={onClose} className={m["modal__close-button"]}>
					❌
				</button>
			</div>
		</div>
	);
}

export default UpdateMovieModalContent;
