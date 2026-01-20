import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  ArrowRight, 
  Copy,
  Music,
  Wand2,
  Image as ImageIcon,
  History
} from 'lucide-react';
import { GlassCard, SectionTitle, Modal, SimpleAccordion } from './SharedUI';

const updateHistory = [
  {
    version: "V1.2",
    date: "2026.02.20",
    title: "앨범아트 생성기 및 UI 개선",
    content: "• 앨범아트 전용 웹빌더 추가 (New App)\n• 복잡한 프롬프트 없이 클릭만으로 고퀄리티 앨범 아트 제작 가능\n• 메인 대시보드 다크모드 가독성 개선\n• 로그인 보안 프로세스 강화"
  },
  {
    version: "V1.1",
    date: "2026.01.15",
    title: "Suno Studio Pro 통합 웹빌더 출시",
    content: "• 기획, 구조, 가사, 프롬프트, 앨범아트 제작을 하나의 워크플로우로 통합\n• 프롬프트 랩 데이터베이스(240종) 연동\n• 반응형 모바일 뷰 최적화"
  },
  {
    version: "V1.0",
    date: "2026.01.01",
    title: "Suno V5 Pro 서비스 런칭",
    content: "• AI Studio API 연동 가이드 배포\n• 기초 프롬프트 메이커 공개\n• 수익화 전략 리포트(Alpha) 제공"
  }
];

const AppsToolsSection: React.FC = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  return (
    <section className="mb-20">
      <SectionTitle 
        icon={Rocket} 
        title="Suno Studio Pro & 빌더앱" 
        colorClass="text-purple-500" 
        rightElement={
          <button 
            onClick={() => setShowUpdateModal(true)}
            className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-700/50 shadow-sm dark:shadow-inner hover:bg-indigo-50 dark:hover:bg-slate-700 hover:border-indigo-200 dark:hover:border-indigo-500 transition-all text-sm md:text-base font-bold flex items-center gap-2 group"
          >
            <History className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            웹빌더 및 관련자료 업데이트
          </button>
        }
      />

      {/* Update History Modal */}
      <Modal 
        isOpen={showUpdateModal} 
        onClose={() => setShowUpdateModal(false)} 
        title="웹빌더 및 자료 업데이트 히스토리"
      >
        <div className="space-y-1">
          {updateHistory.map((item, index) => (
            <SimpleAccordion 
              key={index} 
              date={item.date} 
              title={`[${item.version}] ${item.title}`}
            >
              {item.content}
            </SimpleAccordion>
          ))}
        </div>
        <div className="mt-8 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-700 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            모든 업데이트는 기존 구매자분들에게 무료로 제공됩니다.<br/>
            새로운 기능이 추가되면 이 곳에서 확인해주세요.
          </p>
        </div>
      </Modal>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <GlassCard className="p-8 relative overflow-hidden group h-full flex flex-col justify-between">
          <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity">
             <Music className="w-24 h-24 text-indigo-600 dark:text-indigo-400 transform rotate-12" />
          </div>
          <div>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
            >
              V1.1 UPDATE
            </motion.span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Suno Studio Pro V1.1</h3>
            <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-medium">기획, 구조, 가사, 프롬프트, 앨범아트 제작까지 한 번에 해결하는 통합 웹빌더입니다.</p>
          </div>
          <motion.a 
            href="https://suno-studio-pro-kpop.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            whileTap={{ scale: 0.95 }}
            className="w-full py-3.5 bg-slate-900 dark:bg-gradient-to-b dark:from-slate-100 dark:to-slate-300 text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-indigo-600 dark:hover:brightness-110 transition-all shadow-lg dark:shadow-indigo-500/10 border border-transparent dark:border-white/50 cursor-pointer"
          >
            지금 이용하기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </GlassCard>

        <GlassCard className="p-8 border-dashed border-2 border-indigo-200 dark:border-indigo-800 bg-white/50 dark:bg-slate-800/50 h-full flex flex-col justify-between group hover:border-indigo-400 dark:hover:border-indigo-600">
           <div>
              <div className="flex items-center gap-2 mb-4">
                 <Wand2 className="w-5 h-5 text-slate-500 dark:text-slate-400 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors" />
                 <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Database</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Suno V5 Prompt Lab</h3>
              <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-medium">40가지 장르 x 각 6개 프롬프트<br/>(총 240세트) 데이터베이스</p>
           </div>
           <motion.a 
              href="https://v0-prompt-lab-pro-mvt4.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              whileTap={{ scale: 0.95 }}
              className="w-full py-3.5 bg-slate-900 dark:bg-gradient-to-b dark:from-slate-100 dark:to-slate-300 text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-purple-600 dark:hover:brightness-110 transition-all shadow-lg dark:shadow-purple-500/10 border border-transparent dark:border-white/50 cursor-pointer"
           >
              Prompt Lab 바로가기 <ArrowRight className="w-4 h-4" />
           </motion.a>
        </GlassCard>

        <GlassCard className="p-8 relative overflow-hidden group h-full flex flex-col justify-between md:col-span-2 border-pink-200 dark:border-pink-900/30">
          <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity">
             <ImageIcon className="w-24 h-24 text-pink-600 dark:text-pink-400 transform -rotate-12" />
          </div>
          <div className="relative z-10">
             <motion.span 
               whileHover={{ scale: 1.05 }}
               className="bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-lg shadow-pink-200 dark:shadow-pink-900/50"
             >
               NEW APP
             </motion.span>
             <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                <div>
                   <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">앨범아트 이미지 생성 웹빌더</h3>
                   <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium max-w-xl">
                      복잡한 프롬프트 없이 클릭만으로 고퀄리티 앨범 아트를 제작해보세요.
                   </p>
                </div>
                <motion.a 
                  href="https://ai.studio/apps/drive/1HPxZpePSKUPH5-pW4MdkYYyAjqjk5a0R?fullscreenApplet=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="w-full md:w-auto px-8 py-3.5 bg-slate-900 dark:bg-gradient-to-b dark:from-slate-100 dark:to-slate-300 text-white dark:text-slate-900 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-pink-600 dark:hover:brightness-110 transition-all shadow-lg dark:shadow-pink-500/10 border border-transparent dark:border-white/50 cursor-pointer whitespace-nowrap"
                >
                  앱 실행하기 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.a>
             </div>
          </div>
        </GlassCard>
      </div>

      {/* Copy Instruction */}
      <GlassCard className="p-6 bg-gradient-to-r from-yellow-50/80 to-orange-50/80 dark:from-yellow-900/20 dark:to-orange-900/20 border-orange-100 dark:border-orange-900/30">
        <div className="flex items-start gap-5">
          <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-orange-500 shrink-0">
            <Copy className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-1">앱 커스텀 이용 안내</h4>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-relaxed font-medium">
              직접 커스텀 하셔서 이용하셔도 됩니다.(Aistudio 빌더앱) <br className="hidden md:block"/>
              이용하실때 앱 복사를 하신후 이용을 하시면 됩니다. 상단 오른쪽 (카피앱 클릭)
            </p>
          </div>
        </div>
      </GlassCard>
    </section>
  );
};

export default AppsToolsSection;