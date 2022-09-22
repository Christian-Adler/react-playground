// import {useState} from "react";
import "./TransitionMounted.css";
// import classes from "./TransitionMounted.module.css";
import {Fragment} from "react";
import useMountTransition from "../hooks/useMountTransition";

const TransitionMounted = () => {
  const { isTransitioned, isMounted, setIsMounted } = useMountTransition(1000);
  return (<Fragment>
    <button onClick={() => setIsMounted(!isMounted)}>
      {`${isMounted ? "Hide" : "Show"} Element`}
    </button>
    
    <div className="content">
      {(isTransitioned || isMounted) && (
        <div className={`card ${isTransitioned ? "isTransitioned" : ''} ${isMounted ? "isMounted" : ''}`}>
          Card Content
        </div>
      )}
    </div>
  </Fragment>);
};

export default TransitionMounted;
