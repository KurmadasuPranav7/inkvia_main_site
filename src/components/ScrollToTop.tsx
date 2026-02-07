import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const smoothScrollToTop = () => {
  const start = window.scrollY;
  const duration = 600; // increase = smoother
  let startTime: number | null = null;

  const animate = (time: number) => {
    if (!startTime) startTime = time;
    const progress = time - startTime;
    const percent = Math.min(progress / duration, 1);

    const easeInOut = percent < 0.5
      ? 2 * percent * percent
      : 1 - Math.pow(-2 * percent + 2, 2) / 2;

    window.scrollTo(0, start * (1 - easeInOut));

    if (progress < duration) {
      requestAnimationFrame(animate);
    }
  };

  requestAnimationFrame(animate);
};


const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    smoothScrollToTop();
  }, [pathname]);

  return null;
};

export default ScrollToTop;
