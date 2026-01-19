import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle } from 'lucide-react';

// Component Imports
import Background from './components/Background';
import { ThemeToggle, GlassCard } from './components/SharedUI';
import ApiGuideSection from './components/ApiGuideSection';
import AppsToolsSection from './components/AppsToolsSection';
import StrategySection from './components/StrategySection';

// --- Main App Component ---

// 설정할 비밀번호 (여기서 변경하세요)
const ACCESS_PASSWORD = "suno2026";

const App: React.FC = () => {
  // Default to dark mode (true)
  const [darkMode, setDarkMode] = useState(true);
  
  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [loginError, setLoginError] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ACCESS_PASSWORD) {
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      // Shake effect logic could go here, for now just error state
    }
  };

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-200 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden transition-colors duration-500 flex flex-col">
        <Background />
        
        <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />

        <AnimatePresence mode="wait">
          {!isAuthenticated ? (
            /* --- Login Screen --- */
            <motion.div 
              key="login"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
              transition={{ duration: 0.5 }}
              className="flex-1 flex items-center justify-center p-4 z-10"
            >
              <GlassCard className="w-full max-w-md p-8 md:p-10 border-indigo-100 dark:border-indigo-900/50">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Suno V5 PRO</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">접속하려면 비밀번호를 입력하세요.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <input
                      type="password"
                      value={passwordInput}
                      onChange={(e) => {
                        setPasswordInput(e.target.value);
                        if (loginError) setLoginError(false);
                      }}
                      placeholder="비밀번호 입력"
                      className={`w-full px-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-center tracking-widest ${
                        loginError 
                          ? 'border-red-500 text-red-900 dark:text-red-200 focus:border-red-500 focus:ring-red-200' 
                          : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500'
                      }`}
                    />
                    {loginError && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-xs mt-2 text-center flex items-center justify-center gap-1 font-bold"
                      >
                        <AlertCircle className="w-3 h-3" /> 비밀번호가 올바르지 않습니다.
                      </motion.p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50 flex items-center justify-center gap-2 transition-all"
                  >
                    입장하기 <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </form>
              </GlassCard>
            </motion.div>
          ) : (
            /* --- Main Content --- */
            <motion.main 
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              className="max-w-5xl mx-auto p-4 md:p-8 relative z-10 w-full"
            >
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
            </motion.main>
          )}
        </AnimatePresence>
        
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