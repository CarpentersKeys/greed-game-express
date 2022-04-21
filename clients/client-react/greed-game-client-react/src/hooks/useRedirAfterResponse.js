import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function useRedirAfterResponse(...dependancies) {
    const hasRendered = useRef(false);
    const hasRedirected = useRef(false);
    const navigate = useNavigate();


    useEffect(() => {
        if (hasRedirected.current) { return; };
        if (hasRendered.current) {
            hasRedirected.current = true;
            return navigate('/game/match');
        };
        hasRendered.current = true;
    }, [...dependancies]);
}