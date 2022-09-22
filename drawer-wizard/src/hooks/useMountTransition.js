import {useState} from "react";
import useMountTransitionExternalState from "./useMountTransitionExternalState";

// extended https://letsbuildui.dev/articles/how-to-animate-mounting-content-in-react

/**
 *
 * @param unmountDelay - delay in ms (as long as the css transition is)
 * @returns {{setIsMounted: (value: (((prevState: boolean) => boolean) | boolean)) => void, isMounted: boolean, isTransitioned: boolean}}
 */
const useMountTransition = (unmountDelay = 1000) => {
  const [isMounted, setIsMounted] = useState(false);
  const isTransitioned = useMountTransitionExternalState(isMounted, unmountDelay);
  
  return { isTransitioned, isMounted, setIsMounted };
};

export default useMountTransition;
