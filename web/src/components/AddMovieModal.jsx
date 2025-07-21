// AddMovieModal.jsx

// src/components/AddTapeModal.jsx
import { useState } from "react";
// createPortal is a function that allows us to append HTML to the body of the document
import { createPortal } from "react-dom";

// We will look at this shortly
import ModalContent from "./AddTapeModalContent";
import g from "../global.module.css";

// OnTapeAdded will re-fetch the data from the API so when the new tape is added to the database it will be displayed in the list
function AddTapesModal({ onTapeAdded }) {
	// State variable to store the state of the modal: open=true, closed=false
	const [showModal, setShowModal] = useState(false);
	return (
		<div>
			{/* Button to open the modal and set state to "true" */}
			<button className={g["button"]} onClick={() => setShowModal(true)}>
				+ Add Tape +
			</button>
			{/* This is called a "short-circuit" conditional: if "showModal" is true, anything after "&&" will run, if false, nothing happens */}
			{showModal &&
				createPortal(
					<ModalContent
						onTapeAdded={onTapeAdded}
                        // onClose is a function that will be passed down to set the state to false. This is will remove the modal from the DOM.
						onClose={() => setShowModal(false)}
					/>,
					document.body
				)}
		</div>
	);
}

export default AddTapesModal;
