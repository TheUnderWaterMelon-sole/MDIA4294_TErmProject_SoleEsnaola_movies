// Route: web/src/pages/SignUp.jsx

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import g from '../global.module.css';

// Adjust the path if the image location is different in MovieRepo
const bannerImage = '/home-bg.jpeg';

function SignUp() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        fetch('http://localhost:3000/users/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            // You may want to handle success/errors here, or redirect, based on future requirements
        });
    };    

    return (
        <main style={{backgroundImage: `url(${bannerImage})`}} className={` ${g["full-width"]} ${g['banner']}`}>
            <div className={`${g['grid-container']} ${g["banner__content"]}`}>
                <div className={g['col-12']}>
                    <div className={`${g['card']} ${g['card--w-padding']}`}>
                        <h1 className={g['h1']}>Join our MovieVerse</h1>
                        <form onSubmit={handleSubmit} className={`${g['form-group']} ${g["form--full"]}`}>
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