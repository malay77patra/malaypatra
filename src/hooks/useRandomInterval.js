
import { useEffect, useRef, useCallback } from "react";


const random = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
}

const useRandomInterval = (callback, minDelay, maxDelay) => {
    const timeoutId = useRef(null);
    const savedCallback = useRef(callback);

    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
        let isEnabled =
            typeof minDelay === 'number' && typeof maxDelay === 'number';

        if (isEnabled) {
            const handleTick = () => {
                const nextTickAt = random(minDelay, maxDelay);

                timeoutId.current = window.setTimeout(() => {
                    savedCallback.current();
                    handleTick();
                }, nextTickAt);
            };

            handleTick();
        }

        return () => window.clearTimeout(timeoutId.current);
    }, [minDelay, maxDelay]);

    const cancel = useCallback(function () {
        window.clearTimeout(timeoutId.current);
    }, []);

    return cancel;
};

export { useRandomInterval };