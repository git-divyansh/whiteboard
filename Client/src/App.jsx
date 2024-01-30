import "./App.css";
import { Routes, Route } from "react-router-dom";
import Sketch from "./Pages/Sketch";
import LandingPage from "./Pages/LandingPage";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/room/:roomId" element={<Sketch />}></Route>
      </Routes>
    </div>
  );
}

export default App;
