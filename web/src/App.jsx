// Route: web/src/App.jsx

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Header from "./components/Header";
import Home from "./pages/Home";
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
					   <Route path='/' element={<Home />} />
					   <Route path='/movies' element={<MovieList />} />
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