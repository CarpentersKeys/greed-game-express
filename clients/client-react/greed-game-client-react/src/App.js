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
