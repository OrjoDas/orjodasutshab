import React, { ReactNode } from 'react';
import { motion } from 'motion/react';

interface LusionScrollRevealProps {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'zoom';
  className?: string;
  id?: string;
}

export const LusionScrollReveal: React.FC<LusionScrollRevealProps> = ({
  children,
  delay = 0,
  direction = 'up',
  className = '',
  id,
}) => {
  const getVariants = () => {
    switch (direction) {
      case 'up':
        return {
          hidden: {
            opacity: 0,
            y: 50,
            scale: 0.97,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
          },
        };
      case 'down':
        return {
          hidden: {
            opacity: 0,
            y: -50,
            scale: 0.97,
          },
          visible: {
            opacity: 1,
            y: 0,
            scale: 1,
          },
        };
      case 'left':
        return {
          hidden: {
            opacity: 0,
            x: 50,
          },
          visible: {
            opacity: 1,
            x: 0,
          },
        };
      case 'right':
        return {
          hidden: {
            opacity: 0,
            x: -50,
          },
          visible: {
            opacity: 1,
            x: 0,
          },
        };
      case 'zoom':
        return {
          hidden: {
            opacity: 0,
            scale: 0.9,
          },
          visible: {
            opacity: 1,
            scale: 1,
          },
        };
      default:
        return {
          hidden: { opacity: 0, y: 40 },
          visible: { opacity: 1, y: 0 },
        };
    }
  };

  return (
    <motion.div
      id={id}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.215, 0.61, 0.355, 1], // Smooth GPU-accelerated cubic bezier
      }}
      variants={getVariants()}
      className={`will-change-transform ${className}`}
    >
      {children}
    </motion.div>
  );
};
