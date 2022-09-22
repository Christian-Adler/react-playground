import React, {useState} from 'react';

import './App.css';
import MyWizard from "./components/MyWizard";
import TransitionMounted from "./components/TransitionMounted";
import Drawer from "./components/ui/drawer/Drawer";


function App() {
  
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  
  return (
    <div>
      <div className="app">
        <MyWizard/>
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
