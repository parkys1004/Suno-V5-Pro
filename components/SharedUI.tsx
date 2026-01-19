import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Disc, Moon, Sun } from 'lucide-react';

export const GlassCard = ({ children, className = "", hoverEffect = true }: { children?: React.ReactNode; className?: string; hoverEffect?: boolean }) => (
  <motion.div
    whileHover={hoverEffect ? { y: -5, boxShadow: "0 20px 40px -5px rgba(99, 102, 241, 0.15)" } : {}}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5, ease: "easeOut" }}
    className={`bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-xl rounded-2xl transition-colors duration-300 ${className}`}
  >
    {children}
  </motion.div>
);

export const AccordionItem = ({ title, children, delay }: { title: string; children?: React.ReactNode; delay: number }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="group"
    >
      <div className={`
        bg-white/80 dark:bg-slate-800/60 backdrop-blur-md rounded-2xl overflow-hidden border border-white/50 dark:border-slate-700/50 shadow-sm transition-all duration-300
        ${isOpen ? 'ring-2 ring-indigo-200 dark:ring-indigo-800 shadow-md' : 'hover:border-indigo-200 dark:hover:border-indigo-800'}
      `}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 cursor-pointer bg-transparent hover:bg-indigo-50/50 dark:hover:bg-slate-700/50 transition-colors"
        >
          <span className="font-semibold text-slate-800 dark:text-slate-100 flex items-center gap-3">
            {isOpen ? <Zap className="w-4 h-4 text-indigo-500 dark:text-indigo-400" /> : <Disc className="w-4 h-4 text-slate-400" />}
            {title}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
          >
            <ChevronDown className={`w-5 h-5 ${isOpen ? 'text-indigo-500 dark:text-indigo-400' : 'text-slate-400'}`} />
          </motion.div>
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="p-6 text-slate-700 dark:text-slate-300 leading-relaxed border-t border-indigo-50 dark:border-slate-700 bg-white/40 dark:bg-slate-800/40 font-medium">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export const SectionTitle = ({ icon: Icon, title, colorClass, rightElement }: { icon: any; title: string; colorClass: string; rightElement?: React.ReactNode }) => (
  <motion.div 
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="flex flex-wrap items-center justify-between gap-4 mb-8"
  >
    <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center tracking-tight">
      <div className={`p-2 rounded-xl bg-white dark:bg-slate-800 shadow-sm mr-3 ${colorClass.replace('text-', 'bg-').replace('500', '100')} dark:bg-opacity-20`}>
        <Icon className={`w-6 h-6 ${colorClass}`} />
      </div>
      {title}
    </h2>
    {rightElement}
  </motion.div>
);

export const ThemeToggle = ({ darkMode, setDarkMode }: { darkMode: boolean; setDarkMode: (val: boolean) => void }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={() => setDarkMode(!darkMode)}
      className="fixed top-6 right-6 z-50 p-3 rounded-full bg-white/30 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-slate-700 shadow-lg text-slate-800 dark:text-yellow-400 hover:bg-white/50 dark:hover:bg-slate-700 transition-all group"
    >
      <AnimatePresence mode="wait">
        {darkMode ? (
           <motion.div
             key="moon"
             initial={{ rotate: -90, opacity: 0 }}
             animate={{ rotate: 0, opacity: 1 }}
             exit={{ rotate: 90, opacity: 0 }}
             transition={{ duration: 0.2 }}
           >
              <Moon className="w-6 h-6 fill-current" />
           </motion.div>
        ) : (
           <motion.div
             key="sun"
             initial={{ rotate: 90, opacity: 0 }}
             animate={{ rotate: 0, opacity: 1 }}
             exit={{ rotate: -90, opacity: 0 }}
             transition={{ duration: 0.2 }}
           >
              <Sun className="w-6 h-6 text-orange-500 fill-current" />
           </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
};
