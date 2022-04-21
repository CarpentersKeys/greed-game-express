import { useState } from "react";
import useRedirAfterResponse from "../hooks/useRedirAfterResponse";
import useTempRegister from "../hooks/useTempRegister";

function Home() {
    const [nameText, setNameText] = useState('');
    const [submitText, setSubmitText] = useState('');

    const [loading, user] = useTempRegister(submitText);

    useRedirAfterResponse(user);

    function textChange(e) {
        setNameText(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitText(nameText);
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name-text" onChange={textChange} value={nameText} />
                <button type="submit">name</button>
            </form>
        </div>
    )
}

export default Home;