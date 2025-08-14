// Route: web/src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Header from "./components/Header";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Footer from "./components/Footer";

import a from "./App.module.css";

function App() {
	return (
		<BrowserRouter>
			<div className={a.app}>
				<Header />
				<Routes>
					<Route path='/' element={<MovieList />} />
					<Route path='/movies' element={<Navigate to='/' />} />
					<Route path='/movies/:id' element={<MovieDetail />} />
					<Route path='/sign-up' element={<SignUp />} />
					<Route path='/sign-in' element={<SignIn />} />
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;