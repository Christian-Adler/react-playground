// import {useState} from "react";
// import "./MyWizard.css";
// import classes from "./MyWizard.module.css";

import Wizard from "./ui/wizard/Wizard";
import {useRef, useState} from "react";

const MyWizard = () => {
  const [actStep, setActStep] = useState(0);
  
  const renderComponentHandler = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return <div>{actStep + 1}
      <div style={{ background: randomColor }}>sonst was zeugs</div>
    </div>;
  };
  
  const stepSelectHandler = (stepIdx) => {
    setActStep(stepIdx);
  }
  const checkStepAllowedHandler = (stepIdx) => {
    const allowed = (stepIdx < 4);
    console.log(`Step ${stepIdx} allowed: `, allowed);
    return allowed;
  }
  
  const steps = ['Schritt 1', 'Schritt 2', "Langer Text fuer Schritt\n3", 'Schritt 4', 'Schritt 5', "Schritt 6"];
  
  const simpleBtnStyle = { background: 'blue', color: 'white', padding: '8px', display: 'inline-block', margin: '4px', cursor: 'default', };
  
  const wizardRef = useRef();
  
  return <>
    <Wizard steps={steps} step={actStep} provideRenderComponent={renderComponentHandler}
            onStepSelect={stepSelectHandler} checkStepAllowed={checkStepAllowedHandler} ref={wizardRef} hideDefaultButtons={true}/>
    <div style={{ border: '1px solid blue', marginTop: '8px', }}>
      {actStep > 0 && <div onClick={() => wizardRef.current.prevStep()} style={simpleBtnStyle}>Call prev on Wizard</div>}
      <div onClick={() => wizardRef.current.nextStep()} style={simpleBtnStyle}>Call next on Wizard</div>
      <div onClick={() => wizardRef.current.gotoStep(3)} style={simpleBtnStyle}>Call goto 3 on Wizard</div>
    </div>
  </>;
};

export default MyWizard;
