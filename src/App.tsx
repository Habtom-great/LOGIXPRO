/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { 
  Cpu, 
  Settings, 
  Layers, 
  Zap, 
  BookOpen, 
  ClipboardList, 
  ShieldCheck, 
  Activity, 
  Box, 
  Radio, 
  ChevronRight, 
  Menu, 
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  Play,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SECTIONS, EXERCISES } from './content';
import { SectionContent, Exercise, QuizQuestion, ChatMessage } from './types';

const UI_STRINGS = {
  EN: {
    mainModules: "Main Modules",
    practice: "Practice & Professional",
    ladderExercises: "100 Ladder Exercises",
    projects: "Real-world Projects",
    career: "Career Path & Interview",
    guestEngineer: "Guest Engineer",
    systemReady: "System Ready",
    careerGuide: "Career Transition & Mastering Industrial Automation",
    skillsHeader: "Marketable Industrial Skills",
    interviewQ: "Common Interview Questions"
  },
  AM: {
    mainModules: "ዋና ሞጁሎች",
    practice: "ተግባራዊ እና ሙያዊ",
    ladderExercises: "100 የላደር ልምምዶች",
    projects: "ተግባራዊ ፕሮጀክቶች",
    career: "የሙያ መንገድ እና ቃለ መጠይቅ",
    guestEngineer: "እንግዳ መሃንዲስ",
    systemReady: "ስርዓቱ ዝግጁ ነው",
    careerGuide: "የሙያ ለውጥ እና የኢንዱስትሪ አውቶሜሽን ትምህርት",
    skillsHeader: "ተፈላጊ የኢንዱስትሪ ችሎታዎች",
    interviewQ: "ተደጋጋሚ የቃለ መጠይቅ ጥያቄዎች"
  }
};

