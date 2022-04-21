import { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MatchContext } from '../context/MatchContext';
import { UserContext } from '../context/UserContext';

export default function Match() {
    const { user, setUser } = useContext(UserContext);
    const { matchDetails, setMatchDetails } = useContext(MatchContext);

    let navigate = useNavigate();

    useEffect(() => {
        const matchRequest = new Request('http://localhost:5001/game/match', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user })
        })

        fetch(matchRequest)
            .then(resp => {
                if (resp.status === 408) {
                    navigate('/');
                    throw resp.json();
                };
                if (resp.ok || resp.status === 408) { return resp.json() };
                throw resp.json();
            })
            .then(matchDetails => {
                console.log(matchDetails);
                if (!matchDetails.matchFound) { throw new Error('match not found(field is falsy)'); };
                if (!matchDetails.matchId) { throw new Error('no matchId'); };
                setMatchDetails({
                    matchId: matchDetails.matchId,
                });
                // make new fetch request in the following useEffect
                const startGameRequest = new Request('http://localhost:5001/game/startmatch', {
                    method: 'POST',
                    credentials: 'include',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ matchDetails })
                })

                fetch(startGameRequest)
                    .then(resp => console.log('startgameresp:', resp))
                    .catch(err => console.log('startgmae error:', err));

            })
            .catch(err => {
                console.log('fetch failed:', err)
            })

            return () => {
                console.log('unmount', matchDetails);
            }
    }, [user]);

    // useEffect(() => {

    //     const twoPlayers = Object.entries(matchDetails.players).length !== 2;
    //     if (twoPlayers) { throw new Error('match went through without 2 players'); };
    //     if (!matchDetails.matchFound) { throw new Error('match not found(field is falsy)'); };
    //     if (matchDetails.matchId) { throw new Error('no matchId'); };

        //     return () => { // just a reset
        //         setUser(null);
        //         setMatchDetails(null);
        //     }

        // }, [matchDetails])

        return (
            <div className="match">
                <Link to="/">Home</Link>
            </div>
        )
    }