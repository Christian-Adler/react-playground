import {forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState} from "react";
import classes from "./Wizard.module.css";
import Steps from "../steps/Steps";

const Wizard = forwardRef(({ steps, step, provideRenderComponent, onStepSelect, checkStepAllowed, hideDefaultButtons = false }, ref) => {
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
  const slideOut = useCallback((direction, afterSlide) => {
    contentContainerRef.current.classList.add(direction);
    setTimeout(() => {
      afterSlide();
    }, 400);
  }, []);
  
  const nextHandler = useCallback(() => {
    if (typeof checkStepAllowed === "function" && !checkStepAllowed(step + 1)) return; // Pruefung ob erlaubt
    
    slideOut(classes.left, () => {
      onStepSelect(step + 1)
    });
  }, [slideOut, step, onStepSelect, checkStepAllowed]);
  
  const prevHandler = useCallback(() => {
    if (typeof checkStepAllowed === "function" && !checkStepAllowed(step - 1)) return; // Pruefung ob erlaubt
    
    slideOut(classes.right, () => {
      onStepSelect(step - 1);
    });
  }, [slideOut, step, onStepSelect, checkStepAllowed]);
  
  const stepHandler = useCallback((idx) => {
    if (idx === step) return;
    if (typeof checkStepAllowed === "function" && !checkStepAllowed(idx)) return; // Pruefung ob erlaubt
    
    const direction = idx > step ? classes.left : classes.right;
    slideOut(direction, () => {
      onStepSelect(idx)
    });
  }, [slideOut, step, onStepSelect, checkStepAllowed]);
  
  // Methoden von aussen aufrufbar machen:
  useImperativeHandle(ref, () => ({
    nextStep: nextHandler,
    prevStep: prevHandler,
    gotoStep: (stepIdx) => {
      stepHandler(stepIdx);
    }
  }));
  
  return (
    <div className={classes.wizard}>
      <Steps steps={steps} step={step} onStepClick={stepHandler}/>
      <div className={classes.contentContainer} ref={contentContainerRef}>
        {provideRenderComponent()}
      </div>
      {!hideDefaultButtons &&
        <div className={classes.buttonContainer}>
          {step > 0 && <button onClick={prevHandler}>Prev</button>}
          {<button onClick={nextHandler}>{step < steps.length - 1 ? 'Next' : 'Finish'}</button>}
        </div>}
    </div>
  );
});

export default Wizard;
