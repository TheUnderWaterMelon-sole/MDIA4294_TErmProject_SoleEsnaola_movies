// DeleteMovieModalContent.jsx
import { useState } from "react";
import g from "../global.module.css";
import m from "./AddMovieModalContent.module.css";

function DeleteMovieModalContent( { movie, onClose, onMovieDeleted } ) {
	const [error, setError] = useState("");
	const [isDeleting, setIsDeleting] = useState(false);
	// Send the data to the API when the user submits the form
	const handleDeleteMovie = async (event) => {
		// Stop the HTML form from submitting
		event.preventDefault();
		
		// Clear any previous errors and set loading state
		setError("");
		setIsDeleting(true);

		try {
			// Send the DELETE request to the API to delete the movie
			const response = await fetch(`http://localhost:3000/api/movies/${movie.id}`, { 
				method: "DELETE" 
			});

			if (!response.ok) {
				// Handle different HTTP status codes with custom messages
				switch (response.status) {
					case 404:
						throw new Error(`🎬 "${movie.name}" was already deleted`);
					case 500:
						throw new Error(`💥 Database failed to delete "${movie.name}"`);
					case 503:
						throw new Error(`📴 Movie database is offline - try again later`);
					default:
						throw new Error(`❌ Failed to delete "${movie.name}" (${response.status})`);
				}
			}

			const result = await response.json();
			
			// Check if the API returned an error message
			if (result.error) {
				throw new Error(`🎭 ${result.error}`);
			}

			// Success! Call the callback functions
			onMovieDeleted();
			onClose();
			
		} catch (error) {
			// Handle network errors and other issues
			if (error.name === 'TypeError' && error.message.includes('fetch')) {
				setError("🌐 Cannot connect to movie database");
			} else if (error.message.includes('NetworkError')) {
				setError("📡 Network connection lost");
			} else if (error.message.includes('timeout')) {
				setError("⏱️ Request timed out - try again");
			} else {
				setError(error.message);
			}
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<div className={`${m["modal-container"]}`}>
			<div className={`${m["modal"]} ${g["card"]}`}>
				<h3>
					Are you sure you want to delete {movie.name} directed by {movie.director}?
				</h3>
				
				{/* Display error messages */}
				{error && (
					<div className={`${g["error-message"]}`} style={{
						color: '#d32f2f',
						backgroundColor: '#ffebee',
						border: '1px solid #ffcdd2',
						borderRadius: '4px',
						padding: '12px',
						margin: '10px 0',
						fontSize: '14px',
						lineHeight: '1.4'
					}}>
						{error}
					</div>
				)}
				
				<form onSubmit={handleDeleteMovie}>
					<button 
						className={`${g["button"]} ${g["delete"]}`} 
						type='submit'
						disabled={isDeleting}
						style={{ 
							opacity: isDeleting ? 0.6 : 1,
							cursor: isDeleting ? 'not-allowed' : 'pointer'
						}}
					>
						{isDeleting ? "🔄 Deleting..." : "Yes, delete this movie... 🎬💀"}
					</button>
				</form>
				<button 
					className={m["modal__close-button"]} 
					onClick={onClose}
					disabled={isDeleting}
				>
					x
				</button>
			</div>
		</div>
	);
}

export default DeleteMovieModalContent;