import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";
import CarPage from "./CarPage";


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/car/:id" element={<CarPage />} />
      </Routes>
    </Router>
  );
   
}

export default App;
