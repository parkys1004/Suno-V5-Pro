import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  ArrowRight, 
  Copy,
  Music,
  Wand2,
  Image as ImageIcon,
  History,
  BookOpen,
  Construction,
  Sparkles,
  Video
} from 'lucide-react';
import { GlassCard, SectionTitle, Modal, SimpleAccordion, AccordionItem } from './SharedUI';

const updateHistory = [
  {
    version: "V1.5",
    date: "2026.01.26",
    title: "Suno Studio Pro 업데이트",
    content: "• 통합 웹빌더 기능 고도화 및 안정성 개선\n• 사용자 피드백을 반영한 UI/UX 최적화"
  },
  {
    version: "V1.0",
    date: "2026.01.17",
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
    <section>
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
        <GlassCard className="p-8 relative overflow-hidden group h-full flex flex-col justify-between md:col-span-2">
          <div className="absolute top-0 right-0 p-3 opacity-10 dark:opacity-20 group-hover:opacity-20 dark:group-hover:opacity-30 transition-opacity">
             <Music className="w-24 h-24 text-indigo-600 dark:text-indigo-400 transform rotate-12" />
          </div>
          <div>
            <motion.span 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 inline-block shadow-lg shadow-indigo-200 dark:shadow-indigo-900/50"
            >
              V1.5 UPDATE
            </motion.span>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">Suno Studio Pro V1.5</h3>
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

        {/* Manual Link Box */}
        <GlassCard className="p-6 md:col-span-2 flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-blue-100 dark:border-blue-900/30 group">
           <div className="flex items-center gap-5 w-full md:w-auto">
              <div className="w-12 h-12 bg-white dark:bg-slate-800 rounded-xl shadow-sm flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                 <BookOpen className="w-6 h-6" />
              </div>
              <div className="flex-1">
                 <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2 flex-wrap">
                   Suno Studio Pro 메뉴얼
                   <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-extrabold tracking-wide">GUIDE</span>
                   <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-700/50 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-600 font-extrabold tracking-wide">준비중</span>
                 </h3>
                 <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mt-1">
                    웹빌더 사용법, 프롬프트 가이드, 문제 해결 방법 등 상세 가이드
                 </p>
              </div>
           </div>
           <motion.a 
              href="https://manual-two-omega.vercel.app" 
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full md:w-auto px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20 transition-all shrink-0"
           >
              메뉴얼 보기 <ArrowRight className="w-4 h-4" />
           </motion.a>
        </GlassCard>

        {/* Manual Details Accordion (Tips) */}
        <div className="md:col-span-2">
           <AccordionItem 
             title="Suno에서 음악 만들때 도움되는 꿀팁" 
             delay={0.1}
             className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-800/50"
           >
              <div className="grid grid-cols-1 gap-4">
                
                {/* 1. Prompt Lab (Moved from Grid) */}
                <motion.a 
                  href="https://v0-prompt-lab-pro-mvt4.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-400 transition-all group cursor-pointer"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0">
                         <Wand2 className="w-6 h-6" />
                      </div>
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">Suno V5 Prompt Lab</h4>
                            <span className="text-[10px] font-bold bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-600">DATABASE</span>
                         </div>
                         <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">40가지 장르 x 각 6개 프롬프트 (총 240세트) 데이터베이스</p>
                      </div>
                   </div>
                   <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </motion.a>

                {/* 2. SFX Guide */}
                <motion.a 
                  href="https://suno-sfx-master-guide.vercel.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="flex items-center justify-between p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-400 transition-all group cursor-pointer"
                >
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                         <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                         <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">SUNO SFX MASTER GUIDE</h4>
                         <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Suno 음악 퀄리티를 높여주는 효과음(SFX) 완벽 가이드</p>
                      </div>
                   </div>
                   <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                      <ArrowRight className="w-5 h-5" />
                   </div>
                </motion.a>

                {/* 3. Video Tools Comparison */}
                <motion.a 
                  href="https://v0-ai-video-model-battle-s9wm.vercel.app" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="block p-5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm hover:border-indigo-500 dark:hover:border-indigo-400 transition-all group cursor-pointer"
                >
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-red-100 dark:bg-red-900/30 rounded-lg flex items-center justify-center text-red-600 dark:text-red-400 shrink-0">
                            <Video className="w-6 h-6" />
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">뮤직비디오 제작 도구 비교</h4>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Kling O1, Runway Gen-3, Google Veo 성능 분석</p>
                        </div>
                      </div>
                      <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-700 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                        <ArrowRight className="w-5 h-5" />
                      </div>
                   </div>
                   
                   <div className="grid grid-cols-3 gap-2">
                      {[
                        { name: "Kling O1", desc: "Realistic" },
                        { name: "Runway", desc: "Creative" },
                        { name: "Google Veo", desc: "Fidelity" }
                      ].map((tool) => (
                        <div key={tool.name} className="text-center p-2 rounded-lg bg-slate-50 dark:bg-slate-700/50 border border-slate-100 dark:border-slate-600">
                           <span className="block text-xs font-bold text-slate-800 dark:text-slate-200">{tool.name}</span>
                           <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase tracking-wider">{tool.desc}</span>
                        </div>
                      ))}
                   </div>
                </motion.a>
              </div>
           </AccordionItem>
        </div>

        {/* Audio Mastering (Moved from Strategy) */}
        <motion.a
            href="https://audio-mastering-ten.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="block w-full text-left p-6 rounded-2xl bg-white/70 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-lg hover:shadow-indigo-100 dark:hover:shadow-indigo-500/10 hover:border-indigo-200 dark:hover:border-indigo-500/50 transition-all group md:col-span-2"
        >
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-slate-900 dark:text-slate-100 text-xl font-bold mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">프로페셔널 오디오 마스터링 의 혁신</h3>
                    <p className="text-slate-600 dark:text-slate-400 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">드래그 앤 드롭으로 지연 시간 없이 즉시 마스터링됩니다.</p>
                </div>
                <div className="hidden md:flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 group-hover:bg-indigo-50 dark:group-hover:bg-indigo-900/50 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-all">
                    <ArrowRight className="w-5 h-5" />
                </div>
            </div>
        </motion.a>

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