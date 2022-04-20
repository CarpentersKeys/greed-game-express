import { Routes, Route, Link } from 'react-router-dom';
import Game from './Routes/Game';
import Home from './Routes/Home';
import { Layout } from './Routes/Layout';


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/game" element={<Game />} />
        </Route>
      </Routes>
    </div >
  );
}

export default App;

// main page just shows the form where you enter name
// submit makes a request to the sever which responds when it finds a match
// that response triggers another request to the server to start the game
// that response triggers the game ui