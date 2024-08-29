import { useState, useEffect, useCallback } from "react";
import debounce from "lodash/debounce";

// ... (rest of the imports)

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);

  const debouncedSetSection = useCallback(
    debounce((newSection: number) => setCurrentSection(newSection), 200),
    []
  );

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 0 && currentSection < 1) {
        debouncedSetSection(currentSection + 1);
      } else if (e.deltaY < 0 && currentSection > 0) {
        debouncedSetSection(currentSection - 1);
      }
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, [currentSection, debouncedSetSection]);

  // ... (rest of the component)
}
