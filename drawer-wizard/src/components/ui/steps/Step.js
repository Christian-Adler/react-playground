import classes from "./Step.module.css";

const Step = ({ idx, title, finished = false, active = false, onClick }) => {
  return (<div onClick={onClick} className={`${classes.step} ${(finished ? classes.finished : '')} ${(active ? classes.active : '')}`}>
    <div style={{ textAlign: "center", padding: 4, }}>{idx + 1}.</div>
    <div style={{
      flex: 1,
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      whiteSpace: "pre-line",
      textAlign: "center",
      padding: 4,
    }}>{title}</div>
    <div className={classes.dotContainer}>
      <div className={classes.dotLine}></div>
      <div className={classes.dot}></div>
    </div>
  </div>);
};

export default Step;
