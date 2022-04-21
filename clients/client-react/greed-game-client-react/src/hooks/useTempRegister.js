import { useEffect, useState, useContext } from "react";
import { UserContext } from "../context/UserContext";

export default function useTempRegister(submitText) {
    const [loading, setLoading] = useState(false);
    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        if (!submitText) { return; };
        setLoading(true);
        const request = new Request('http://localhost:5001/auth',
            {
                method: 'POST',
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
    }, [submitText, setUser])

    return [loading, user];

}