// web/src/App.jsx - Main React app entry (based on 4-C App.jsx)

import MovieList from "./pages/MovieList";
import MovieDetail from "./pages/MovieDetail";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <div className="app-container">
      <Header/>
      <MovieList />
      <Footer/>
    </div>
  );
}

export default App;