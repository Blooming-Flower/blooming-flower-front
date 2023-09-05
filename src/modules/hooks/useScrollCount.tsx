import { useRef, useEffect, useCallback } from "react";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const useScrollCount = (
  end: any,
  start = 0,
  duration = 3000,
  delay = 0,
  threshold: number
) => {
  const element = useRef(null);
  const observer: any = useRef(null);
  const stepTime = Math.abs(Math.floor(duration / (end - start)));

  const onScroll = useCallback(
    ([entry]: { isIntersecting: boolean }[]) => {
      const { current }: any = element;
      if (entry.isIntersecting) {
        let currentNumber = start;
        const counter = setInterval(() => {
          currentNumber += 1;
          current.innerHTML = currentNumber;
          if (currentNumber === end) {
            clearInterval(counter);
            observer.current.disconnect(element.current);
          }
        }, stepTime);
      }
    },
    [end, start, stepTime, element]
  );
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: threshold,
  });
  useEffect(() => {
    if (element.current) {
      observer.current = new IntersectionObserver(onScroll);
      observer.current.observe(element.current);
    }
  }, [trigger]);

  return {
    ref: element,
  };
};

export default useScrollCount;
