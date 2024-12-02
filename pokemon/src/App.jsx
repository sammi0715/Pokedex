import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DigimonList from "./pages/DigimonList";
import Home from "./pages/Home";
import PokemonList from "./pages/PokemonList";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonList />} />
          <Route path="/digimon" element={<DigimonList />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
