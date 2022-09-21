import React, {useState} from 'react';

import './App.css';
import Wizard from "./components/wizard/Wizard";


function App() {
  const [actStep, setActStep] = useState(0);
  
  const renderComponentHandler = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return <div>{actStep + 1}
      <div style={{ background: randomColor }}>sonst was zeugs</div>
    </div>;
  };
  
  const prevHandler = () => {
    setActStep((prevState) => prevState - 1);
  };
  const nextHandler = () => {
    setActStep((prevState) => prevState + 1);
  };
  const stepSelectHandler = (stepIdx) => {
    setActStep(stepIdx);
  }
  
  const steps = ['Schritt 1', 'Schritt 2', "Langer Text fuer Schritt\n3", 'Schritt 4', 'Schritt 5', "Schritt 6"];
  
  return (
    <div className="app">
      <Wizard steps={steps} step={actStep} provideRenderComponent={renderComponentHandler} onNext={nextHandler}
              onPrev={actStep > 0 ? prevHandler : null}
              onStepSelect={stepSelectHandler}/>
    </div>
  );
}

export default App;
