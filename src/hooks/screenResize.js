import { useState, useEffect, useCallback } from "react";

function useScreenResize() {
  const getScreenWidth = useCallback(() => window.innerWidth, []);

  const [screenWidth, setScreenWidth] = useState(getScreenWidth());

  useEffect(() => {
    function handleScreenResize() {
      setScreenWidth(getScreenWidth());
    }

    setTimeout(() => {
      window.addEventListener("resize", handleScreenResize);
    }, 1000);
    return () => {
      window.removeEventListener("resize", handleScreenResize);
    };
  }, [getScreenWidth]);

  return screenWidth;
}

export default useScreenResize;
