import {useEffect, useMemo, useRef} from "react";
import {createPortal} from "react-dom";
import classes from "./Drawer.module.css";
import useMountTransitionExternalState from "../../../hooks/useMountTransitionExternalState";

function createPortalRoot(drawerRootId) {
  const drawerRoot = document.createElement("div");
  drawerRoot.setAttribute("id", drawerRootId);
  
  return drawerRoot;
}

/*
 * Adapted from
 * https://letsbuildui.dev/articles/building-a-drawer-component-with-react-portals
 *
 * @param isOpen
 * @param children
 * @param onClose
 * @param position (left,top,right,bottom)
 * @param removeWhenClosed
 * @param className
 * @param idSuffix
 * @duration in ms,
 * @size css je nach position width | height,
 * @returns {React.ReactPortal|null}
 * @constructor
 */
const Drawer = ({
                  isOpen,
                  children,
                  onClose,
                  position = "left",
                  removeWhenClosed = true,
                  className = '',
                  idSuffix = '',
                  duration = 300,
                  size = '40%',
                }) => {
  const idSffx = useMemo(() => {
    return idSuffix || (Math.random() + 1).toString(36).substring(7)
  }, [idSuffix])
  
  const drawerRootId = "drawer-root-" + idSffx;
  
  const bodyRef = useRef(document.querySelector("body"));
  const portalRootRef = useRef(
    document.getElementById(drawerRootId) || createPortalRoot(drawerRootId)
  );
  const isTransitioned = useMountTransitionExternalState(isOpen, duration);
  
  // Append portal root on mount
  useEffect(() => {
    bodyRef.current.appendChild(portalRootRef.current);
    const portal = portalRootRef.current;
    const bodyEl = bodyRef.current;
    
    return () => {
      // Clean up the portal when drawer component unmounts
      portal.remove();
      // Ensure scroll overflow is removed
      bodyEl.style.overflow = "";
    };
  }, []);
  
  // Prevent page scrolling when the drawer is open
  useEffect(() => {
    const updatePageScroll = () => {
      if (isOpen) {
        bodyRef.current.style.overflow = "hidden";
      }
      else {
        bodyRef.current.style.overflow = "";
      }
    };
    
    updatePageScroll();
  }, [isOpen]);
  
  // Allow Escape key to dismiss the drawer
  useEffect(() => {
    const onKeyPress = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    
    if (isOpen) {
      window.addEventListener("keyup", onKeyPress);
    }
    
    return () => {
      window.removeEventListener("keyup", onKeyPress);
    };
  }, [isOpen, onClose]);
  
  if (!isTransitioned && removeWhenClosed && !isOpen) {
    return null;
  }
  
  let positionMappedCls = classes.left;
  if (position === 'right')
    positionMappedCls = classes.right;
  else if (position === 'bottom')
    positionMappedCls = classes.bottom;
  else if (position === 'top')
    positionMappedCls = classes.top;
  
  const transitionStyle = { transitionDuration: duration + 'ms' };
  const sizeStyle = {};
  if (position === 'bottom' || position === 'top')
    sizeStyle.height = size;
  else
    sizeStyle.width = size;
  
  return createPortal(
    // For production surround with <FocusTrap> : focus-trap-react : https://github.com/focus-trap/focus-trap-react
    <div
      aria-hidden={isOpen ? "false" : "true"}
      className={`${classes.drawerContainer} ${isOpen ? classes.open : ''} ${isTransitioned ? classes.isTransitioned : ''} ${className}`}
    >
      <div className={`${classes.drawer} ${positionMappedCls}`} style={{ ...sizeStyle, ...transitionStyle }} role="dialog">
        {children}
      </div>
      <div className={classes.backdrop} style={{ ...transitionStyle }} onClick={onClose}/>
    </div>
    ,
    portalRootRef.current
  );
};

export default Drawer;
