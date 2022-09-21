// import {useState} from "react";
import "./Wizard.css";
import {useEffect, useRef, useState} from "react";
// import classes from "./wizard.module.css";

const Wizard = ({ steps, step, provideRenderComponent, onNext, onPrev, onStepSelect }) => {
  // Vorherigen Step merken, um Animationsrichtung zu steuern.
  const [prevStep, setPrevStep] = useState(0);
  const contentContainerRef = useRef();
  
  // SlideIn-Animation
  useEffect(() => {
    contentContainerRef.current.classList.remove('animate');
    if (prevStep > step) {
      contentContainerRef.current.classList.add('left');
      contentContainerRef.current.classList.remove('right');
    }
    else if (prevStep < step) {
      contentContainerRef.current.classList.remove('left');
      contentContainerRef.current.classList.add('right');
    }
    setPrevStep(step);
    
    setTimeout(() => {
      contentContainerRef.current.classList.add('animate');
      setTimeout(() => {
        contentContainerRef.current.classList.remove('left', 'right');
      }, 50);
    }, 50);
  }, [step, prevStep]);
  
  /**
   * SlideOut-Animation
   * @param direction (left|right)
   * @param afterSlide Callback
   */
  const slideOut = (direction, afterSlide) => {
    contentContainerRef.current.classList.add(direction);
    setTimeout(() => {
      afterSlide();
    }, 400);
  }
  
  const nextHandler = () => {
    slideOut('left', onNext);
  };
  const prevHandler = () => {
    slideOut('right', onPrev);
  };
  const stepHandler = (idx) => {
    const direction = idx > step ? 'left' : 'right';
    slideOut(direction, () => {
      onStepSelect(idx)
    });
  };
  
  // Steps zusammen bauen - koennte auch eine Component werden...
  let stepsContent = [];
  for (let i = 0; i < steps.length; i++) {
    // Connector?
    if (i > 0) {
      stepsContent.push(<div key={'connector' + i} className={"stepConnector " + ((i <= step) ? 'stepDone' : '')}></div>);
    }
    const stepItem = steps[i];
    let cls = `step`;
    if (i === step)
      cls += ' stepActive';
    else if (i < step)
      cls += ' stepDone'
    stepsContent.push(<div key={'step' + i} onClick={stepHandler.bind(window, i)} className={cls}>{stepItem}</div>
    );
  }
  
  return (
    <div className='wizard'>
      <div className="steps">
        {stepsContent}
      </div>
      <div className="contentContainer" ref={contentContainerRef}>
        {provideRenderComponent()}
      </div>
      <div className={'buttonContainer'}>
        {onPrev && <button onClick={prevHandler}>Prev</button>}
        {onNext && <button onClick={nextHandler}>{step < steps.length - 1 ? 'Next' : 'Finish'}</button>}
      </div>
    </div>
  );
};

export default Wizard;
