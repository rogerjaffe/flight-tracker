import { useEffect, useRef } from "preact/hooks";

function useInterval(callback: any, delay: number) {
  const savedCallback = useRef(callback);

  // Remember the latest callback if it changes.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay * 1000);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
