// src/components/AddMovieModal.jsx
import { useState } from "react";
// createPortal is a function that allows us to append HTML to the body of the document
import { createPortal } from "react-dom";

// We will look at this shortly
import ModalContent from "./AddMovieModalContent";
import g from "../global.module.css";

// OnMovieAdded will re-fetch the data from the API so when the new movie is added to the database it will be displayed in the list
function AddMovieModal({ onMovieAdded }) {
	// State variable to store the state of the modal: open=true, closed=false
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			{/* Button to open the modal and set state to "true" */}
			<button className={g["button"]} onClick={() => setShowModal(true)}>
				+ Add Movie
			</button>
			{/* This is called a "short-circuit" conditional: if "showModal" is true, anything after "&&" will run, if false, nothing happens */}
			{showModal &&
				createPortal(
					<ModalContent
						onMovieAdded={onMovieAdded}
                        // onClose is a function that will be passed down to set the state to false. This is will remove the modal from the DOM.
						onClose={() => setShowModal(false)}
					/>,
					document.body
				)}
		</div>
	);
}

export default AddMovieModal;