import { motion, useScroll, useSpring } from 'motion/react';

export default function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001
  });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 right-0 left-0 z-[1200] h-[3px] origin-left bg-gradient-to-r from-[#B8761F] via-[#F9C77A] to-[#4A2511]"
      style={{ scaleX }}
    />
  );
}
