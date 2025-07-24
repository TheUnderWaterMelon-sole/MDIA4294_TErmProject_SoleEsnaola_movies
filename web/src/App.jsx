import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import Header from "./components/Header";
import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
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
				</Routes>
				<Footer />
			</div>
		</BrowserRouter>
	);
}

export default App;