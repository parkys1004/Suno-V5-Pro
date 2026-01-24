import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Zap, Disc, Moon, Sun, X } from 'lucide-react';

interface GlassCardProps {
  children?: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = "", hoverEffect = true }) => (
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

interface AccordionItemProps {
  title: string;
  children?: React.ReactNode;
  delay: number;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ title, children, delay, className = "" }) => {
  const [isOpen, setIsOpen] = useState(false);

  // If className is provided, use it. Otherwise use default bg/border.
  const baseStyle = className || 'bg-white/80 dark:bg-slate-800/60 border-white/50 dark:border-slate-700/50';

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay }}
      className="group"
    >
      <div className={`
        backdrop-blur-md rounded-2xl overflow-hidden border shadow-sm transition-all duration-300
        ${baseStyle}
        ${isOpen ? 'ring-2 ring-indigo-200 dark:ring-indigo-800 shadow-md' : 'hover:border-indigo-200 dark:hover:border-indigo-800'}
      `}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 cursor-pointer bg-transparent hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
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
              <div className="p-6 text-slate-700 dark:text-slate-300 leading-relaxed border-t border-black/5 dark:border-white/10 bg-white/40 dark:bg-slate-800/40 font-medium">
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

interface SimpleAccordionProps {
  title: string;
  date: string;
  children?: React.ReactNode;
}

export const SimpleAccordion: React.FC<SimpleAccordionProps> = ({ title, date, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-slate-200 dark:border-slate-700 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 px-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors rounded-lg"
      >
        <div className="flex flex-col items-start gap-1">
          <span className="text-sm text-indigo-500 dark:text-indigo-400 font-bold">{date}</span>
          <span className="font-bold text-slate-900 dark:text-slate-100 text-base md:text-lg">{title}</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-400" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="py-3 px-4 text-slate-600 dark:text-slate-300 text-sm md:text-base bg-slate-50 dark:bg-slate-800/30 rounded-lg mb-4 leading-relaxed whitespace-pre-line">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm z-[60]"
          />
          {/* Modal Content */}
          <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              className="bg-white dark:bg-[#0f172a] w-full max-w-2xl max-h-[80vh] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 pointer-events-auto flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <span className="w-2 h-6 bg-indigo-500 rounded-full inline-block"></span>
                  {title}
                </h3>
                <button 
                  onClick={onClose}
                  className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              
              {/* Body */}
              <div className="p-6 overflow-y-auto custom-scrollbar">
                {children}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

interface SectionTitleProps {
  icon: any;
  title: string;
  colorClass: string;
  rightElement?: React.ReactNode;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({ icon: Icon, title, colorClass, rightElement }) => (
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

interface ThemeToggleProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, setDarkMode }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setDarkMode(!darkMode)}
      className="p-3 rounded-full bg-white/50 dark:bg-slate-900/80 backdrop-blur-md border border-white/60 dark:border-slate-700 shadow-md dark:shadow-black/50 text-slate-700 dark:text-yellow-400 hover:bg-white dark:hover:bg-slate-800 transition-all group"
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
              <Moon className="w-5 h-5 fill-current" />
           </motion.div>
        ) : (
           <motion.div
             key="sun"
             initial={{ rotate: 90, opacity: 0 }}
             animate={{ rotate: 0, opacity: 1 }}
             exit={{ rotate: -90, opacity: 0 }}
             transition={{ duration: 0.2 }}
           >
              <Sun className="w-5 h-5 text-orange-500 fill-current" />
           </motion.div>
        )}
      </AnimatePresence>
      <span className="sr-only">Toggle theme</span>
    </motion.button>
  );
};