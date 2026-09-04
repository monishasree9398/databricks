import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
  pressed?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  hover = true,
  pressed = false,
  ...props
}) => {
  const shadowClass = pressed
    ? 'shadow-neu-pressed'
    : glow
    ? 'shadow-neu-flat ring-2 ring-brand-orange/30'
    : 'shadow-neu-flat';

  return (
    <motion.div
      whileHover={hover && !pressed ? { y: -2, transition: { duration: 0.15 } } : undefined}
      className={`relative rounded-2xl md:rounded-3xl bg-[#EEF2F6] ${shadowClass} transition-all duration-200 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
