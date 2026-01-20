import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Play, Pause, SkipForward, SkipBack, 
  Volume2, VolumeX, Disc, ListMusic, 
  Minimize2, Upload, FileAudio, Trash2
} from 'lucide-react';

interface Track {
  id: number | string;
  title: string;
  artist: string;
  url: string;
  color: string;
}

interface MusicPlayerProps {
  isAdmin: boolean;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({ isAdmin }) => {
  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [volume, setVolume] = useState(30); // 0-100 scale
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const currentTrack = playlist[currentTrackIndex];

  // --- Event Handlers (HTML5 Audio) ---

  const onAudioEnded = () => {
    // Auto play next track
    if (playlist.length > 0) {
        const nextIndex = (currentTrackIndex + 1) % playlist.length;
        setCurrentTrackIndex(nextIndex);
        // Playback is handled by useEffect when index/track changes
    }
  };

  const onAudioError = () => {
    console.error("Audio File Error");
    setIsPlaying(false);
  };

  // --- Core Logic: Track Switching & Playback ---

  // 1. Handle Track Change
  useEffect(() => {
    if (!audioRef.current) return;

    if (currentTrack) {
        // Load the new source
        audioRef.current.load();
        if (isPlaying) {
            const playPromise = audioRef.current.play();
            if (playPromise !== undefined) {
                playPromise.catch(error => {
                    console.log("Playback prevented or interrupted:", error);
                    setIsPlaying(false);
                });
            }
        }
    } else {
        // Playlist empty or invalid
        audioRef.current.pause();
        setIsPlaying(false);
    }
  }, [currentTrackIndex, currentTrack]); // React to index or track object change

  // 2. Handle Volume Change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // 3. Toggle Play/Pause
  const togglePlay = () => {
    if (!currentTrack || !audioRef.current) return;
    
    if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
    } else {
        const playPromise = audioRef.current.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                setIsPlaying(true);
            }).catch(error => {
                console.error("Play error:", error);
                setIsPlaying(false);
            });
        }
    }
  };

  // --- Playlist Management ---

  const changeTrack = (index: number) => {
    if (index < 0 || index >= playlist.length) return;
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const nextTrack = () => {
    if (playlist.length === 0) return;
    changeTrack((currentTrackIndex + 1) % playlist.length);
  };

  const prevTrack = () => {
    if (playlist.length === 0) return;
    changeTrack((currentTrackIndex - 1 + playlist.length) % playlist.length);
  };

  // --- File Upload Logic ---

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!isAdmin) return; // Guard for admin only
    
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    const newTrack: Track = {
      id: Date.now(), // unique id
      title: file.name.replace(/\.[^/.]+$/, ""), // remove extension
      artist: "Local Upload",
      url: fileUrl,
      color: "from-indigo-500 to-purple-600"
    };

    const newPlaylist = [...playlist, newTrack];
    setPlaylist(newPlaylist);
    
    // Automatically switch to the new track and play
    setCurrentTrackIndex(newPlaylist.length - 1);
    setIsPlaying(true);
    
    // Open playlist to show it
    setShowPlaylist(true);

    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeTrack = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (!isAdmin) return; 

    const newPlaylist = playlist.filter((_, i) => i !== index);
    setPlaylist(newPlaylist);

    if (newPlaylist.length === 0) {
        setIsPlaying(false);
        setCurrentTrackIndex(0);
    } else if (index === currentTrackIndex) {
        // If deleted current track
        if (index >= newPlaylist.length) {
            // Was last track, move to new last
            setCurrentTrackIndex(Math.max(0, newPlaylist.length - 1));
        }
        // If was middle, index stays same but points to next track automatically
    } else if (index < currentTrackIndex) {
        // Deleted previous track, shift index left
        setCurrentTrackIndex(currentTrackIndex - 1);
    }
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start gap-4">
      {/* HTML5 Audio Player */}
      <audio 
        ref={audioRef}
        src={currentTrack?.url}
        onEnded={onAudioEnded}
        onError={onAudioError}
      />

      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept="audio/*"
        className="hidden"
      />

      <AnimatePresence mode="wait">
        {isOpen ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/50 dark:border-slate-700 shadow-2xl rounded-3xl p-5 w-80 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-full bg-gradient-to-br ${currentTrack?.color || 'from-slate-400 to-slate-500'}`}>
                   <FileAudio className="w-3 h-3 text-white" />
                </div>
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tracking-wider">
                  MUSIC PLAYER
                </span>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            </div>

            {/* Visualizer & Info */}
            <div className="flex gap-4 items-center mb-6">
               <motion.div 
                 animate={{ rotate: isPlaying ? 360 : 0 }}
                 transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                 className={`w-16 h-16 rounded-full bg-gradient-to-br ${currentTrack?.color || 'from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800'} shadow-lg flex items-center justify-center shrink-0 border-4 border-white dark:border-slate-800`}
               >
                 <div className="w-4 h-4 bg-white/20 rounded-full backdrop-blur-sm" />
               </motion.div>
               <div className="overflow-hidden flex-1">
                 <h4 className="font-bold text-slate-900 dark:text-white text-lg truncate">
                    {currentTrack ? currentTrack.title : "재생할 곡 없음"}
                 </h4>
                 <p className="text-sm text-slate-500 dark:text-slate-400 truncate">
                    {currentTrack ? currentTrack.artist : (isAdmin ? "파일을 추가해주세요" : "재생 목록이 비었습니다")}
                 </p>
               </div>
            </div>

            {/* Visual Progress Bar */}
            <div className="h-1 bg-slate-100 dark:bg-slate-800 rounded-full mb-6 overflow-hidden">
               {isPlaying && (
                 <motion.div 
                    className={`h-full bg-gradient-to-r ${currentTrack?.color || 'from-indigo-500 to-purple-500'}`}
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                 />
               )}
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center gap-6 mb-6">
              <button onClick={prevTrack} disabled={!currentTrack} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-30">
                <SkipBack className="w-5 h-5 fill-current" />
              </button>
              
              <button 
                onClick={togglePlay}
                disabled={!currentTrack}
                className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all bg-gradient-to-br ${currentTrack?.color || 'from-slate-300 to-slate-400 dark:from-slate-700 dark:to-slate-800'} text-white border border-white/20 disabled:opacity-50 disabled:scale-100`}
              >
                {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-0.5" />}
              </button>

              <button onClick={nextTrack} disabled={!currentTrack} className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors disabled:opacity-30">
                <SkipForward className="w-5 h-5 fill-current" />
              </button>
            </div>

            {/* Bottom: Volume & Playlist Toggle */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
               <div className="flex items-center gap-2 flex-1">
                  <button onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <VolumeX className="w-4 h-4 text-slate-400" /> : <Volume2 className="w-4 h-4 text-slate-400" />}
                  </button>
                  <input 
                    type="range" 
                    min="0" 
                    max="100" 
                    step="1" 
                    value={isMuted ? 0 : volume}
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
                  />
               </div>
               <button 
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-2 rounded-lg transition-colors ${showPlaylist ? 'bg-slate-100 dark:bg-slate-800 text-indigo-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'}`}
               >
                 <ListMusic className="w-4 h-4" />
               </button>
            </div>

            {/* Playlist Drawer */}
            <AnimatePresence>
              {showPlaylist && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="mt-4 space-y-2 overflow-hidden"
                >
                   {/* Add File Button - Only for Admin */}
                   {isAdmin ? (
                     <button 
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full flex items-center justify-center gap-2 p-3 rounded-lg border border-dashed border-slate-300 dark:border-slate-600 hover:border-indigo-500 dark:hover:border-indigo-400 text-slate-500 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all text-sm font-bold bg-slate-50 dark:bg-slate-800/50 mb-3"
                     >
                        <Upload className="w-4 h-4" />
                        내 음악 파일 추가하기
                     </button>
                   ) : (
                     playlist.length === 0 && (
                        <div className="text-center p-3 text-sm text-slate-400">
                            등록된 음악이 없습니다.
                        </div>
                     )
                   )}

                   {/* List */}
                   <div className="max-h-40 overflow-y-auto custom-scrollbar pr-1 space-y-2">
                     {playlist.map((track, index) => (
                       <div key={track.id} className="relative group">
                         <button
                           onClick={() => changeTrack(index)}
                           className={`w-full flex items-center gap-3 p-2 rounded-lg text-left transition-colors ${
                             currentTrackIndex === index 
                               ? 'bg-slate-100 dark:bg-slate-800' 
                               : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                           }`}
                         >
                            <div className={`w-8 h-8 rounded-md bg-gradient-to-br ${track.color} flex items-center justify-center shrink-0`}>
                               {currentTrackIndex === index && isPlaying ? (
                                 <motion.div 
                                   animate={{ height: [4, 12, 6, 14, 4] }}
                                   transition={{ repeat: Infinity, duration: 1.5 }}
                                   className="w-1 bg-white/80 rounded-full"
                                 />
                               ) : (
                                 <span className="text-white text-xs font-bold">{index + 1}</span>
                               )}
                            </div>
                            <div className="flex-1 min-w-0 pr-6">
                               <p className={`text-sm font-bold truncate ${currentTrackIndex === index ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-300'}`}>{track.title}</p>
                            </div>
                         </button>
                         
                         {/* Delete button - Only for Admin */}
                         {isAdmin && (
                             <button 
                                onClick={(e) => removeTrack(e, index)}
                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-slate-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                                title="삭제"
                             >
                                <Trash2 className="w-4 h-4" />
                             </button>
                         )}
                       </div>
                     ))}
                   </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.button
            key="collapsed"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className={`w-12 h-12 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-lg border border-white/50 dark:border-slate-700 flex items-center justify-center group overflow-hidden relative`}
            title="배경음악 플레이어 열기"
          >
            {/* Playing Indicator Ring */}
            {isPlaying && (
              <span className="absolute inset-0 rounded-full border-2 border-indigo-500/50 border-t-indigo-500 animate-spin" />
            )}
            
            <FileAudio className={`w-5 h-5 text-slate-700 dark:text-slate-300 ${isPlaying ? 'animate-pulse' : ''}`} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MusicPlayer;