// Custom components
const SidebarItem = ({ 
  icon: Icon, 
  label, 
  isActive, 
  onClick 
}: { 
  icon: any, 
  label: string, 
  isActive: boolean, 
  onClick: () => void,
  key?: React.Key
}) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all duration-200 border-r-4 ${
      isActive 
        ? 'bg-zinc-800 text-orange-500 border-orange-500' 
        : 'text-zinc-400 border-transparent hover:bg-zinc-800 hover:text-zinc-200'
    }`}
  >
    <Icon size={18} />
    <span className="truncate">{label}</span>
  </button>
);

const LadderExample = ({ 
  title, 
  titleAm,
  logic, 
  description,
  descriptionAm,
  language
}: { 
  title: string, 
  titleAm?: string,
  logic: string, 
  description: string,
  descriptionAm?: string,
  language: 'EN' | 'AM',
  key?: React.Key 
}) => (
  <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 my-6 font-mono overflow-x-auto">
    <div className="flex items-center justify-between mb-4">
      <h4 className="text-orange-400 text-sm font-bold uppercase tracking-wider">
        {language === 'AM' && titleAm ? titleAm : title}
      </h4>
      <Activity size={16} className="text-zinc-600" />
    </div>
    <div className="text-zinc-300 whitespace-pre text-sm leading-relaxed mb-4 border-l-2 border-orange-500/30 pl-4 py-2">
      {logic}
    </div>
    <p className="text-zinc-500 text-xs font-sans italic">
      {language === 'AM' && descriptionAm ? descriptionAm : description}
    </p>
  </div>
);

const Quiz = ({ quiz, language }: { quiz: QuizQuestion[], language: 'EN' | 'AM' }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleNext = () => {
    setSelectedOption(null);
    setIsSubmitted(false);
    if (currentQuestion < quiz.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handleSubmit = () => {
    if (selectedOption === quiz[currentQuestion].correctAnswer) {
      setScore(prev => prev + 1);
    }
    setIsSubmitted(true);
  };

  return (
    <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-8 my-10">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle size={20} className="text-orange-500" />
        <h3 className="text-lg font-bold text-zinc-100">
          {language === 'AM' ? 'የክፍል ግምገማ' : 'Section Assessment'}
        </h3>
        <span className="ml-auto text-xs text-zinc-500">
          {language === 'AM' ? 'ጥያቄ' : 'Question'} {currentQuestion + 1} {language === 'AM' ? 'ከ' : 'of'} {quiz.length}
        </span>
      </div>

      <p className="text-zinc-200 mb-8 text-lg">
        {language === 'AM' && quiz[currentQuestion].questionAm ? quiz[currentQuestion].questionAm : quiz[currentQuestion].question}
      </p>

      <div className="space-y-3">
        {(language === 'AM' && quiz[currentQuestion].optionsAm ? quiz[currentQuestion].optionsAm : quiz[currentQuestion].options).map((opt, idx) => (
          <button
            key={idx}
            disabled={isSubmitted}
            onClick={() => setSelectedOption(idx)}
            className={`w-full text-left p-4 rounded-lg border transition-all ${
              selectedOption === idx 
                ? 'bg-orange-500/10 border-orange-500 text-orange-200' 
                : 'bg-zinc-800/50 border-zinc-700 text-zinc-400 hover:border-zinc-500'
            } ${
              isSubmitted && idx === quiz[currentQuestion].correctAnswer 
                ? 'bg-green-500/10 border-green-500 text-green-200' 
                : ''
            } ${
              isSubmitted && selectedOption === idx && idx !== quiz[currentQuestion].correctAnswer 
                ? 'bg-red-500/10 border-red-500 text-red-200' 
                : ''
            }`}
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between">
        {!isSubmitted ? (
          <button
            disabled={selectedOption === null}
            onClick={handleSubmit}
            className="px-6 py-2 bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold rounded-lg transition-colors"
          >
            {language === 'AM' ? 'መልስን አረጋግጥ' : 'Check Answer'}
          </button>
        ) : (
          <div className="flex-1">
            <p className="text-sm text-zinc-400 mb-4">
              {language === 'AM' && quiz[currentQuestion].explanationAm ? quiz[currentQuestion].explanationAm : quiz[currentQuestion].explanation}
            </p>
            {currentQuestion < quiz.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-zinc-700 hover:bg-zinc-600 text-white font-bold rounded-lg transition-colors flex items-center gap-2"
              >
                {language === 'AM' ? 'ቀጣይ ጥያቄ' : 'Next Question'} <ChevronRight size={18} />
              </button>
            ) : (
              <div className="p-4 bg-orange-500/10 border border-orange-500 rounded-lg flex items-center gap-4">
                <CheckCircle2 className="text-orange-500" />
                <div>
                  <p className="font-bold text-orange-200">{language === 'AM' ? 'ተጠናቋል!' : 'Quiz Completed!'}</p>
                  <p className="text-sm text-orange-200/70">{language === 'AM' ? 'ውጤት' : 'Your score'}: {score} / {quiz.length}</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

import { askExpert, playAudio } from './services/aiMentor';

const FloatingChat = ({ 
  onSendMessage, 
  isProcessing,
  aiHistory,
  setAiHistory
}: { 
  onSendMessage: (msg: string) => void, 
  isProcessing: boolean,
  aiHistory: ChatMessage[],
  setAiHistory: React.Dispatch<React.SetStateAction<ChatMessage[]>>
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [listenLang, setListenLang] = useState<'en-US' | 'am-ET'>('en-US');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [aiHistory]);

  const toggleListen = () => {
    if (!('webkitSpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser. Please use Chrome.');
      return;
    }
    const SpeechRecognition = (window as any).webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = listenLang;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onstart = () => setIsListening(true);
    recognition.onend = () => setIsListening(false);
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      if (transcript.trim()) {
        setMessage('');
        onSendMessage(transcript);
      }
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error);
      setIsListening(false);
    };

    recognition.start();
  };

  const VoiceWave = () => (
    <div className="flex items-center gap-1 h-4">
      {[0.2, 0.4, 0.6, 0.4, 0.2].map((delay, i) => (
        <motion.div
          key={i}
          animate={{ height: ['4px', '12px', '4px'] }}
          transition={{ repeat: Infinity, duration: 0.8, delay }}
          className="w-1 bg-orange-500 rounded-full"
        />
      ))}
    </div>
  );

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="w-80 md:w-96 h-[500px] bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            <div className="p-4 bg-zinc-900 border-b border-zinc-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${isListening ? 'bg-red-500 animate-ping' : 'bg-orange-500 animate-pulse'}`}></div>
                <div className="flex flex-col">
                  <h3 className="text-xs font-bold text-white uppercase tracking-wider leading-none">PLC Expert AI</h3>
                  {isListening && <span className="text-[10px] text-red-500 font-bold uppercase mt-1">Listening...</span>}
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide relative">
              {isListening && (
                <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                  <div className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 flex flex-col items-center gap-4 shadow-2xl">
                    <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                      <Radio size={32} className="text-red-500 animate-pulse" />
                    </div>
                    <p className="text-white font-bold text-sm">Speak Now</p>
                    <VoiceWave />
                  </div>
                </div>
              )}
              {aiHistory.length === 0 && (
                <div className="text-center py-10">
                  <Cpu size={40} className="mx-auto text-zinc-800 mb-4" />
                  <p className="text-zinc-500 text-xs px-6 font-medium italic">
                    Ask me anything about PLCs, ladder logic, or industry standards in English or Amharic (አማርኛ).
                  </p>
                </div>
              )}
              {aiHistory.map((h, i) => (
                <div key={i} className={`flex ${h.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`group relative max-w-[85%] p-3 rounded-xl text-sm ${
                    h.role === 'user' 
                      ? 'bg-orange-500 text-black font-medium' 
                      : 'bg-zinc-800 text-zinc-200 border border-zinc-700'
                  }`}>
                    {h.text}
                    {h.role === 'ai' && h.audio && (
                      <button 
                        onClick={() => playAudio(h.audio!)}
                        className="absolute -right-8 top-1 p-1 text-zinc-600 hover:text-orange-500 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Radio size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
              {isProcessing && (
                <div className="flex justify-start">
                  <div className="bg-zinc-800 p-3 rounded-xl flex items-center gap-1">
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={(e) => {
              e.preventDefault();
              if (!message.trim() || isProcessing) return;
              const userMsg = message;
              setMessage('');
              onSendMessage(userMsg);
            }} className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <button 
                  type="button"
                  onClick={() => setListenLang(prev => prev === 'en-US' ? 'am-ET' : 'en-US')}
                  className="px-2 py-1 bg-zinc-800 rounded text-[10px] font-bold text-zinc-400 hover:text-orange-500 transition-colors"
                >
                  {listenLang === 'en-US' ? 'EN' : 'አማ'}
                </button>
                <div className="flex-1 px-3 py-2 bg-zinc-800 rounded-lg flex items-center gap-2 border border-transparent focus-within:border-orange-500/50">
                  <input 
                    type="text" 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={listenLang === 'en-US' ? "Ask expert..." : "ባለሙያውን ይጠይቁ..."}
                    className="flex-1 bg-transparent border-none text-sm text-white focus:ring-0 outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={toggleListen}
                    className={`transition-colors ${isListening ? 'text-red-500' : 'text-zinc-500 hover:text-white'}`}
                  >
                    <Radio size={16} className={isListening ? 'animate-pulse' : ''} />
                  </button>
                </div>
                <button type="submit" disabled={!message.trim() || isProcessing} className="p-2 bg-orange-500 text-black rounded-lg disabled:opacity-50 hover:bg-orange-400">
                  <Play size={18} fill="currentColor" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-orange-500 text-black rounded-full shadow-[0_0_30px_rgba(249,115,22,0.3)] flex items-center justify-center hover:scale-105 transition-all group relative pointer-events-auto"
      >
        <div className="absolute inset-0 rounded-full bg-orange-500 animate-ping opacity-20 pointer-events-none group-hover:hidden"></div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 rounded-full border-2 border-zinc-950 flex items-center justify-center text-[9px] font-black text-white shadow-lg">AI</div>
        <Cpu size={24} className="group-hover:rotate-12 transition-transform" />
      </button>
    </div>
  );
};

const ExerciseModal = ({ 
  exercise, 
  onClose,
  language
}: { 
  exercise: Exercise, 
  onClose: () => void,
  language: 'EN' | 'AM'
}) => {
  const [showSolution, setShowSolution] = useState(false);

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-zinc-950 border border-zinc-800 rounded-3xl w-full max-w-2xl overflow-hidden shadow-2xl"
      >
        <div className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                exercise.difficulty === 'Beginner' ? 'border-green-500/30 text-green-500' :
                exercise.difficulty === 'Intermediate' ? 'border-blue-500/30 text-blue-500' :
                'border-red-500/30 text-red-500'
              } uppercase tracking-widest`}>
                {exercise.difficulty}
              </span>
              <h2 className="text-xl font-bold text-white">
                {language === 'AM' ? 'መልመጃ' : 'Exercise'} #{exercise.id.toString().padStart(3, '0')}
              </h2>
            </div>
            <button onClick={onClose} className="text-zinc-500 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <h3 className="text-lg font-bold text-zinc-100 mb-4">
            {language === 'AM' && exercise.titleAm ? exercise.titleAm : exercise.title}
          </h3>
          <p className="text-zinc-400 mb-8 leading-relaxed">
            {language === 'AM' && exercise.descriptionAm ? exercise.descriptionAm : exercise.description}
          </p>

          <div className="space-y-4">
            <div className="p-4 bg-zinc-900/50 border border-zinc-800 rounded-xl">
              <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-2">
                {language === 'AM' ? 'ቴክኒካዊ ፍንጭ' : 'Technical Hint'}
              </h4>
              <p className="text-zinc-400 text-sm italic">
                {language === 'AM' && exercise.hintAm ? exercise.hintAm : exercise.hint}
              </p>
            </div>

            {showSolution ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 bg-zinc-900 border border-orange-500/30 rounded-xl"
              >
                <h4 className="text-xs font-bold text-orange-500 uppercase tracking-widest mb-4">
                  {language === 'AM' ? 'ይፋዊ መፍትሄ' : 'Official Solution'}
                </h4>
                <pre className="font-mono text-zinc-200 text-sm whitespace-pre-wrap bg-black/50 p-4 rounded-lg border border-zinc-800">
                  {language === 'AM' && exercise.solutionAm ? exercise.solutionAm : exercise.solution}
                </pre>
              </motion.div>
            ) : (
              <button 
                onClick={() => setShowSolution(true)}
                className="w-full py-4 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold rounded-xl transition-all flex items-center justify-center gap-2"
              >
                <CheckCircle2 size={18} className="text-orange-500" />
                {language === 'AM' ? 'ትክክለኛውን ሎጂክ አሳይ' : 'Reveal Correct Logic'}
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [activeSectionId, setActiveSectionId] = useState(SECTIONS[0].id);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [view, setView] = useState<'content' | 'exercises' | 'career'>('content');
  const [isAILoading, setIsAILoading] = useState(false);
  const [aiHistory, setAiHistory] = useState<ChatMessage[]>([]);
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);
  const [language, setLanguage] = useState<'EN' | 'AM'>('EN');

  const handleAIMessage = async (msg: string) => {
    setIsAILoading(true);
    const newUserMsg: ChatMessage = { role: 'user', text: msg };
    setAiHistory(prev => [...prev, newUserMsg]);
    
    try {
      const result = await askExpert(msg, aiHistory);
      const newAiMsg: ChatMessage = { role: 'ai', text: result.text, audio: result.audio };
      setAiHistory(prev => [...prev, newAiMsg]);
      if (result.audio) {
        playAudio(result.audio);
      }
    } catch (err) {
      console.error(err);
      setAiHistory(prev => [...prev, { role: 'ai', text: "Expert is currently offline. Please check your credentials." }]);
    } finally {
      setIsAILoading(false);
    }
  };

  const filteredExercises = useMemo(() => {
    return EXERCISES.filter(ex => 
      ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      ex.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const activeSection = SECTIONS.find(s => s.id === activeSectionId) || SECTIONS[0];

  return (
    <div className="flex h-screen bg-black text-zinc-300 font-sans selection:bg-orange-500 selection:text-black">
      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-72 bg-zinc-950 border-r border-zinc-800 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:block
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          <div className="p-6 border-bottom border-zinc-800">
            <div className="flex items-center gap-2 mb-2">
              <div className="p-1.5 bg-orange-500 rounded text-black">
                <Cpu size={24} strokeWidth={2.5} />
              </div>
              <h1 className="text-xl font-black text-white tracking-tighter uppercase italic">
                LOGIX<span className="text-orange-500">PRO</span>
              </h1>
            </div>
            <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">Industrial Training v1.0</p>
          </div>

          <nav className="flex-1 overflow-y-auto py-4 scrollbar-hide">
            <div className="px-6 mb-4">
              <div className="p-1 bg-zinc-900 border border-zinc-800 rounded-lg flex items-center gap-1">
                <button 
                  onClick={() => setLanguage('EN')}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded transition-all ${
                    language === 'EN' 
                    ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
                    : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  ENGLISH
                </button>
                <button 
                  onClick={() => setLanguage('AM')}
                  className={`flex-1 py-1.5 text-[9px] font-black rounded transition-all font-sans ${
                    language === 'AM' 
                    ? 'bg-orange-500 text-black shadow-[0_0_15px_rgba(249,115,22,0.4)]' 
                    : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  አማርኛ
                </button>
              </div>
            </div>

            <div className="px-6 mb-2">
              <span className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">
                {UI_STRINGS[language].mainModules}
              </span>
            </div>
            {SECTIONS.map((section) => (
              <SidebarItem
                key={section.id}
                icon={BookOpen}
                label={language === 'AM' && section.titleAm ? section.titleAm : section.title}
                isActive={view === 'content' && activeSectionId === section.id}
                onClick={() => {
                  setView('content');
                  setActiveSectionId(section.id);
                  setMobileMenuOpen(false);
                }}
              />
            ))}
            
            <div className="px-6 mt-8 mb-2">
              <span className="text-[10px] font-bold uppercase text-zinc-600 tracking-widest">
                {UI_STRINGS[language].practice}
              </span>
            </div>
            <SidebarItem
              icon={ClipboardList}
              label={UI_STRINGS[language].ladderExercises}
              isActive={view === 'exercises'}
              onClick={() => { 
                setView('exercises');
                setMobileMenuOpen(false);
              }}
            />
            <SidebarItem
              icon={Activity}
              label={UI_STRINGS[language].projects}
              isActive={false} // Placeholder
              onClick={() => {}}
            />
            <SidebarItem
              icon={ArrowRight}
              label={UI_STRINGS[language].career}
              isActive={view === 'career'}
              onClick={() => {
                setView('career');
                setMobileMenuOpen(false);
              }}
            />
          </nav>

          <div className="p-6 mt-auto border-t border-zinc-900 bg-zinc-950/50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400 font-bold text-[10px]">
                {language === 'EN' ? 'ENG' : 'አማ'}
              </div>
              <div>
                <p className="text-xs font-bold text-zinc-100">{UI_STRINGS[language].guestEngineer}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <p className="text-[10px] text-zinc-500 font-medium">{UI_STRINGS[language].systemReady}</p>
                </div>
              </div>
              <Settings size={18} className="ml-auto text-zinc-600 hover:text-zinc-400 cursor-pointer" />
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 bg-black overflow-hidden relative">
        {/* Header */}
        <header className="h-20 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-900 px-6 flex items-center justify-between sticky top-0 z-30">
          <button 
            className="lg:hidden p-2 text-zinc-400 hover:text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>

          <div className="flex-1 max-w-xl mx-4 relative hidden md:block">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input 
              type="text" 
              placeholder={language === 'AM' ? "ምዕራፎችን፣ ሴንሰሮችን ወይም ትዕዛዞችን ይፈልጉ..." : "Search chapters, sensors, or commands..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg py-2 pl-10 pr-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:border-orange-500/50 transition-colors"
            />
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
              <Zap size={12} className="text-orange-500" />
              Pro Mode Active
            </div>
            <button className="p-2 text-zinc-400 hover:text-white relative">
              <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-zinc-950"></div>
              <HelpCircle size={20} />
            </button>
          </div>
        </header>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto scroll-smooth">
          <AnimatePresence mode="wait">
            {view === 'content' && (
              <motion.div
                key={activeSection.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto px-8 py-12"
              >
                <div className="mb-12">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1 bg-orange-500/10 text-orange-500 text-[10px] font-black uppercase tracking-widest rounded border border-orange-500/20">
                      Training Module
                    </span>
                    <div className="h-px flex-1 bg-zinc-800/50"></div>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-white italic tracking-tighter mb-4 leading-none">
                    {language === 'AM' && activeSection.titleAm ? activeSection.titleAm : activeSection.title}
                  </h2>
                </div>
 
                <article className="prose prose-invert max-w-none prose-orange prose-headings:italic prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-zinc-100 prose-p:text-zinc-400 prose-p:leading-relaxed prose-strong:text-orange-400 prose-li:text-zinc-400 prose-table:border prose-table:border-zinc-800 prose-th:bg-zinc-900 prose-th:p-4 prose-td:p-4 opacity-100">
                  <div className="space-y-6">
                    {/* Render markdown-ish content */}
                    {(language === 'AM' && activeSection.contentAm ? activeSection.contentAm : activeSection.content).split('\n').map((line, i) => {
                      if (line.startsWith('###')) return <h3 key={i} className="text-2xl mt-10 mb-4">{line.replace('###', '').trim()}</h3>;
                      if (line.startsWith('##')) return <h2 key={i} className="text-3xl mt-12 mb-6">{line.replace('##', '').trim()}</h2>;
                      if (line.startsWith('-')) return <li key={i} className="ml-4 mb-2">{line.replace('-', '').trim()}</li>;
                      if (line.trim() === '') return <div key={i} className="h-4"></div>;
                      if (line.startsWith('|')) {
                        // Very basic table parser for the sake of demo
                        return null; // Handle separately if needed
                      }
                      return <p key={i}>{line}</p>;
                    })}
                  </div>
                </article>
 
                {activeSection.examples?.map((ex, idx) => (
                  <LadderExample key={idx} {...ex} language={language} />
                ))}
 
                {activeSection.quiz && <Quiz quiz={activeSection.quiz} language={language} />}
 
                {/* Progress Footer */}
                <div className="mt-20 pt-12 border-t border-zinc-900 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em] mb-2">{language === 'AM' ? 'ቀጣይ ምዕራፍ' : 'Next Chapter'}</p>
                    <h5 className="text-lg font-black text-zinc-300 italic">{language === 'AM' ? 'PLC ሃርድዌር እና አርክቴክቸር' : 'PLC Hardware & Architecture'}</h5>
                  </div>
                  <button className="flex items-center gap-3 px-8 py-4 bg-orange-500 text-black font-black uppercase italic tracking-tighter rounded-xl hover:bg-orange-400 transition-all hover:scale-[1.02] shadow-[0_0_30px_rgba(249,115,22,0.15)]">
                    {language === 'AM' ? 'ትምህርቱን ጀምር' : 'Begin Assessment'} <Play size={20} fill="currentColor" />
                  </button>
                </div>
              </motion.div>
            )}

            {view === 'exercises' && (
              <motion.div
                key="exercises"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-6xl mx-auto px-8 py-12"
              >
                <div className="mb-12">
                  <h2 className="text-5xl font-black text-white italic tracking-tighter mb-4">
                    {language === 'AM' ? '100 በጦርነት የተፈተኑ ልምምዶች' : '100 BATTLE-TESTED EXERCISES'}
                  </h2>
                  <p className="text-zinc-500 max-w-2xl">
                    {language === 'AM' 
                      ? 'ከቀላል ሎጂክ ጌቶች እስከ ውስብስብ የኢንዱስትሪ ቅደም ተከተሎች። እውነተኛ የኢንዱስትሪ ችግሮችን በመፍታት የላደር ሎጂክን ይለማመዱ።' 
                      : 'From simple logic gates to complex industrial sequences. Master ladder logic by solving real industrial problems.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredExercises.map((ex) => (
                    <div key={ex.id} className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-orange-500/50 transition-all group">
                      <div className="flex items-center justify-between mb-4">
                        <span className={`text-[10px] font-black px-2 py-0.5 rounded border ${
                          ex.difficulty === 'Beginner' ? 'border-green-500/30 text-green-500' :
                          ex.difficulty === 'Intermediate' ? 'border-blue-500/30 text-blue-500' :
                          'border-red-500/30 text-red-500'
                        } uppercase tracking-widest`}>
                          {ex.difficulty}
                        </span>
                        <span className="text-zinc-700 font-black text-xl italic group-hover:text-orange-500/20 transition-colors">#{ex.id.toString().padStart(3, '0')}</span>
                      </div>
                      <h3 className="text-zinc-100 font-bold mb-3">
                        {language === 'AM' && ex.titleAm ? ex.titleAm : ex.title}
                      </h3>
                      <p className="text-zinc-400 text-sm mb-6 line-clamp-2">
                        {language === 'AM' && ex.descriptionAm ? ex.descriptionAm : ex.description}
                      </p>
                      <button 
                        onClick={() => setSelectedExercise(ex)}
                        className="w-full py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-xs font-bold uppercase tracking-widest text-zinc-400 hover:bg-orange-500 hover:text-black hover:border-orange-500 transition-all"
                      >
                        {language === 'AM' ? 'ፈተናውን ፍታ' : 'Solve Challenge'}
                      </button>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {view === 'career' && (
              <motion.div
                key="career"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="max-w-4xl mx-auto px-8 py-12"
              >
                <div className="bg-gradient-to-br from-zinc-900 to-black border border-zinc-800 rounded-3xl p-12 overflow-hidden relative">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[100px] pointer-events-none"></div>
                  
                  <ShieldCheck size={64} className="text-orange-500 mb-8" />
                  <h2 className="text-5xl font-black text-white italic tracking-tighter mb-6 leading-none">
                    {language === 'AM' ? <>የአውቶሜሽን ኢንጂነር<br/>የሙያ መንገድ</> : <>THE CAREER OF AN<br/>AUTOMATION ENGINEER</>}
                  </h2>
                  
                  <div className="space-y-8 mt-12">
                    <section>
                      <h4 className="text-orange-500 font-black uppercase text-sm tracking-widest mb-4">
                        {UI_STRINGS[language].skillsHeader}
                      </h4>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {[
                          { en: 'Reading Diagrams', am: 'ዲያግራሞችን ማንበብ' },
                          { en: 'PLC Programming', am: 'PLC ፕሮግራም ማውጣት' },
                          { en: 'HMI/SCADA Design', am: 'HMI/SCADA ዲዛይን' },
                          { en: 'VFD Configuration', am: 'VFD ኮንፊገሬሽን' },
                          { en: 'Industrial Networks', am: 'የኢንዱስትሪ ኔትወርኮች' },
                          { en: 'Troubleshooting', am: 'ብልሽት ፍለጋ' }
                        ].map(skill => (
                          <div key={skill.en} className="bg-zinc-950 border border-zinc-800 p-4 rounded-xl text-zinc-300 font-bold text-sm">
                            {language === 'AM' ? skill.am : skill.en}
                          </div>
                        ))}
                      </div>
                    </section>

                    <section className="bg-zinc-950/50 p-8 border border-zinc-800 rounded-2xl">
                      <h4 className="text-zinc-100 font-bold mb-6 flex items-center gap-2">
                        <ArrowRight size={20} className="text-orange-500" />
                        {UI_STRINGS[language].interviewQ}
                      </h4>
                      <ul className="space-y-4">
                        <li className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                          <p className="text-orange-400 font-bold text-sm mb-1">
                            {language === 'AM' ? 'ጥ: በ Sinking እና Sourcing መካከል ያለው ልዩነት ምንድነው?' : 'Q: What is the difference between Sinking and Sourcing?'}
                          </p>
                          <p className="text-zinc-500 text-xs">
                            {language === 'AM' 
                              ? 'መ: Sinking (NPN) ኢንፑቶች ከጋራ ኔጋቲቭ ጋር ይገናኛሉ፣ Sourcing (PNP) ኢንፑቶች ደግሞ ከጋራ ፖዘቲቭ ጋር ይገናኛሉ።' 
                              : 'A: Sinking (NPN) inputs connect to common negative, Sourcing (PNP) inputs connect to common positive.'}
                          </p>
                        </li>
                        <li className="p-4 bg-zinc-900/50 rounded-lg border border-zinc-800">
                          <p className="text-orange-400 font-bold text-sm mb-1">
                            {language === 'AM' ? 'ጥ: Watchdog Timer ምንድነው?' : 'Q: Explain a Watchdog Timer.'}
                          </p>
                          <p className="text-zinc-500 text-xs">
                            {language === 'AM' 
                              ? 'መ: PLC የስካን ዑደቱን በተወሰነ የጊዜ ገደብ ውስጥ ማጠናቀቁን የሚያረጋግጥ የደህንነት ባህሪ ነው።' 
                              : 'A: A safety feature that ensures the PLC finishes its scan cycle within a specified time limit.'}
                          </p>
                        </li>
                      </ul>
                    </section>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Global HUD Decorations */}
        <div className="fixed bottom-6 left-6 flex flex-col gap-2 pointer-events-none z-40">
          <div className="px-4 py-2 bg-orange-500/10 backdrop-blur-md border border-orange-500/20 rounded-lg flex items-center gap-3">
            <Radio size={14} className="text-orange-500 animate-pulse" />
            <span className="text-[10px] font-bold text-orange-200 uppercase tracking-widest">Live Simulator Ready</span>
          </div>
        </div>
      </main>
      <FloatingChat 
        onSendMessage={handleAIMessage} 
        isProcessing={isAILoading}
        aiHistory={aiHistory}
        setAiHistory={setAiHistory}
      />

      <AnimatePresence>
        {selectedExercise && (
          <ExerciseModal 
            exercise={selectedExercise} 
            onClose={() => setSelectedExercise(null)} 
            language={language}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
