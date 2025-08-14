// Route: web/src/pages/Home.jsx

import { Link } from 'react-router-dom';
import g from '../global.module.css';

const bannerImage = '/home-bg.jpeg';

function Home() {
    return (
    <main style={{backgroundImage: `url(${bannerImage})`}} className={g['banner']}>
            <div className={`${g['grid-container']} ${g["banner__content"]} ${g["text-center"]}`}>
                <div className={g['col-12'] }>
                    <h1 className={g['h1']}>Welcome to your CineVerse</h1>
                    <h3>Sign up and share your library</h3>
                    <div className={g["banner__buttons"]}>
                        <Link to="/sign-up" className={`${g['button']} ${g["success"]}`}>Sign up</Link>
                        <Link to="/sign-in" className={`${g['button']}`}>Log in</Link>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home;