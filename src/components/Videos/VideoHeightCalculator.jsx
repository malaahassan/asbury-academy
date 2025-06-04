import { useEffect } from "react";


function VideoHeightCalculator(elementRef, setHeight) {
    useEffect(() => {
        const updateSize = () => {
            if (elementRef.current) {
                setHeight((elementRef.current.offsetWidth*9)/16 + 0.8);
            }
        };

        // Initialize size on mount
        updateSize();

        // Use ResizeObserver to detect size changes
        const resizeObserver = new ResizeObserver(updateSize);
        if (elementRef.current) {
            resizeObserver.observe(elementRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, []);
  }
  
export default VideoHeightCalculator;
  