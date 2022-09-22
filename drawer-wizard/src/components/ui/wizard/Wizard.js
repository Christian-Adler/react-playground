// import {useState} from "react";
// import "./Wizard.module.css";
import {useEffect, useRef, useState} from "react";
import classes from "./Wizard.module.css";

const Wizard = ({ steps, step, provideRenderComponent, onNext, onPrev, onStepSelect }) => {
  // Vorherigen Step merken, um Animationsrichtung zu steuern.
  const [prevStep, setPrevStep] = useState(0);
  const contentContainerRef = useRef();
  
  // SlideIn-Animation
  useEffect(() => {
    contentContainerRef.current.classList.remove(classes.animate);
    if (prevStep > step) {
      contentContainerRef.current.classList.add(classes.left);
      contentContainerRef.current.classList.remove(classes.right);
    }
    else if (prevStep < step) {
      contentContainerRef.current.classList.remove(classes.left);
      contentContainerRef.current.classList.add(classes.right);
    }
    setPrevStep(step);
    
    setTimeout(() => {
      contentContainerRef.current.classList.add(classes.animate);
      setTimeout(() => {
        contentContainerRef.current.classList.remove(classes.left, classes.right);
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
    slideOut(classes.left, onNext);
  };
  const prevHandler = () => {
    slideOut(classes.right, onPrev);
  };
  const stepHandler = (idx) => {
    const direction = idx > step ? classes.left : classes.right;
    slideOut(direction, () => {
      onStepSelect(idx)
    });
  };
  
  // Steps zusammen bauen - koennte auch eine Component werden...
  let stepsContent = [];
  for (let i = 0; i < steps.length; i++) {
    // Connector?
    if (i > 0) {
      stepsContent.push(<div key={'connector' + i} className={classes.stepConnector + " " + ((i <= step) ? classes.stepDone : '')}></div>);
    }
    const stepItem = steps[i];
    let cls = classes.step;
    if (i === step)
      cls += ` ${classes.stepActive}`;
    else if (i < step)
      cls += ` ${classes.stepDone}`;
    stepsContent.push(<div key={'step' + i} onClick={stepHandler.bind(window, i)} className={cls}>{stepItem}</div>
    );
  }
  
  return (
    <div className={classes.wizard}>
      <div className={classes.steps}>
        {stepsContent}
      </div>
      <div className={classes.contentContainer} ref={contentContainerRef}>
        {provideRenderComponent()}
      </div>
      <div className={classes.buttonContainer}>
        {onPrev && <button onClick={prevHandler}>Prev</button>}
        {onNext && <button onClick={nextHandler}>{step < steps.length - 1 ? 'Next' : 'Finish'}</button>}
      </div>
    </div>
  );
};

export default Wizard;
