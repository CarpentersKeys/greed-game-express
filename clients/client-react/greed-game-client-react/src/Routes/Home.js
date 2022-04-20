import { useEffect, useState } from "react";

function Home() {
    const [nameText, setNameText] = useState('');
    const [name, setName] = useState('');
    useEffect(() => {

    }, [tempRegister]);

    function textChange(e) {
        setNameText(e.target.value);
    }

    function tempRegister(e) {
        e.preventDefault();

        const request = new Request('http://localhost:5001/auth',
            {
                method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({send: 'hekp!'}),
            }
        );

        fetch(request)
            .then(res => {
                console.log(res.status)
                if (!res.ok) { throw new Error(`http error! Status: ${res.status}`) }
                return res.json();
            })
            .then(json => {
                setName(json.name)
                console.log(json)
            });
    };

    return (
        <div>
            <h1>{name}</h1>
            <form onSubmit={tempRegister}>
                <input type="text" onChange={textChange} value={nameText} />
                <button type="submit">name</button>
            </form>
        </div>
    )
}

export default Home;