import { useContext, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Game from './Routes/Game';
import Home from './Routes/Home';
import { Layout } from './Routes/Layout';
import Match from './Routes/Match';
import { UserContext } from './context/UserContext';
import { MatchContext } from './context/MatchContext';

function App() {
  const [user, setUser] = useState(null);
  const [matchDetails, setMatchDetails] = useState(null);


  return (
    <div className="App">
      <MatchContext.Provider value={{ matchDetails, setMatchDetails }}>
        <UserContext.Provider value={{ user, setUser }}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="/game" element={<Game />} >
                <Route path="/game/match" element={<Match />} />
              </Route>
            </Route>
          </Routes>
        </UserContext.Provider>
      </MatchContext.Provider>
    </div >
  );
}

export default App;

// main page just shows the form where you enter name
// submit makes a request to the sever which responds when it finds a match
// that response triggers another request to the server to start the game
// that response triggers the game ui