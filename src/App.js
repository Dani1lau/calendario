import { Route, Routes } from "react-router-dom";
import Inicio from "./pages/Inicio";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <>
        <Routes>
          <Route path="/" element={<Inicio />} />       
        </Routes>
      </>
    </div>
  );
}

export default App;