import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import RutasDeVistas from "./routes/RutasDeVistas";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <>
      <Router>
        <RutasDeVistas />
      </Router>
    </>
  );
}

export default App;
