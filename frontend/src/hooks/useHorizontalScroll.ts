import { useRef, useEffect } from "react";

export function useHorizontalScroll<T extends HTMLElement>() {
  const elRef = useRef(null!);

  useEffect(() => {
    const el = elRef.current as T;
    if (el) {
      const onWheel = (e: WheelEvent) => {
        e.preventDefault();
        if (e.deltaY == 0) return;
        el.scrollTo({
          left: el.scrollLeft + e.deltaY / 5,
          behavior: "instant",
        });
      };
      el.addEventListener("wheel", onWheel);
      return () => el.removeEventListener("wheel", onWheel);
    }
  }, []);
  return elRef;
}
