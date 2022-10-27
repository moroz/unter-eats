import { useState, useCallback, useEffect } from "react";

const SCROLL_THRESHOLD = 40;

export default function useHeaderScroll() {
  const [opaque, setOpaque] = useState(false);

  const handleScroll = useCallback(() => {
    setOpaque(window.pageYOffset >= SCROLL_THRESHOLD);
  }, [setOpaque]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return opaque;
}
