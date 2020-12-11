import React from "react";
import { Portal, Button } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import HideIcon from "images/Hide.svg";

interface IProps {
  hidden: any;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      display: "flex",
    },
    hideIcon: {
      width: 24,
      height: 24,
    },
  })
);

export default function Hide(props: IProps) {
  const classes = useStyles();
  const [show, setShow] = React.useState(false);
  const container = React.useRef(null);

  const handleClick = () => {
    setShow(!show);
  };

  return (
    <span className={classes.container}>
      <Button onClick={handleClick}>
        <img className={classes.hideIcon} src={HideIcon} />
      </Button>
      {show ? (
        <Portal container={container.current}>{props.hidden}</Portal>
      ) : null}
      <span className={classes.container} ref={container} />
    </span>
  );
}
