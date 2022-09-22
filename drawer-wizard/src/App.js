import React, {useState} from 'react';

import './App.css';
import MyWizard from "./components/MyWizard";
import TransitionMounted from "./components/TransitionMounted";
import Drawer from "./components/ui/drawer/Drawer";
import Steps from "./components/ui/steps/Steps";


function App() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const [step, setStep] = useState(0);
  
  const steps = ['First Step', 'Second\nStep', 'Third Step', '4']
  const stepClickHandler = (idx) => {
    console.log('ST');
    setStep(idx);
  }
  
  return (
    <div>
      <div className="app">
        <MyWizard/>
      </div>
      <div className="app" style={{ height: 200 }}>
        <Steps steps={steps} step={step} onStepClick={stepClickHandler}/>
      </div>
      <div className="app">
        <TransitionMounted/>
      </div>
      
      <div className="app">
        <button type="button" onClick={() => setIsOpen(!isOpen)}>
          Trigger Drawer 1
        </button>
        <Drawer
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          position="right"
        >
          <div style={{ padding: '16px', }}>
            <button type="button" onClick={() => setIsOpen(false)}>
              Close
            </button>
            <p>The drawer content!</p>
            <input type="text"/>
          </div>
        </Drawer>
      </div>
      
      <div className="app">
        <button type="button" onClick={() => setIsOpen2(!isOpen2)}>
          Trigger Drawer 2 (Wizard)
        </button>
        <Drawer
          isOpen={isOpen2}
          onClose={() => setIsOpen2(false)}
          position="right"
          idSuffix="wizard"
          duration={1500}
          size='60%'
        >
          <div style={{ padding: '16px', }}>
            <MyWizard/>
          </div>
        </Drawer>
      </div>
    </div>
  );
}

export default App;
