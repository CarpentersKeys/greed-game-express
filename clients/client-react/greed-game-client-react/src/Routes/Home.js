import { useContext, useState } from "react";
import { MatchContext } from "../context/MatchContext";
import { UserContext } from "../context/UserContext";
import useRedirAfterResponse from "../hooks/useRedirAfterResponse";
import useTempRegister from "../hooks/useTempRegister";

function Home() {
    const [nameText, setNameText] = useState('');
    const [submitText, setSubmitText] = useState('');

    const [loading, user] = useTempRegister(submitText);

    const { matchDetails } = useContext(UserContext);
    const {user} = useContext(MatchContext);

    console.log('start', user, loading, submitText, nameText)

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
            <button onClick={() => {

            }}>ClearState</button>
        </div>
    )
}

export default Home;