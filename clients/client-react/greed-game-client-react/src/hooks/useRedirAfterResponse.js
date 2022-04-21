import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirAfterResponse(...dependancies) {
    const hasRendered = useRef(false);
    const hasRedirected = useRef(false);
    const navigate = useNavigate();


    console.log('effect after mount. hasRendered:', hasRendered.current);
    useEffect(() => {
        console.log('useEffect of effect after mount. hasRendered:', hasRendered.current);
        if (hasRedirected.current) { return; };
        if (hasRendered.current) {
            hasRedirected.current = true;
            return navigate('/game/match');
        };
        hasRendered.current = true;
    }, [...dependancies]);
}