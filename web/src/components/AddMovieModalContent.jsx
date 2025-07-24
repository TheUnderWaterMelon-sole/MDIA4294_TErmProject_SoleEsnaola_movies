/**
 * AddMovieModalContent Component
 * Advanced form component for adding new movies with dynamic director/genre creation
 * Features: file upload, new director/genre creation, form validation
 * 
 * Props:
 * - onMovieAdded: Callback function triggered when a movie is successfully added
 * - onClose: Callback function to close the modal
 */

import { useState, useEffect } from "react";

import m from "./AddMovieModalContent.module.css";
import g from "../global.module.css";

function AddMovieModalContent({ onMovieAdded, onClose }) {
	// State for selected director and genre IDs from database
	const [director, setDirector] = useState("");
	const [genre, setGenre] = useState("");
	const [dbDirectors, setDbDirectors] = useState([]);
	const [dbGenres, setDbGenres] = useState([]);

	// Form input states for movie data
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState(null);

	// States for creating new directors and genres dynamically
	const [isNewDirector, setIsNewDirector] = useState(false);
	const [newDirector, setNewDirector] = useState("");
	const [isNewGenre, setIsNewGenre] = useState(false);
	const [newGenre, setNewGenre] = useState("");

	// Load existing directors and genres from the API on component mount
	useEffect(() => {
		// Fetch directors from database
		fetch("http://localhost:3000/api/directors")
			.then((res) => res.json())
			.then((data) => {
				setDbDirectors(data);
				// Set first director as default if available
				if (data.length > 0) {
					setDirector(data[0].id);
				}
			});

		// Fetch genres from database
		fetch("http://localhost:3000/api/genres")
			.then((res) => res.json())
			.then((data) => {
				setDbGenres(data);
				// Set first genre as default if available
				if (data.length > 0) {
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

	// Event handler for form submission with director/genre creation logic
	const handleFormSubmit = async (event) => {
		event.preventDefault();

		let directorId = director; // assume it's an existing director
		let genreId = genre; // assume it's an existing genre

		// Create a new director before creating the movie
		if (isNewDirector) {
			await fetch("http://localhost:3000/api/directors", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newDirector }),
			});

			directorId = newDirector; // Use the name directly for new directors
		}

		// Create a new genre before creating the movie
		if (isNewGenre) {
			await fetch("http://localhost:3000/api/genres", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ name: newGenre }),
			});

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