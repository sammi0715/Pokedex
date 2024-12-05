import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DigimonList from "./pages/DigimonList";
import Home from "./pages/Home";
import Navbar from "./pages/Navbar";
import PokemonList from "./pages/PokemonList";
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonList />} />
        <Route path="/digimon" element={<DigimonList />} />
      </Routes>
    </Router>
  );
}

export default App;
