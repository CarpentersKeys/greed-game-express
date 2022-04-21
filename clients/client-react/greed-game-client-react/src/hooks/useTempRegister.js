import { useEffect, useState, useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { MatchContext } from "../context/MatchContext";
import { UserContext } from "../context/UserContext";

export default function useTempRegister(submitText) {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const { setMatchDetails } = useContext(MatchContext);


    useEffect(() => {
        if (!submitText) { return; };
        setLoading(true);
        const request = new Request('http://localhost:5001/auth',
            {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: submitText }),
            }
        );

        

        fetch(request)
            .then(res => {
                if (!res.ok) { throw new Error(`http error! Status: ${res.status}`) }
                return res.json();
            })
            .then(json => {
                setUser(json)
                setLoading(false);
            });
    }, [submitText, setUser, setMatchDetails])

    return [loading, user];

}