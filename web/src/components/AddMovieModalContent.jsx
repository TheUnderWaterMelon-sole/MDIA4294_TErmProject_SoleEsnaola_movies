// src/components/AddMovieModalContent.jsx
import { useState, useEffect } from "react";

import m from "./AddMovieModalContent.module.css";
import g from "../global.module.css";

function AddMovieModalContent({ onMovieAdded, onClose }) {
	// Used to store the director id and genre id
	const [director, setDirector] = useState("");
	const [genre, setGenre] = useState("");
	const [dbDirectors, setDbDirectors] = useState([]);
	const [dbGenres, setDbGenres] = useState([]);

	// Used to store the title, image and description from the form
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);

	// State to handle adding new director
	const [isNewDirector, setIsNewDirector] = useState(false);
	const [newDirector, setNewDirector] = useState("");

	// State to handle adding new genre
	const [isNewGenre, setIsNewGenre] = useState(false);
	const [newGenre, setNewGenre] = useState("");

	// Load the directors and genres from the API
	useEffect(() => {
		// Fetch directors
		fetch("http://localhost:3000/api/directors")
			.then((res) => res.json())
			.then((data) => {
				setDbDirectors(data);
				// If there are directors in the database and no director is selected, set the first director as the default
				if (data.length > 0 && !director) {
					setDirector(data[0].id);
				}
			});

		// Fetch genres
		fetch("http://localhost:3000/api/genres")
			.then((res) => res.json())
			.then((data) => {
				setDbGenres(data);
				// If there are genres in the database and no genre is selected, set the first genre as the default
				if (data.length > 0 && !genre) {
					setGenre(data[0].id);
				}
			});
	}, []);

	// Toggle the select and the input for directors
	const handleDirectorSelectChange = (eventTrigger) => {
		if (eventTrigger.target.value === "-1") {
			setIsNewDirector(true);
			setDirector("");
		} else {
			setIsNewDirector(false);
			setDirector(eventTrigger.target.value);
		}
	};

	// Toggle the select and the input for genres
	const handleGenreSelectChange = (eventTrigger) => {
		if (eventTrigger.target.value === "-1") {
			setIsNewGenre(true);
			setGenre("");
		} else {
			setIsNewGenre(false);
			setGenre(eventTrigger.target.value);
		}
	};

	const handleFormSubmit = async (event) => {
		event.preventDefault();

		let directorId = director; // assume it's an existing director
		let genreId = genre; // assume it's an existing genre

		// Create a new director before creating the movie
		if (isNewDirector) {
			const directorResponse = await fetch("http://localhost:3000/api/directors", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newDirector }),
			});

			// Get the new director data from the response
			const directorData = await directorResponse.json();
			directorId = newDirector; // Use the name directly for new directors
		}

		// Create a new genre before creating the movie
		if (isNewGenre) {
			const genreResponse = await fetch("http://localhost:3000/api/genres", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newGenre }),
			});

			// Get the new genre data from the response
			const genreData = await genreResponse.json();
			genreId = newGenre; // Use the name directly for new genres
		}

		// Create FormData object to send the movie data including the image file. This is required because we are sending a file
		const formData = new FormData();

		// Append the director ID, genre ID, title, description and image to the form data
		formData.append("director_id", directorId);
		formData.append("genre_id", genreId);
		formData.append("title", title);
		formData.append("description", description);
		formData.append("image", image);

		// Send the POST request to the API to create a new movie
		const movieResponse = await fetch(`http://localhost:3000/api/movies`, {
			method: "POST",
			body: formData,
		});

		// Get the response from the API
		const movieResult = await movieResponse.json();

		// Log the response to the console
		console.log("Result:", movieResult);

		// Call the onMovieAdded function that was passed as a prop
		//    @NOTE: This is passed down from MovieList.jsx and just calls the fetchMovies function to repopulate the movies
		onMovieAdded();

		// Close the modal.
		onClose();
	};

	return (
		<div className={m["modalOverlay"]}>
			<div className={`${m["modal"]} ${g["card"]}`}>
				<h3>Add Movie</h3>
				<form
					action=''
					className={`${g["form-group"]} ${g["grid-container"]}`}
					onSubmit={handleFormSubmit}
					encType='multipart/form-data'
				>
					<div className={g["col-4"]}>
						<label htmlFor='director'>Director</label>
						{!isNewDirector ? (
							<select
								name='director'
								id='director'
								value={director}
								onChange={handleDirectorSelectChange}
							>
								{dbDirectors &&
									dbDirectors.map((director) => (
										<option key={director.id} value={director.id}>
											{director.name}
										</option>
									))}
								<option value="-1">+ Add New Director</option>
							</select>
						) : (
							<div>
								<input
									type="text"
									placeholder="Enter new director name"
									value={newDirector}
									onChange={(e) => setNewDirector(e.target.value)}
									required
								/>
								<button 
									type="button" 
									onClick={() => setIsNewDirector(false)}
									className={g["button"]}
								>
									Cancel
								</button>
							</div>
						)}

						<label htmlFor='genre'>Genre</label>
						{!isNewGenre ? (
							<select
								name='genre'
								id='genre'
								value={genre}
								onChange={handleGenreSelectChange}
							>
								{dbGenres &&
									dbGenres.map((genre) => (
										<option key={genre.id} value={genre.id}>
											{genre.name}
										</option>
									))}
								<option value="-1">+ Add New Genre</option>
							</select>
						) : (
							<div>
								<input
									type="text"
									placeholder="Enter new genre name"
									value={newGenre}
									onChange={(e) => setNewGenre(e.target.value)}
									required
								/>
								<button 
									type="button" 
									onClick={() => setIsNewGenre(false)}
									className={g["button"]}
								>
									Cancel
								</button>
							</div>
						)}

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
							required
						/>
						<label htmlFor='image'>Upload Image</label>
						<input
							type='file'
							name='image'
							id='image'
							onChange={(e) => setImage(e.target.files[0])}
							required
						/>
					</div>
					<div className={g["col-12"]}>
						<button className={`${g["button"]} ${g["success"]}`} type='submit'>
							Add Movie
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

export default AddMovieModalContent;