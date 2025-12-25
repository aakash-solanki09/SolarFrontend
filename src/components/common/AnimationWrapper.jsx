import React from 'react';
import { motion } from 'framer-motion';

const variants = {
  fadeInUp: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  fadeInLeft: {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  fadeInRight: {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  },
  scaleIn: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } }
  }
};

const AnimationWrapper = ({ children, animation = 'fadeInUp', delay = 0, className = '' }) => {
  const selectedVariant = variants[animation] || variants.fadeInUp;
  
  // Adjust delay in the transition object of the verified variant
  const finalVariant = {
      ...selectedVariant,
      visible: {
          ...selectedVariant.visible,
          transition: { ...selectedVariant.visible.transition, delay }
      }
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={finalVariant}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default AnimationWrapper;
