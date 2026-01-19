import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Component Imports
import Background from './components/Background';
import { ThemeToggle } from './components/SharedUI';
import ApiGuideSection from './components/ApiGuideSection';
import AppsToolsSection from './components/AppsToolsSection';
import StrategySection from './components/StrategySection';

// --- Main App Component ---

const App: React.FC = () => {
  // Default to dark mode (true)
  const [darkMode, setDarkMode] = useState(true);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-200 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden transition-colors duration-500">
        <Background />
        
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <main className="max-w-5xl mx-auto p-4 md:p-8 relative z-10">
          
          {/* Header */}
          <header className="text-center mb-16 pt-10">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="inline-block mb-6 relative"
            >
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 dark:opacity-40 rounded-full" />
              <h1 className="text-5xl md:text-7xl font-black mb-2 relative tracking-tight">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 dark:from-indigo-400 dark:via-purple-400 dark:to-indigo-400 bg-[length:200%_auto] animate-gradient">
                  방구석 음악만들기
                </span>
                <br />
                <span className="text-4xl md:text-6xl text-slate-900 dark:text-white mt-2 block tracking-tight">
                  SUNO V5 <span className="text-indigo-600 dark:text-indigo-400">PRO</span>
                </span>
              </h1>
            </motion.div>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-700 dark:text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed"
            >
              AI Studio와 Suno로 시작하는 나만의 음악 제작 여정
            </motion.p>
          </header>

          {/* Section 1: API Guide */}
          <ApiGuideSection />

          {/* Section 2: Apps & Tools */}
          <AppsToolsSection />

          {/* Section 3: Strategy */}
          <StrategySection />

          {/* Footer */}
          <footer className="text-center py-10 border-t border-slate-200/50 dark:border-slate-700/50 mt-20">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">© 2026 방구석 음악만들기 - Suno Studio Pro Project</p>
          </footer>

        </main>
        
        {/* Global CSS for custom animations */}
        <style>{`
          @keyframes gradient {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
          .animate-gradient {
            animation: gradient 6s ease infinite;
          }
        `}</style>
      </div>
    </div>
  );
};

export default App;