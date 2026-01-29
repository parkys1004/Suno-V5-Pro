import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Sparkles, User, Loader2, AlertCircle, ChevronDown } from 'lucide-react';
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "안녕하세요! Suno V5 Pro AI 어시스턴트입니다. 🎵\n음악 제작법, 프롬프트 작성, 수익화 전략 등 무엇이든 물어보세요!" }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Chat instance ref to maintain history context
  const chatRef = useRef<any>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen]);

  // Helper to safely get API Key from various environment patterns
  const getApiKey = () => {
    try {
        // 1. Standard process.env (Node/Webpack)
        if (typeof process !== 'undefined' && process.env?.API_KEY) {
            return process.env.API_KEY;
        }
        // 2. Vite (import.meta.env)
        // @ts-ignore
        if (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_KEY) {
            // @ts-ignore
            return import.meta.env.VITE_API_KEY;
        }
        // 3. Create React App
        if (typeof process !== 'undefined' && process.env?.REACT_APP_API_KEY) {
            return process.env.REACT_APP_API_KEY;
        }
        // 4. Next.js Public
        if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_API_KEY) {
            return process.env.NEXT_PUBLIC_API_KEY;
        }
    } catch (e) {
        console.warn("Environment variable access warning:", e);
    }
    return null;
  };

  // Initialize Chat
  const getChat = () => {
    if (chatRef.current) return chatRef.current;
    
    const apiKey = getApiKey();
    
    // If no key, return null (handle gracefully)
    if (!apiKey) {
        console.error("API Key missing. Checked: API_KEY, VITE_API_KEY, REACT_APP_API_KEY, NEXT_PUBLIC_API_KEY");
        return null;
    }

    const ai = new GoogleGenAI({ apiKey });
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: "당신은 'Suno V5 Pro 방구석 음악만들기' 서비스의 전문 AI 어시스턴트입니다. 사용자가 Suno AI를 이용해 음악을 만들고, 앨범 아트를 생성하고, DistroKid 등을 통해 수익화하는 과정을 도와주세요. 답변은 한국어로 친절하고 구체적으로 작성하며, 전문적인 음악 용어나 마케팅 전략도 쉽게 설명해주세요. 2026년 기준의 최신 정보를 바탕으로 답변하세요. 인사는 짧게 하고 본론 위주로 답하세요.",
      },
    });
    chatRef.current = chat;
    return chat;
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMessage = inputValue;
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const chat = getChat();
      if (!chat) {
         // Simulation for demo/error feedback if no API key is found
         setTimeout(() => {
             setMessages(prev => [...prev, { 
                 role: 'model', 
                 text: "⚠️ **API Key를 찾을 수 없습니다.**\n\n배포 환경(Vercel 등)에 따라 변수명 앞에 접두사가 필요할 수 있습니다.\n\n[해결 방법]\nVercel 환경 변수 설정에서 아래 이름들로 키를 추가해보세요:\n1. `VITE_API_KEY`\n2. `REACT_APP_API_KEY`\n\n설정 후 반드시 **Redeploy** 해야 적용됩니다." 
             }]);
             setIsLoading(false);
         }, 500);
         return;
      }

      const result = await chat.sendMessageStream({ message: userMessage });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]); // Placeholder for streaming

      for await (const chunk of result) {
        const c = chunk as GenerateContentResponse;
        const text = c.text;
        if (text) {
          fullText += text;
          setMessages(prev => {
            const newArr = [...prev];
            newArr[newArr.length - 1] = { role: 'model', text: fullText };
            return newArr;
          });
        }
      }
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "죄송합니다. 일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20, transformOrigin: "bottom left" }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-[320px] md:w-[380px] h-[500px] max-h-[80vh] flex flex-col bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-700 shadow-2xl rounded-3xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md z-10">
              <div className="flex items-center gap-2">
                <div className="p-1.5 bg-white/20 rounded-full backdrop-blur-sm">
                  <Bot className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="font-bold text-sm">Suno V5 Pro AI</h3>
                    <p className="text-[10px] text-indigo-100 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"/>
                        Online
                    </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4 bg-slate-50/50 dark:bg-black/20">
              {messages.map((msg, idx) => (
                <motion.div 
                    key={idx} 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                    <div className={`
                        max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm break-words
                        ${msg.role === 'user' 
                            ? 'bg-indigo-600 text-white rounded-tr-none' 
                            : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 rounded-tl-none'}
                    `}>
                        {msg.role === 'model' && (
                            <div className="flex items-center gap-1 mb-1 opacity-50">
                                <Sparkles className="w-3 h-3 text-indigo-500" />
                                <span className="text-[10px] font-bold">AI Assistant</span>
                            </div>
                        )}
                        {msg.text}
                    </div>
                </motion.div>
              ))}
              {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-2">
                          <Loader2 className="w-4 h-4 text-indigo-500 animate-spin" />
                          <span className="text-xs text-slate-500 dark:text-slate-400">답변 생성 중...</span>
                      </div>
                  </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
               <form onSubmit={handleSendMessage} className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="질문을 입력하세요..."
                    className="w-full pl-4 pr-12 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400 transition-all text-sm"
                  />
                  <button 
                    type="submit"
                    disabled={!inputValue.trim() || isLoading}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-indigo-600 text-white disabled:bg-slate-300 dark:disabled:bg-slate-700 transition-colors shadow-sm hover:bg-indigo-700"
                  >
                     <Send className="w-4 h-4" />
                  </button>
               </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
            <motion.button
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(true)}
                className="group relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all"
            >
                {/* Ping Animation */}
                <span className="absolute top-0 right-0 -mt-1 -mr-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
                
                <MessageSquare className="w-6 h-6 fill-current" />
                
                {/* Tooltip */}
                <span className="absolute left-full ml-3 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                    AI 채팅 상담
                </span>
            </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ChatWidget;