import {useEffect, useState} from "react";

// https://letsbuildui.dev/articles/how-to-animate-mounting-content-in-react

/**
 *
 * @param isMounted
 * @param unmountDelay - delay in ms (as long as the css transition is)
 * @returns {boolean}
 */
const useMountTransitionExternalState = (isMounted, unmountDelay = 1000) => {
  const [isTransitioned, setIsTransitioned] = useState(false);
  
  useEffect(() => {
    let timeoutId;
    
    // Mounted? In DOM gehaengt (noch "unsichtbar") - dann ist jetzt CSS-Animation moeglich => 2ten State setzen
    if (isMounted && !isTransitioned) {
      setIsTransitioned(true); // "startet" die CSS-Animation
    }
      // Nicht mehr Mounted (trotzdem wg. 2ten State noch im DOM) - dann wird die CSS-Animation gerade schon rueckwaerts abgespielt
    // Nach dem Delay (Dauer des CSS-Animation) auch den 2ten State loeschen => kein State mehr gesetzt - El wird aus DOM entfernt
    else if (!isMounted && isTransitioned) {
      timeoutId = setTimeout(() => setIsTransitioned(false), unmountDelay);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [unmountDelay, isMounted, isTransitioned]);
  
  return isTransitioned;
};

export default useMountTransitionExternalState;
