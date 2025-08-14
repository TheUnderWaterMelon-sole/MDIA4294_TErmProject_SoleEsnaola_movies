// Route: web/src/pages/SignUp.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import g from '../global.module.css';

// Adjust the path if the image location is different in MovieRepo
const bannerImage = '/home-bg.jpeg';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });
    const navigate = useNavigate();
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('/api/users/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: formData.email,
                    password: formData.password
                })
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.message || 'Registration failed');
                return;
            }
            alert('Registration successful! Please sign in.');
            navigate('/sign-in');
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className={` ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div className={`${g['card']} ${g['card--w-padding']}`}>
                        <h1 className={g['h1']}>Join our MovieVerse</h1>
                        <form onSubmit={handleSubmit} className={`${g['form-group']} ${g["form--full"]}`}>
                            {error && <div style={{color: 'red', marginBottom: '1rem'}}>{error}</div>}
                            <div>
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    name="email"
                                    placeholder="Email"
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input 
                                    type="password" 
                                    id="password" 
                                    name="password"
                                    placeholder="Password"
                                    autoComplete="new-password"
                                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="confirm-password">Confirm Password</label>
                                <input 
                                    type="password" 
                                    id="confirm-password" 
                                    name="confirm-password"
                                    placeholder="Retype Password"
                                    autoComplete="new-password"
                                    onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                                    required
                                />
                            </div>
                            <input type="submit" value="Register" className={`${g["button"]} ${g["success"]}`} />
                            <Link to="/" className={`${g["button"]} ${g["cancel"]}`}>Cancel</Link>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default SignUp;