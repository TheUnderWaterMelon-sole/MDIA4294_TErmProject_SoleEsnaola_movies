// app.jsx
import React from "react";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />
      <MovieList />
      <Footer />
    </>
  );
}

export default App;