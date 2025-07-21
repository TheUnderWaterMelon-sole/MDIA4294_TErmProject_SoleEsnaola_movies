// web/src/components/AddMovieModal.jsx - Button & modal trigger (based on 4-C AddTapeModal)

import { useState } from "react";
import { createPortal } from "react-dom";
import AddMovieModalContent from "./AddMovieModalContent";

function AddMovieModal({ onMovieAdded }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>
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