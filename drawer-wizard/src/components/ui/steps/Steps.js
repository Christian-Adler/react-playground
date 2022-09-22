// import {useState} from "react";
// import "./Steps.css";
import classes from "./Steps.module.css";
import Step from "./Step";

const Steps = ({ steps, step, onStepClick }) => {
  
  const stepsContent = [];
  for (let i = 0; i < steps.length; i++) {
    stepsContent.push(<Step key={'step' + i} onClick={onStepClick.bind(window, i)} title={steps[i]} active={(i === step)} finished={(i < step)} idx={i}/>);
  }
  return (<div className={classes.steps}>
    {stepsContent}
  </div>);
};

export default Steps;
