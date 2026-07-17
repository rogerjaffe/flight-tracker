import type { ComponentChildren, RenderableProps } from "preact";
import { useRef, useLayoutEffect } from "preact/hooks";

// Define the properties expected by the component
interface FitTextProps {
  children: ComponentChildren;
  className?: string;
}

const MAX_SIZE = 20;

const FitText = ({
  children,
  className = "",
}: RenderableProps<FitTextProps>) => {
  // Strongly type refs for HTMLDivElements
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const adjustFontSize = (): void => {
      let minSize = 12; // Minimum comfortable reading size (px)
      let maxSize = 120; // Maximum upper bounds size (px)
      let optimalSize = minSize;

      // Reset style to raw maximum bounds to accurately measure wrap limits
      text.style.fontSize = `${maxSize}px`;

      // Binary search loop to locate the optimal font size
      while (minSize <= maxSize) {
        const mid = Math.floor((minSize + maxSize) / 2);
        text.style.fontSize = `${mid}px`;

        const hasHorizontalOverflow = text.scrollWidth > container.clientWidth;
        const hasVerticalOverflow = text.scrollHeight > container.clientHeight;

        if (!hasHorizontalOverflow && !hasVerticalOverflow) {
          optimalSize = mid; // Fits safely, try stepping upwards
          minSize = mid + 1;
        } else {
          maxSize = mid - 1; // Overflows bounds, must step downwards
        }
      }

      // Lock in the perfect pixel size
      text.style.fontSize = `${Math.min(MAX_SIZE, optimalSize)}px`;
    };

    // 1. Calculate immediately upon mounting or data mutation
    adjustFontSize();

    // 2. Observe container size mutations (like browser window shifts)
    const resizeObserver = new ResizeObserver(() => adjustFontSize());
    resizeObserver.observe(container);

    // Clean up event listener when element unmounts
    return () => resizeObserver.disconnect();
  }, [children]); // Track text changes to re-evaluate sizing

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden flex items-center justify-center ${className}`}
    >
      <div ref={textRef} className="w-full text-center wrap-break-word">
        {children}
      </div>
    </div>
  );
};

export default FitText;
