import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-slate-50 dark:bg-[#020617] transition-colors duration-500">
      <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100 via-slate-50 to-white dark:from-indigo-950/40 dark:via-[#020617] dark:to-[#020617] opacity-80" />
      
      {/* Animated Orbs - Adjusted for Dark Mode */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-purple-200 dark:bg-purple-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20"
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          x: [0, -50, 0],
          y: [0, -30, 0],
        }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-200 dark:bg-indigo-900/30 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-3xl opacity-30 dark:opacity-20"
      />
      
      {/* Floating Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
         {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: Math.random() * window.innerWidth, 
                y: Math.random() * window.innerHeight,
                opacity: 0 
              }}
              animate={{ 
                y: [null, Math.random() * -100],
                opacity: [0, 0.8, 0] 
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity,
                delay: Math.random() * 5
              }}
              className="absolute w-2 h-2 bg-indigo-500 dark:bg-indigo-400 rounded-full blur-[1px]"
            />
         ))}
      </div>
    </div>
  );
};

export default Background;