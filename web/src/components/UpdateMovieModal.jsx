// updateMovieModal.jsx

import { useState } from "react";
import { createPortal } from "react-dom"
import UpdateMovieModalContent from "./UpdateMovieModalContent";

import g from "../global.module.css";

function UpdateMovieModal( { onMovieUpdated, movie } ) {

    const [showModal, setShowModal] = useState(false);

    return(
        <>
            <button    
                className={`${g["button"]} ${g["small"]} ${g["warning"]}`}
                onClick={ () => { setShowModal(true) }}
            >Edit</button>

            { showModal && createPortal(<UpdateMovieModalContent onClose={ () => { setShowModal(false) } } movie={movie} onMovieUpdated={onMovieUpdated} />, document.body) }
        </>
    );
}

export default UpdateMovieModal;