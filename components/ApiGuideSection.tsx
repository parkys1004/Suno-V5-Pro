import React from 'react';
import { 
  Key, 
  Lightbulb, 
  BookOpen, 
  Music,
  CreditCard,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon
} from 'lucide-react';
import { AccordionItem, SectionTitle } from './SharedUI';

const ApiGuideSection: React.FC = () => {
  return (
    <section>
      <SectionTitle icon={Key} title="AI Studio 설정 가이드" colorClass="text-indigo-500" />
      
      <div className="space-y-4">
        <AccordionItem title="AI Studio API KEY 받는 방법 (한글 · 초급자)" delay={0.1}>
          <div className="space-y-6">
            {/* Steps */}
            <ol className="list-none space-y-5">
              <li className="relative pl-6">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">1.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 text-lg">Google AI Studio 접속</strong>
                  <p className="text-base text-slate-700 dark:text-slate-300 mb-1">아래 사이트로 이동하세요.</p>
                  <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 hover:underline text-base break-all font-bold">https://aistudio.google.com</a>
                  <p className="text-sm mt-2 text-slate-600 dark:text-slate-400 flex items-center gap-2 font-medium">
                     <span className="w-1.5 h-1.5 bg-slate-400 rounded-full"></span>
                     구글 계정으로 로그인합니다.
                  </p>
                </div>
              </li>
              <li className="relative pl-6">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">2.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 text-lg">API 키 메뉴로 이동</strong>
                  <p className="text-base text-slate-700 dark:text-slate-300 leading-relaxed">
                    화면 왼쪽 또는 상단에서 <span className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-bold border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">Get API key</span> 또는 <span className="bg-slate-100 dark:bg-slate-700 px-1.5 py-0.5 rounded text-sm font-bold border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-200">API 키</span> 버튼을 클릭합니다.
                    <br/><span className="text-sm text-slate-500 dark:text-slate-500">(처음 접속 시 바로 안내 화면이 뜨는 경우도 많습니다)</span>
                  </p>
                </div>
              </li>
              <li className="relative pl-6">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">3.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 text-lg">새 API 키 생성</strong>
                  <p className="text-base text-slate-700 dark:text-slate-300 mb-2">
                    <span className="font-bold text-indigo-700 dark:text-indigo-400">Create API key</span> 클릭 또는 <span className="font-bold text-indigo-700 dark:text-indigo-400">새 API 키 만들기</span> 클릭
                  </p>
                  <div className="bg-slate-100 dark:bg-slate-900/60 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">예시 형태:</p>
                    <code className="text-sm font-mono text-indigo-700 dark:text-indigo-300 break-all font-bold">AIzaSyxxxxxxxxxxxxxxxx</code>
                  </div>
                  <p className="text-sm text-orange-600 dark:text-orange-500 mt-2 font-bold">⚠️ 이 키는 비밀번호처럼 중요합니다.</p>
                </div>
              </li>
              <li className="relative pl-6">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">4.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 text-lg">(중요) 어떤 프로젝트인지 확인</strong>
                  <p className="text-base text-slate-700 dark:text-slate-300">보통 자동으로 Google Cloud 프로젝트가 연결됩니다.</p>
                  <ul className="mt-2 space-y-1 text-base text-slate-700 dark:text-slate-300 pl-2 border-l-4 border-slate-200 dark:border-slate-700 ml-1">
                     <li>기본 프로젝트 사용 → <span className="text-green-600 dark:text-green-500 font-extrabold">OK</span></li>
                     <li>따로 만든 프로젝트 사용 → 선택 가능</li>
                  </ul>
                  <p className="text-sm mt-3 text-indigo-700 dark:text-indigo-300 font-bold bg-indigo-50 dark:bg-indigo-900/30 inline-block px-2 py-1 rounded">👉 초보자는 기본값 그대로 사용해도 됩니다</p>
                </div>
              </li>
            </ol>

            {/* Security Warning */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-5">
              <h4 className="font-extrabold text-red-700 dark:text-red-400 mb-3 flex items-center gap-2 text-base md:text-lg">
                <span className="text-xl">🔐</span> API KEY 보안 주의사항 (아주 중요)
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm md:text-base text-red-800 dark:text-red-200 font-medium">
                <li className="flex items-center gap-2"><span className="text-red-600 font-bold">❌</span> 깃허브에 올리지 말기</li>
                <li className="flex items-center gap-2"><span className="text-red-600 font-bold">❌</span> 스크린샷 공유 금지</li>
                <li className="flex items-center gap-2"><span className="text-red-600 font-bold">❌</span> 공개 채팅에 붙여넣기 금지</li>
                <li className="flex items-center gap-2"><span className="text-green-600 font-bold">✅</span> 환경변수로만 사용</li>
              </ul>
            </div>

            {/* FAQ */}
            <div className="bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-200 dark:border-indigo-900/30 rounded-xl p-5">
              <h4 className="font-extrabold text-indigo-800 dark:text-indigo-300 mb-4 flex items-center gap-2 text-base md:text-lg">
                <span className="text-xl">🟢</span> 자주 묻는 질문
              </h4>
              <div className="space-y-4 text-sm md:text-base">
                <div>
                  <p className="font-bold text-indigo-900 dark:text-indigo-100 mb-1">Q. 결제 필요해요?</p>
                  <p className="text-indigo-800 dark:text-indigo-200 pl-4 border-l-4 border-indigo-200 dark:border-indigo-700 font-medium">
                     기본 사용은 무료 한도 있음<br/>
                     많이 쓰면 결제 설정 필요할 수 있음
                  </p>
                </div>
                <div>
                  <p className="font-bold text-indigo-900 dark:text-indigo-100 mb-1">Q. Gemini 모델도 이 키로 되나요?</p>
                  <p className="text-indigo-800 dark:text-indigo-200 pl-4 border-l-4 border-indigo-200 dark:border-indigo-700 font-medium">
                     ✅ 네, AI Studio API KEY = Gemini API KEY
                  </p>
                </div>
              </div>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem title="AI Studio API KEY 결제 설정 방법 (초급자용)" delay={0.2}>
          <p className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800 text-yellow-900 dark:text-yellow-100 text-base font-medium flex items-start gap-3 shadow-sm">
            <Lightbulb className="w-5 h-5 mt-0.5 shrink-0 text-yellow-600 dark:text-yellow-400" />
            무료 할당량을 초과하여 사용하거나 안정적인 속도를 원할 경우 설정합니다.
          </p>
          
          <ol className="list-none space-y-6">
             <li className="relative pl-8">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">1.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 text-lg">Google AI Studio 접속</strong>
                  <p className="text-base text-slate-700 dark:text-slate-300">
                     <span className="font-bold text-slate-900 dark:text-white">Google AI Studio</span>에 접속 후 구글 계정으로 로그인합니다.<br/>
                     화면에서 API Key를 생성합니다 (이미 있으면 그대로 사용)
                  </p>
                  <p className="text-sm text-indigo-700 dark:text-indigo-300 mt-2 font-bold">👉 이 단계에서는 결제 설정이 아직 안 됨</p>
                </div>
             </li>
             
             <li className="relative pl-8">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">2.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 text-lg">Google Cloud Console 접속</strong>
                  <p className="text-base text-slate-700 dark:text-slate-300 mb-2">AI Studio API는 구글 클라우드 결제를 사용합니다.</p>
                  <ul className="text-base text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5 marker:text-slate-400">
                     <li><a href="https://console.cloud.google.com/" target="_blank" className="underline hover:text-indigo-500 font-semibold">Google Cloud Console</a> 접속</li>
                     <li>AI Studio와 같은 구글 계정으로 로그인</li>
                     <li>상단에서 AI Studio에서 사용 중인 <strong>프로젝트 선택</strong></li>
                  </ul>
                </div>
             </li>

             <li className="relative pl-8">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">3.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 flex items-center gap-2 text-lg">
                     결제 계정 연결 (가장 중요) <CreditCard className="w-5 h-5 text-indigo-500"/>
                  </strong>
                  <ul className="text-base text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5 marker:text-slate-400">
                     <li>왼쪽 메뉴 → <strong>결제 (Billing)</strong></li>
                     <li>결제 계정 연결 클릭 (없으면 새 계정 만들기)</li>
                     <li>해외결제 가능한 카드 정보 입력 (체크/신용)</li>
                  </ul>
                  <div className="mt-3 bg-indigo-50 dark:bg-indigo-900/20 p-3 rounded-lg text-sm text-indigo-800 dark:text-indigo-200 font-medium">
                     👉 카드 등록 = 자동 결제 승인<br/>
                     👉 사용한 만큼만 과금됨 (Pay-as-you-go)
                  </div>
                </div>
             </li>

             <li className="relative pl-8">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">4.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 text-lg">API 사용 가능 상태 확인</strong>
                  <p className="text-base text-slate-700 dark:text-slate-300">
                     Google Cloud Console → 결제 메뉴에서 상태가 <strong>[활성]</strong>이면 정상입니다.<br/>
                     이제 AI Studio API를 제한 없이(요금제 내에서) 사용할 수 있습니다.
                  </p>
                </div>
             </li>

             <li className="relative pl-8">
                <span className="absolute left-0 top-0 text-indigo-600 dark:text-indigo-400 font-extrabold text-lg">5.</span>
                <div>
                  <strong className="text-slate-900 dark:text-white block mb-1 flex items-center gap-2 text-lg">
                     요금 폭탄 방지 설정 (강력 추천) <AlertTriangle className="w-5 h-5 text-orange-500"/>
                  </strong>
                  <ul className="text-base text-slate-700 dark:text-slate-300 space-y-1 list-disc pl-5 marker:text-slate-400">
                     <li>결제 메뉴 → <strong>예산 및 알림</strong></li>
                     <li>예산 생성 (예: 월 10,000원)</li>
                     <li>50%, 80%, 100% 도달 시 알림 설정</li>
                  </ul>
                  <p className="text-sm text-orange-700 dark:text-orange-300 mt-2 font-bold">👉 실수로 과도하게 과금되는 것을 방지할 수 있습니다.</p>
                </div>
             </li>
          </ol>

          <div className="mt-8 bg-green-50 dark:bg-green-900/10 border border-green-200 dark:border-green-800 rounded-xl p-5 shadow-sm">
             <h4 className="font-extrabold text-green-800 dark:text-green-300 mb-3 flex items-center gap-2 text-base md:text-lg">
                <CheckCircle2 className="w-6 h-6"/> 꼭 알아야 할 핵심 정리
             </h4>
             <ul className="space-y-2 text-base text-green-900 dark:text-green-100 font-semibold">
                <li className="flex items-center gap-2"><span className="text-green-600">✅</span> API Key 발급 ≠ 결제 완료</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✅</span> Google Cloud 결제 연결 필수</li>
                <li className="flex items-center gap-2"><span className="text-green-600">✅</span> 사용한 만큼만 과금 (종량제)</li>
             </ul>
          </div>
        </AccordionItem>

        <AccordionItem title="Google Gemini API 모델별 비용 및 과금 가이드" delay={0.3}>
           <div className="space-y-8">
              <div className="bg-slate-50 dark:bg-slate-900/50 p-5 rounded-xl text-base text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 font-medium">
                Google Gemini API는 <strong className="text-indigo-700 dark:text-indigo-400">'입력(Input) 데이터'</strong>와 <strong className="text-indigo-700 dark:text-indigo-400">'출력(Output) 결과물'</strong>에 대해 각각 과금하며, 특히 텍스트, 이미지, 오디오 등 데이터의 성격에 따라 단가가 다르게 책정됩니다.
              </div>

              {/* 1. Text & Reasoning */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg md:text-xl">
                  <span className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg text-indigo-600 dark:text-indigo-400"><BookOpen className="w-5 h-5"/></span>
                  1. 텍스트 및 추론 (Text & Reasoning)
                </h4>
                <p className="text-base text-slate-600 dark:text-slate-400 mb-3 font-medium">가사 생성 및 아이디어 기획에 사용되는 핵심 모델군입니다.</p>
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <table className="w-full text-base text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                      <tr>
                        <th className="p-4">모델명</th>
                        <th className="p-4">주요 사용처</th>
                        <th className="p-4">입력 비용<br/><span className="text-xs font-normal opacity-80">(100만 토큰당)</span></th>
                        <th className="p-4">출력 비용<br/><span className="text-xs font-normal opacity-80">(100만 토큰당)</span></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700">
                      <tr className="bg-white dark:bg-slate-900/30">
                        <td className="p-4 font-bold text-indigo-700 dark:text-indigo-400">Gemini 3 Pro</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">메인 가사 생성<br/><span className="text-sm text-slate-500 dark:text-slate-500 font-medium">(Thinking 적용)</span></td>
                        <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">$2.00</td>
                        <td className="p-4 font-bold text-red-600 dark:text-red-400">$12.00</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-800/30">
                        <td className="p-4 font-bold text-slate-800 dark:text-slate-200">Gemini 3 Flash</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">컨셉 기획, 가사 변형</td>
                        <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">$0.50</td>
                        <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">$3.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 text-sm bg-yellow-50 dark:bg-yellow-900/10 p-4 rounded-lg text-yellow-900 dark:text-yellow-100 border border-yellow-200 dark:border-yellow-800/50 font-medium">
                  <strong>Thinking Budget 유의사항:</strong> 메인 가사 생성 시 모델이 논리적으로 추론하는 '생각 토큰'은 출력 비용($12.00/1M)으로 산정됩니다. 고품질 가사 한 곡당 약 2,000~3,000 토큰이 소모될 수 있습니다.
                </div>
              </div>

              {/* 2. Image Generation */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg md:text-xl">
                  <span className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400"><ImageIcon className="w-5 h-5"/></span>
                  2. 이미지 생성 (Image Generation)
                </h4>
                <p className="text-base text-slate-600 dark:text-slate-400 mb-3 font-medium">앨범 커버 제작에 사용되는 'Na Banana' 엔진 기반 모델입니다.</p>
                <div className="overflow-x-auto rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <table className="w-full text-base text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                      <tr>
                        <th className="p-4">모델명</th>
                        <th className="p-4">모드</th>
                        <th className="p-4">장당 예상 비용</th>
                        <th className="p-4">특이사항</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-700 border-b border-slate-200 dark:border-slate-700">
                      <tr className="bg-white dark:bg-slate-900/30">
                        <td className="p-4 font-bold text-purple-700 dark:text-purple-400">Gemini 3 Pro Image</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">Art 탭 (Pro 모드)</td>
                        <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">$0.134 ~ $0.150</td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-medium">고해상도, 정교한 텍스트 렌더링</td>
                      </tr>
                      <tr className="bg-slate-50 dark:bg-slate-800/30">
                        <td className="p-4 font-bold text-slate-800 dark:text-slate-200">Gemini 2.5 Flash Image</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">Art 탭 (Fast 모드)</td>
                        <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">$0.039</td>
                        <td className="p-4 text-sm text-slate-600 dark:text-slate-400 font-medium">빠른 생성, 시안 확인용</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-2 text-sm text-slate-600 dark:text-slate-400 pl-3 border-l-4 border-purple-200 dark:border-purple-800 ml-1 font-medium">
                  * 이미지 생성은 토큰 단위가 아닌 <strong>'생성된 이미지 1장당'</strong> 고정 비용이 발생하므로 예산 관리가 용이합니다.
                </div>
              </div>

              {/* 3. Audio Analysis */}
              <div>
                <h4 className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-3 text-lg md:text-xl">
                  <span className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400"><Music className="w-5 h-5"/></span>
                  3. 오디오 분석 (Audio Analysis)
                </h4>
                <div className="overflow-x-auto mb-3 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
                  <table className="w-full text-base text-left border-collapse">
                    <thead className="bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold">
                      <tr>
                        <th className="p-4">모델명</th>
                        <th className="p-4">사용처</th>
                        <th className="p-4">입력 비용 (1M)</th>
                        <th className="p-4">출력 비용 (1M)</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="bg-white dark:bg-slate-900/30 border-b border-slate-200 dark:border-slate-700">
                        <td className="p-4 font-bold text-green-700 dark:text-green-400">Gemini 2.5 Flash</td>
                        <td className="p-4 text-slate-700 dark:text-slate-300">사운드 탭<br/><span className="text-sm text-slate-500 dark:text-slate-500 font-medium">(BPM 분석)</span></td>
                        <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">$1.00</td>
                        <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">$0.60</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="text-sm bg-slate-100 dark:bg-slate-800 p-4 rounded-lg text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-medium">
                  <strong className="block mb-1 text-slate-900 dark:text-white">🎵 오디오 토큰 계산</strong>
                  오디오 파일은 텍스트보다 훨씬 많은 토큰을 소모합니다. (1분당 약 6,000~10,000 토큰)<br/>
                  3분 내외의 곡을 분석할 때 약 $0.02 ~ $0.03 (약 30~40원) 정도가 소모됩니다.
                </div>
              </div>

              {/* 4. Insights */}
              <div className="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 border border-indigo-200 dark:border-indigo-900/30 rounded-xl p-6 shadow-sm">
                <h4 className="font-extrabold text-slate-900 dark:text-white mb-5 flex items-center gap-2 text-lg">
                  <span className="text-2xl">💡</span> 요약 및 운영 인사이트
                </h4>
                <ul className="space-y-4 text-base">
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-extrabold text-sm shadow-sm border border-indigo-200 dark:border-indigo-800 shrink-0">1</span>
                    <span className="text-slate-700 dark:text-slate-200 leading-tight pt-0.5">
                      <strong className="text-indigo-800 dark:text-indigo-300">가장 경제적인 사용법:</strong> 아이디어 구상이나 간단한 프롬프트 생성에는 <strong>Flash</strong> 모델을 적극 활용하세요. (Pro 대비 약 4배 저렴)
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-red-600 dark:text-red-400 font-extrabold text-sm shadow-sm border border-red-200 dark:border-red-900 shrink-0">2</span>
                    <span className="text-slate-700 dark:text-slate-200 leading-tight pt-0.5">
                      <strong className="text-red-800 dark:text-red-300">가장 높은 비용 발생 구간:</strong> <strong>Gemini 3 Pro Image (Pro 모드)</strong>를 통한 앨범 아트 생성이 가장 단가가 높습니다. 확정된 디자인에만 Pro 모드를 사용하는 것이 효율적입니다.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="w-6 h-6 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-400 font-extrabold text-sm shadow-sm border border-slate-300 dark:border-slate-700 shrink-0">3</span>
                    <span className="text-slate-700 dark:text-slate-200 leading-tight pt-0.5">
                      <strong className="text-slate-900 dark:text-white">가사 품질 vs 비용:</strong> 메인 가사 생성 시 <code>thinkingBudget</code>을 높게 잡을수록 품질은 올라가지만 출력 토큰 비용이 선형적으로 증가합니다.
                    </span>
                  </li>
                </ul>
              </div>
           </div>
        </AccordionItem>
      </div>
    </section>
  );
};

export default ApiGuideSection;