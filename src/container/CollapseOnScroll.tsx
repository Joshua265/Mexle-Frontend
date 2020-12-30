import React from "react";
import { Collapse, Slide } from "@material-ui/core";
import { useState, useEffect } from "react";

function getScrollY(scroller) {
  return scroller.pageYOffset !== undefined
    ? scroller.pageYOffset
    : scroller.scrollTop !== undefined
    ? scroller.scrollTop
    : (document.documentElement || document.body.parentNode || document.body)
        .scrollTop;
}

const useOnScrollY = (props) => {
  const [scrollY, setScrollY] = useState(null);
  const handleScroll = (event) => {
    const { scroller } = props;
    setScrollY(getScrollY(scroller || window));
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return scrollY;
};

const useOnCloseScrollY = (props) => {
  const { threshold } = props;
  const scrollY = useOnScrollY(props);
  const [scrollState, setScrollState] = useState({
    close: false,
    scrollY: null,
  });

  useEffect(() => {
    setScrollState({
      close:
        scrollY! < scrollState.scrollY!
          ? false
          : scrollY! > scrollState.scrollY! &&
            scrollY! > (threshold != null ? threshold : 100)
          ? true
          : false,
      scrollY,
    });
    return () => {};
  }, [scrollY]);
  return scrollState.close;
};

export default function CollapseOnScroll(props) {
  const { children, ...other } = props;
  const { threshold, scroller, ...remaining } = other;
  return (
    <Slide {...remaining} in={!useOnCloseScrollY({ threshold, scroller })}>
      {children}
    </Slide>
  );
}
