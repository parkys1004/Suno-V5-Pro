import React from 'react';
import { motion } from 'framer-motion';
import { 
  Lightbulb, 
  Globe,
  TrendingUp,
  FileCheck
} from 'lucide-react';
import { GlassCard, SectionTitle } from './SharedUI';

const StrategySection: React.FC = () => {
  return (
    <section>
      <SectionTitle icon={Lightbulb} title="전략 및 심화 과정" colorClass="text-amber-500" />
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
          <motion.a
            href="https://suno-ai-biz-2026.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full text-left p-6 rounded-2xl bg-slate-900 dark:bg-gradient-to-br dark:from-slate-900 dark:via-slate-900 dark:to-[#0f172a] text-white shadow-xl shadow-slate-200 dark:shadow-indigo-900/20 group relative overflow-hidden border border-transparent dark:border-indigo-500/30 cursor-pointer"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 rounded-full blur-[50px] opacity-20 group-hover:opacity-40 transition-opacity" />
            <h3 className="text-xl font-bold mb-2 relative z-10 flex items-center gap-2 text-white">
              2026 AI 음악 수익화 전략
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            </h3>
            <p className="text-slate-300 text-sm relative z-10 font-medium group-hover:text-white transition-colors">완전 정복 가이드 리포트</p>
          </motion.a>
        </div>

        {/* DistroKid Section */}
        <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800">
           <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="p-1.5 rounded-lg bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400">
                 <Globe className="w-5 h-5" />
              </span>
              DistroKid 음원발매과정
           </h3>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.a
                 href="https://distro-kid.vercel.app"
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-teal-400 dark:hover:border-teal-600 transition-all group relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <FileCheck className="w-16 h-16 text-teal-500 transform rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                        <span className="font-bold">1</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">가입부터 수익화까지</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">계정 생성, 음원 업로드, 스토어 심사 통과 및 정산 계좌 연동 가이드</p>
                 </div>
              </motion.a>

              <motion.a
                 href="https://distro-kid-guide-pro.vercel.app"
                 target="_blank"
                 rel="noopener noreferrer"
                 whileHover={{ scale: 1.02 }}
                 whileTap={{ scale: 0.98 }}
                 className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-teal-400 dark:hover:border-teal-600 transition-all group relative overflow-hidden"
              >
                 <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <TrendingUp className="w-16 h-16 text-teal-500 transform -rotate-12" />
                 </div>
                 <div className="relative z-10">
                    <div className="w-10 h-10 rounded-full bg-teal-50 dark:bg-teal-900/20 flex items-center justify-center mb-4 text-teal-600 dark:text-teal-400 group-hover:scale-110 transition-transform">
                        <span className="font-bold">2</span>
                    </div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-lg mb-2 group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">수익 극대화를 위한 DistroKid 활용 전략</h4>
                    <p className="text-sm text-slate-500 dark:text-slate-400">전략적 요금제 분석, 기술적 규격 및 시각화, 수익 시뮬레이션 (초기 6개월)</p>
                 </div>
              </motion.a>
           </div>
        </div>
      </div>
    </section>
  );
};

export default StrategySection;