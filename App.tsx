import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { Lock, ArrowRight, AlertCircle, LogOut, MessageCircle, Eye, EyeOff } from 'lucide-react';

// Component Imports
import Background from './components/Background';
import { ThemeToggle, GlassCard } from './components/SharedUI';
import ApiGuideSection from './components/ApiGuideSection';
import AppsToolsSection from './components/AppsToolsSection';
import StrategySection from './components/StrategySection';
import MusicPlayer from './components/MusicPlayer';

// --- Main App Component ---

// 설정할 비밀번호
const ACCESS_PASSWORD = "suno2026";
const STORAGE_KEY = "suno_v5_auth_token";

// SHA-256 암호화 (해싱) 함수
const hashPassword = async (password: string) => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

const App: React.FC = () => {
  // Default to dark mode (true)
  const [darkMode, setDarkMode] = useState(true);
  
  // Auth States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true); // 로딩 상태 추가
  
  const controls = useAnimation(); // For shake animation

  // 초기 실행 시 저장된 암호화 키 확인
  useEffect(() => {
    const checkAuth = async () => {
      const storedHash = localStorage.getItem(STORAGE_KEY);
      if (storedHash) {
        const currentPasswordHash = await hashPassword(ACCESS_PASSWORD);
        if (storedHash === currentPasswordHash) {
          setIsAuthenticated(true);
        }
      }
      setIsCheckingAuth(false);
    };
    checkAuth();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === ACCESS_PASSWORD) {
      // 비밀번호가 맞으면 암호화해서 로컬 스토리지에 저장
      const hash = await hashPassword(ACCESS_PASSWORD);
      localStorage.setItem(STORAGE_KEY, hash);
      
      setIsAuthenticated(true);
      setLoginError(false);
    } else {
      setLoginError(true);
      // 틀렸을 때 흔들림 효과
      controls.start({
        x: [0, -5, 5, -5, 5, 0],
        transition: { duration: 0.4 }
      });
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(STORAGE_KEY);
    setIsAuthenticated(false);
    setPasswordInput("");
  };

  // 인증 확인 중일 때는 아무것도 렌더링하지 않거나 로딩화면 (깜빡임 방지)
  if (isCheckingAuth) return null;

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen text-slate-800 dark:text-slate-100 font-sans selection:bg-indigo-200 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden transition-colors duration-500 flex flex-col">
        <Background />
        
        {/* Theme Toggle & Logout Button Area */}
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
          {isAuthenticated && (
             <motion.button
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={handleLogout}
               className="p-3 rounded-full bg-white/50 dark:bg-slate-900/80 backdrop-blur-md border border-white/60 dark:border-slate-700 shadow-md dark:shadow-black/50 text-slate-700 dark:text-slate-300 hover:bg-red-50 dark:hover:bg-red-900/30 hover:text-red-600 dark:hover:text-red-400 hover:border-red-200 dark:hover:border-red-800 transition-all group"
               title="로그아웃 (암호 저장 삭제)"
             >
               <LogOut className="w-5 h-5" />
             </motion.button>
          )}
          <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
        </div>

        {/* KakaoTalk Floating Button (Bottom Right) */}
        <motion.a
          href="https://open.kakao.com/o/sA1vVTbi"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-[#FAE100] text-[#371D1E] shadow-xl dark:shadow-black/40 flex items-center justify-center border border-transparent dark:border-white/10 hover:brightness-105 transition-all"
          title="카카오톡 1:1 문의"
        >
           <MessageCircle className="w-6 h-6 fill-current" />
        </motion.a>

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
                  <div className="w-16 h-16 bg-indigo-100 dark:bg-indigo-900/50 rounded-full flex items-center justify-center mx-auto mb-4 text-indigo-600 dark:text-indigo-400 shadow-inner">
                    <Lock className="w-8 h-8" />
                  </div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Suno V5 PRO</h1>
                  <p className="text-slate-600 dark:text-slate-400 text-sm">접속하려면 비밀번호를 입력하세요.</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <motion.div animate={controls} className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        value={passwordInput}
                        onChange={(e) => {
                          setPasswordInput(e.target.value);
                          if (loginError) setLoginError(false);
                        }}
                        placeholder="비밀번호 입력"
                        className={`w-full px-4 py-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/80 border focus:ring-2 focus:ring-indigo-500 outline-none transition-all font-medium text-center tracking-widest pr-12 shadow-sm dark:shadow-inner ${
                          loginError 
                            ? 'border-red-500 text-red-900 dark:text-red-200 focus:border-red-500 focus:ring-red-200' 
                            : 'border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:border-indigo-500'
                        }`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 text-slate-400 hover:text-indigo-500 dark:text-slate-500 dark:hover:text-indigo-400 transition-colors"
                        title={showPassword ? "비밀번호 숨기기" : "비밀번호 보기"}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </motion.div>
                    
                    {loginError && (
                      <motion.div 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-3 p-3 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 flex items-center justify-center gap-2"
                      >
                        <AlertCircle className="w-4 h-4 text-red-500 dark:text-red-400" /> 
                        <span className="text-red-600 dark:text-red-300 text-sm font-bold">비밀번호가 일치하지 않습니다.</span>
                      </motion.div>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02, filter: "brightness(1.1)" }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] hover:bg-right transition-[background-position] duration-500 text-white rounded-xl font-bold shadow-lg dark:shadow-indigo-500/20 border border-transparent dark:border-white/10 flex items-center justify-center gap-2 tracking-wide"
                  >
                    입장하기 <ArrowRight className="w-4 h-4" />
                  </motion.button>
                  
                  <div className="mt-6">
                    <p className="text-center text-sm text-slate-600 dark:text-slate-400 font-medium bg-slate-50 dark:bg-slate-900/40 py-3 px-4 rounded-lg border border-slate-200 dark:border-slate-800 flex items-center justify-center gap-2 transition-all duration-300 hover:text-indigo-600 dark:hover:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:border-indigo-200 dark:hover:border-indigo-500/30 cursor-default">
                      <Lock className="w-3 h-3" />
                      로그인 시 인증 정보가 브라우저에 안전하게 저장됩니다.
                    </p>
                  </div>
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
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                  className="text-slate-500 dark:text-slate-400 text-sm md:text-base mt-2 font-medium"
                >
                  관련 자료 포함, 빌더앱은 계속 업데이트됩니다.
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

        {/* Global Music Player - Always Visible, Admin status passed */}
        <MusicPlayer isAdmin={isAuthenticated} />
        
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