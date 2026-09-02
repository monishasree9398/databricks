import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

interface CardProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  glow = false,
  hover = true,
  ...props
}) => {
  return (
    <motion.div
      whileHover={hover ? { y: -1, transition: { duration: 0.15 } } : undefined}
      className={`relative rounded-2xl bg-white border border-slate-200 shadow-sm transition-all duration-150 ${
        glow ? 'border-brand-orange/40 ring-1 ring-brand-orange/20' : 'hover:border-slate-300'
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};
