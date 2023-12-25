import { useState, useEffect, useRef } from "react";

const useDrag = () => {
  const [isDragging, setIsDragging] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const handleStart = () => {
      setIsDragging(true);
    };
    const handleMove = (event) => {
      if (isDragging) {
        const { clientX, clientY } = event.touches[0];
        elementRef.current.style.transform = `translate(${clientX}px, ${clientY}px)`;
      }
    };
    const handleEnd = () => {
      setIsDragging(false);
    };
    const handleCancel = () => {
      setIsDragging(false);
    };

    const element = elementRef.current;
    if (element) {
      elementRef.addEventListener("touchstart", handleStart);
      elementRef.addEventListener("touchmove", handleMove);
      elementRef.addEventListener("touchend", handleEnd);
      elementRef.addEventListener("touchcancel", handleCancel);
    }

    return () => {
      if (element) {
        elementRef.removeEventListener("touchstart", handleStart);
        elementRef.removeEventListener("touchmove", handleMove);
        elementRef.removeEventListener("touchend", handleEnd);
        elementRef.removeEventListener("touchcancel", handleCancel);
      }
    };
  }, [isDragging]);
};

export default useDrag;
