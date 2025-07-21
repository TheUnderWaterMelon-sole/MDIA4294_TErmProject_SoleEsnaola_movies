// web/src/components/AddMovieModal.jsx
import { useState } from "react";
import { createPortal } from "react-dom";
import AddMovieModalContent from "./AddMovieModalContent";
import m from "./AddMovieModalContent.module.css";

function AddMovieModal({ onMovieAdded }) {
	const [showModal, setShowModal] = useState(false);

	return (
		<div>
			<button className={m["modal-open-button"]} onClick={() => setShowModal(true)}>
				+ Add Movie +
			</button>
			{showModal &&
				createPortal(
					<AddMovieModalContent
						onMovieAdded={onMovieAdded}
						onClose={() => setShowModal(false)}
					/>,
					document.body
				)}
		</div>
	);
}

export default AddMovieModal;