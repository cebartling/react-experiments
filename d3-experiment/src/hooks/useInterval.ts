import { useEffect, useRef } from 'react';

/**
 * A custom hook that provides a declarative way to set up an interval.
 * The interval can be paused by setting delay to null.
 *
 * @param callback - Function to be called at each interval
 * @param delay - Number of milliseconds between each interval. Pass null to pause.
 * @param immediate - Whether to run the callback immediately on mount/delay change
 *
 * @example
 * ```tsx
 * function Counter() {
 *   const [count, setCount] = useState(0);
 *
 *   useInterval(() => {
 *     setCount(count + 1);
 *   }, 1000);
 *
 *   return <div>{count}</div>;
 * }
 * ```
 */
function useInterval(
    callback: () => void,
    delay: number | null,
    immediate: boolean = false
): void {
    // Store the callback in a ref to prevent unnecessary re-renders
    const savedCallback = useRef<() => void | null>(null);

    // Remember the latest callback
    useEffect(() => {
        savedCallback.current = callback;
    }, [callback]);

    // Set up the interval
    useEffect(() => {
        // Don't schedule if no delay is specified
        if (delay === null) {
            return;
        }

        // Run immediately if specified
        if (immediate) {
            savedCallback.current?.();
        }

        const tick = () => {
            savedCallback.current?.();
        };

        const id = setInterval(tick, delay);

        // Cleanup on unmount or when delay changes
        return () => {
            clearInterval(id);
        };
    }, [delay, immediate]);
}

export default useInterval;
