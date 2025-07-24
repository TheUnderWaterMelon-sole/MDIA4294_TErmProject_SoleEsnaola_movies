// DeleteMovieModal.jsx
import { useState } from "react"
import { createPortal } from "react-dom"
import DeleteMovieModalContent from "./DeleteMovieModalContent";
import g from "../global.module.css";

function DeleteMovieModal( { movie, onMovieDeleted }) {

    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <button 
                className={`${g["button"]} ${g["small"]} ${g["delete"]}`} 
                onClick={ () => { setShowModal(true) } }
            >Delete</button>

            {showModal && createPortal(
            <DeleteMovieModalContent 
                movie={movie}
                onMovieDeleted={onMovieDeleted}
                onClose={ () => { setShowModal( false ) }} 
            />, 
            document.body)}

        </>
    )

}

export default DeleteMovieModal;