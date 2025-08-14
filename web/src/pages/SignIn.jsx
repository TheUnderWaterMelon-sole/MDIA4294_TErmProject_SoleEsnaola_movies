// Route: web/src/pages/SignIn.jsx

import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import g from '../global.module.css';
const bannerImage = '/home-bg.jpeg';

function SignIn() {
    const [loginSuccess, setLoginSuccess] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: "",
    });

    const navigate = useNavigate();

    // send the user to the /movies page if they log in successfully
    useEffect(() => {
        if (loginSuccess) {
            navigate('/movies');
        }
    }, [loginSuccess, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

    fetch('/api/users/sign-in', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            }),
        })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem('token', data.token);
            setLoginSuccess(true);
        });
    };

    return (
        <main
            style={{ backgroundImage: `url(${bannerImage})` }}
            className={`${g["container"]} ${g["full-width"]} ${g["banner"]}`}
        >
            <div className={`${g["grid-container"]} ${g["banner__content"]}`}>
                <div className={g["col-12"]}>
                    <div className={`${g["card"]} ${g["card--w-padding"]}`}>
                        <h1 className={g["h1"]}>Sign In</h1>
                        <form
                            className={`${g["form-group"]} ${g["form--full"]}`}
                            onSubmit={handleSubmit}
                        >
                            <div>
                                <label htmlFor='email'>Email</label>
                                <input
                                    type='email'
                                    id='email'
                                    name='email'
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor='password'>Password</label>
                                <input
                                    type='password'
                                    id='password'
                                    name='password'
                                    autoComplete='current-password'
                                    onChange={(e) =>
                                        setFormData({ ...formData, password: e.target.value })
                                    }
                                    required
                                />
                            </div>
                            <input
                                type='submit'
                                value='Sign In'
                                className={`${g["button"]} ${g["success"]}`}
                            />
                            <Link to="/" className={`${g["button"]} ${g["cancel"]}`}>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignIn;