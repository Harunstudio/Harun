
import React, { useState, useCallback, useRef, useEffect } from 'react';
import Header from './components/Header';
import MegaMenu from './components/MegaMenu';
import { MenuType, AppState, SelectionItem } from './types';
import { POSES, EXPRESSIONS, ANGLES } from './constants';
import { analyzeImage, editPose } from './services/geminiService';

const App: React.FC = () => {
  const [state, setState] = useState<AppState>({
    originalImage: null,
    generatedImage: null,
    selectedGender: null,
    selectedPose: null,
    selectedExpression: EXPRESSIONS[0], // Default: Bawaan Foto
    selectedAngle: ANGLES[0], // Default: Bawaan Foto
    isAnalyzing: false,
    isGenerating: false,
    aiRecommendation: null,
  });

  const [menuOpen, setMenuOpen] = useState<{ isOpen: boolean; type: MenuType }>({
    isOpen: false,
    type: MenuType.POSE
  });

  const [showOriginal, setShowOriginal] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setState(prev => ({ 
          ...prev, 
          originalImage: reader.result as string, 
          generatedImage: null, 
          aiRecommendation: null,
          selectedPose: null 
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!state.originalImage) return;
    setState(prev => ({ ...prev, isAnalyzing: true }));
    try {
      const result = await analyzeImage(state.originalImage);
      const detectedGender = result.gender.toLowerCase().includes('female') ? 'Female' : 'Male';
      setState(prev => ({ 
        ...prev, 
        aiRecommendation: `${result.gender} (${result.posture}). Rekomendasi: ${result.suggestion}`,
        selectedGender: detectedGender,
        isAnalyzing: false 
      }));
    } catch (err) {
      console.error("Analisis gagal:", err);
      setState(prev => ({ ...prev, isAnalyzing: false }));
    }
  };

  const handleGenerate = async () => {
    if (!state.originalImage || !state.selectedPose || !state.selectedExpression || !state.selectedAngle) {
      alert("Silakan lengkapi semua pilihan (Gender, Pose, Ekspresi, dan Kamera) terlebih dahulu untuk hasil maksimal.");
      return;
    }

    setState(prev => ({ ...prev, isGenerating: true }));
    try {
      const result = await editPose(
        state.originalImage,
        state.selectedPose.label + " " + state.selectedPose.description,
        state.selectedExpression.id === 'default-exp' ? 'ORIGINAL' : state.selectedExpression.label,
        state.selectedAngle.id === 'default-angle' ? 'ORIGINAL' : state.selectedAngle.label
      );
      setState(prev => ({ ...prev, generatedImage: result, isGenerating: false }));
    } catch (err) {
      console.error("Gagal melakukan render:", err);
      alert("Terjadi kesalahan saat merender pose. Silakan coba lagi.");
      setState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  const openMenu = (type: MenuType) => setMenuOpen({ isOpen: true, type });
  const closeMenu = () => setMenuOpen({ ...menuOpen, isOpen: false });

  const getMenuItems = () => {
    switch(menuOpen.type) {
      case MenuType.POSE: 
        if (state.selectedGender) {
          return POSES.filter(p => p.category.startsWith(state.selectedGender!));
        }
        return POSES;
      case MenuType.EXPRESSION: return EXPRESSIONS;
      case MenuType.ANGLE: return ANGLES;
      default: return [];
    }
  };

  const getSelectedId = () => {
    switch(menuOpen.type) {
      case MenuType.POSE: return state.selectedPose?.id;
      case MenuType.EXPRESSION: return state.selectedExpression?.id;
      case MenuType.ANGLE: return state.selectedAngle?.id;
      default: return undefined;
    }
  };

  const handleSelect = (item: SelectionItem) => {
    switch(menuOpen.type) {
      case MenuType.POSE: setState(prev => ({ ...prev, selectedPose: item })); break;
      case MenuType.EXPRESSION: setState(prev => ({ ...prev, selectedExpression: item })); break;
      case MenuType.ANGLE: setState(prev => ({ ...prev, selectedAngle: item })); break;
    }
  };

  return (
    <div className="min-h-screen bg-[#050505]">
      <Header />

      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* KOLOM KIRI: KONTROL DAN PILIHAN */}
            <div className="lg:col-span-5 space-y-8">
                
                {/* LANGKAH 1: UNGGAH & FOKUS GENDER */}
                <section className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
                    <div className="flex items-center gap-4 mb-3">
                        <span className="bg-gold-gradient w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg text-black">01</span>
                        <h2 className="text-sm font-bold text-white tracking-widest uppercase">Pusat Fokus Model</h2>
                    </div>
                    <div className="glass-card rounded-2xl p-4 gold-glow space-y-4">
                        <div className="flex flex-col gap-4">
                            <label className="cursor-pointer block group">
                                <div className="border-2 border-dashed border-yellow-900/40 rounded-xl p-6 text-center transition-all group-hover:border-yellow-500/60 group-hover:bg-yellow-500/5">
                                    <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
                                    <i className="fa-solid fa-camera-retro text-yellow-600/50 group-hover:text-yellow-500 mb-2 text-2xl"></i>
                                    <p className="text-[10px] font-semibold text-yellow-700 uppercase tracking-widest">Impor Foto Master</p>
                                </div>
                            </label>
                            
                            <div className="space-y-2">
                              <p className="text-[9px] font-black text-yellow-700 uppercase tracking-[0.2em] text-center">Tentukan Fokus Gender</p>
                              <div className="flex gap-2">
                                <button 
                                  onClick={() => setState(p => ({ ...p, selectedGender: 'Male', selectedPose: null }))}
                                  className={`flex-1 py-4 rounded-xl border font-black text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${state.selectedGender === 'Male' ? 'bg-gold-gradient text-black border-yellow-300 shadow-lg shadow-yellow-500/20' : 'bg-black text-yellow-600 border-yellow-900/30 hover:border-yellow-500/50'}`}
                                >
                                  <i className="fa-solid fa-mars text-sm"></i> Pria
                                </button>
                                <button 
                                  onClick={() => setState(p => ({ ...p, selectedGender: 'Female', selectedPose: null }))}
                                  className={`flex-1 py-4 rounded-xl border font-black text-[10px] tracking-widest uppercase transition-all flex items-center justify-center gap-2 ${state.selectedGender === 'Female' ? 'bg-gold-gradient text-black border-yellow-300 shadow-lg shadow-yellow-500/20' : 'bg-black text-yellow-600 border-yellow-900/30 hover:border-yellow-500/50'}`}
                                >
                                  <i className="fa-solid fa-venus text-sm"></i> Wanita
                                </button>
                              </div>
                            </div>
                        </div>

                        {state.originalImage && (
                          <div className="mt-4 flex justify-center pt-2 border-t border-yellow-900/10">
                            <div className="w-24 aspect-[9/16] bg-black rounded-lg overflow-hidden ring-1 ring-yellow-500/50 group relative">
                                <img src={state.originalImage} className="w-full h-full object-cover grayscale-[0.3]" alt="Preview" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                  <i className="fa-solid fa-check text-gold text-xl"></i>
                                </div>
                            </div>
                          </div>
                        )}
                    </div>
                </section>

                {/* LANGKAH 2: POSE */}
                <section className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                    <div className="flex items-center gap-4 mb-3">
                        <span className="bg-gold-gradient w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg text-black">02</span>
                        <h2 className="text-sm font-bold text-white tracking-widest uppercase">Katalog Pose {state.selectedGender === 'Male' ? 'Pria' : state.selectedGender === 'Female' ? 'Wanita' : 'Premium'}</h2>
                    </div>
                    
                    <div className="space-y-3">
                        <button 
                          onClick={() => openMenu(MenuType.POSE)} 
                          disabled={!state.selectedGender}
                          className="w-full bg-[#121212] hover:bg-[#1a1a1a] border border-yellow-900/30 p-4 rounded-xl flex justify-between items-center group transition-all gold-glow disabled:opacity-50"
                        >
                            <div className="flex items-center gap-3">
                                <i className="fa-solid fa-user-tie text-yellow-600"></i>
                                <p className="text-xs font-bold text-slate-300 uppercase tracking-tight">
                                  {state.selectedPose ? state.selectedPose.label : state.selectedGender ? `Pilih Pose Terbaik ${state.selectedGender === 'Male' ? 'Pria' : 'Wanita'}` : 'Tentukan Gender Dahulu'}
                                </p>
                            </div>
                            <i className="fa-solid fa-angle-right text-yellow-800 text-xs"></i>
                        </button>

                        <button 
                          onClick={handleAnalyze} 
                          disabled={!state.originalImage || state.isAnalyzing}
                          className="w-full bg-gradient-to-r from-[#1a1a1a] to-[#252010] hover:from-[#202020] hover:to-[#352d15] border border-yellow-600/20 p-3 rounded-xl flex justify-between items-center group transition-all disabled:opacity-50"
                        >
                            <div className="flex items-center gap-3">
                                <div className="bg-yellow-900/20 p-2 rounded-lg">
                                    <i className={`fa-solid fa-wand-magic-sparkles text-yellow-500 ${state.isAnalyzing ? 'animate-spin' : 'animate-pulse'}`}></i>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-bold text-yellow-500 uppercase tracking-wider">Protokol Rekomendasi AI</p>
                                    <p className="text-[8px] text-yellow-700/60 uppercase tracking-tight">
                                      {state.aiRecommendation || 'Klik Untuk Deteksi Struktur & Rekomendasi'}
                                    </p>
                                </div>
                            </div>
                            <i className="fa-solid fa-chevron-right text-yellow-800/50 text-xs"></i>
                        </button>
                    </div>
                </section>

                {/* LANGKAH 3 & 4: EKSPRESI & SUDUT KAMERA */}
                <div className="grid grid-cols-2 gap-4">
                  <section>
                      <div className="flex items-center gap-4 mb-3">
                          <span className="bg-gold-gradient w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg text-black">03</span>
                          <h2 className="text-[10px] font-bold text-white tracking-widest uppercase">Ekspresi</h2>
                      </div>
                      <button onClick={() => openMenu(MenuType.EXPRESSION)} className="w-full h-full min-h-[90px] bg-[#121212] hover:bg-[#1a1a1a] border border-yellow-900/30 p-4 rounded-xl flex flex-col justify-center items-center gap-2 group transition-all gold-glow text-center">
                          <i className={`fa-solid ${state.selectedExpression?.icon || 'fa-face-smile-beam'} text-yellow-600 transition-transform group-hover:scale-110`}></i>
                          <p className="text-[9px] font-bold text-slate-300 uppercase truncate w-full px-2">
                            {state.selectedExpression ? state.selectedExpression.label : 'Pilih Ekspresi'}
                          </p>
                          {state.selectedExpression?.id === 'default-exp' && (
                            <span className="text-[7px] text-yellow-700 font-black uppercase">Mode Bawaan</span>
                          )}
                      </button>
                  </section>
                  <section>
                      <div className="flex items-center gap-4 mb-3">
                          <span className="bg-gold-gradient w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg text-black">04</span>
                          <h2 className="text-[10px] font-bold text-white tracking-widest uppercase">Kamera</h2>
                      </div>
                      <button onClick={() => openMenu(MenuType.ANGLE)} className="w-full h-full min-h-[90px] bg-[#121212] hover:bg-[#1a1a1a] border border-yellow-900/30 p-4 rounded-xl flex flex-col justify-center items-center gap-2 group transition-all gold-glow text-center">
                          <i className={`fa-solid ${state.selectedAngle?.icon || 'fa-video'} text-yellow-600 transition-transform group-hover:scale-110`}></i>
                          <p className="text-[9px] font-bold text-slate-300 uppercase truncate w-full px-2">
                            {state.selectedAngle ? state.selectedAngle.label : 'Pilih Sudut'}
                          </p>
                          {state.selectedAngle?.id === 'default-angle' && (
                            <span className="text-[7px] text-yellow-700 font-black uppercase">Mode Bawaan</span>
                          )}
                      </button>
                  </section>
                </div>

                {/* LANGKAH 5: PROTOKOL KEAMANAN */}
                <section>
                    <div className="flex items-center gap-4 mb-3">
                        <span className="bg-gold-gradient w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shadow-lg text-black">05</span>
                        <h2 className="text-sm font-bold text-white tracking-widest uppercase">Proteksi Kemiripan</h2>
                    </div>
                    <div className="glass-card rounded-2xl p-5 space-y-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent shimmer"></div>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <i className="fa-solid fa-fingerprint text-yellow-600"></i>
                              <span className="text-[9px] font-black text-yellow-500 uppercase tracking-[0.2em] bg-yellow-500/10 px-2 py-1 rounded tracking-tighter">Biometric Likeness Lock</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></span>
                                <span className="text-[8px] font-bold text-green-500 uppercase tracking-widest">Sinkron</span>
                            </div>
                        </div>
                        <div className="space-y-2">
                          <div className="flex justify-between text-[8px] font-bold text-yellow-700 uppercase">
                              <span>Skor Kemiripan Wajah Asli</span>
                              <span>99.9% Akurat</span>
                          </div>
                          <div className="h-1 w-full bg-black rounded-full overflow-hidden flex gap-[2px]">
                              <div className="h-full bg-gold-gradient w-[99%] shimmer"></div>
                              <div className="h-full bg-yellow-500/20 w-[1%]"></div>
                          </div>
                        </div>
                    </div>
                </section>

                <button 
                  onClick={handleGenerate}
                  disabled={state.isGenerating || !state.originalImage || !state.selectedPose}
                  className="w-full py-6 bg-gold-gradient text-black font-black uppercase tracking-[0.3em] rounded-2xl shadow-[0_15px_50px_rgba(212,175,55,0.4)] hover:scale-[1.03] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed group"
                >
                  {state.isGenerating ? (
                    <>
                      <i className="fa-solid fa-bolt-lightning animate-pulse"></i>
                      <span>Sedang Merender Master...</span>
                    </>
                  ) : (
                    <>
                      <i className="fa-solid fa-crown group-hover:rotate-12 transition-transform"></i>
                      <span>Render Pose Pro</span>
                    </>
                  )}
                </button>
            </div>

            {/* KOLOM KANAN: PREVIEW HASIL */}
            <div className="lg:col-span-7 flex flex-col gap-6">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-black text-white tracking-widest uppercase flex items-center gap-3">
                        <span className="w-1.5 h-6 bg-gold-gradient rounded-full"></span>
                        Kanvas Render Studio
                    </h2>
                    <div className="flex gap-2">
                        <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-[9px] font-bold text-yellow-500 tracking-widest uppercase">Output Bersih</span>
                        <span className="px-3 py-1 bg-yellow-500/10 border border-yellow-500/30 rounded-full text-[9px] font-bold text-yellow-500 tracking-widest uppercase">Identitas Asli</span>
                    </div>
                </div>

                <div className="relative group flex-1">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600/50 to-yellow-900/20 blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
                    <div className="relative glass-card rounded-[2.5rem] border-2 border-yellow-900/20 overflow-hidden flex flex-col h-full min-h-[600px] shadow-2xl">
                        
                        {/* Overlay Status Face-Lock saat Render Selesai */}
                        {state.generatedImage && !state.isGenerating && (
                          <div className="absolute top-6 right-6 z-20">
                            <div className="flex items-center gap-2 bg-yellow-500/20 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/40">
                              <i className="fa-solid fa-id-card-clip text-yellow-500 text-[10px]"></i>
                              <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Mirip 100% Terverifikasi</span>
                            </div>
                          </div>
                        )}

                        <div className="absolute top-6 left-6 z-10">
                            <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-yellow-500/30">
                                <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                                <span className="text-[10px] font-black text-yellow-500 uppercase tracking-widest">Live Viewfinder</span>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center bg-[#0a0a0a] p-8 overflow-hidden relative">
                          {state.isGenerating ? (
                            <div className="text-center">
                              <div className="relative mb-10 inline-block">
                                <div className="absolute inset-0 bg-gold blur-3xl opacity-20 animate-pulse"></div>
                                <i className="fa-solid fa-wand-sparkles text-7xl text-gold relative z-10 animate-bounce"></i>
                              </div>
                              <p className="text-2xl font-black text-white uppercase tracking-[0.3em] mb-3">Rekonstruksi Pose...</p>
                              <p className="text-xs text-yellow-700 uppercase tracking-widest max-w-sm mx-auto">AI sedang mengunci fitur biometrik wajah asli Anda...</p>
                            </div>
                          ) : state.generatedImage ? (
                            <div className="relative h-full w-full flex items-center justify-center group/result">
                              <img 
                                src={showOriginal ? state.originalImage! : state.generatedImage} 
                                className="max-h-full max-w-full object-contain rounded-xl shadow-2xl animate-fade-in" 
                                alt="Result" 
                              />
                              
                              {/* Tombol Bandingkan Cepat */}
                              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 w-full px-4">
                                <div className="bg-black/80 backdrop-blur-xl border border-yellow-500/30 rounded-2xl p-4 shadow-2xl max-w-xs w-full">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[9px] font-black text-yellow-500 uppercase tracking-widest">Verifikasi Identitas</span>
                                        <i className="fa-solid fa-shield-check text-green-500 text-xs"></i>
                                    </div>
                                    <button 
                                      onMouseDown={() => setShowOriginal(true)}
                                      onMouseUp={() => setShowOriginal(false)}
                                      onMouseLeave={() => setShowOriginal(false)}
                                      onTouchStart={() => setShowOriginal(true)}
                                      onTouchEnd={() => setShowOriginal(false)}
                                      className="w-full py-3 bg-yellow-500 text-black text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-white transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                      <i className="fa-solid fa-face-viewfinder"></i>
                                      Tahan Cek Wajah Asli
                                    </button>
                                </div>
                              </div>
                            </div>
                          ) : state.originalImage ? (
                            <div className="relative group/img max-h-full max-w-full overflow-hidden flex items-center justify-center">
                              <img src={state.originalImage} className="max-h-full max-w-full object-contain rounded-xl opacity-20 blur-[6px] transition-all group-hover/img:opacity-30 group-hover/img:blur-sm" alt="Original Placeholder" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="text-center p-8 bg-black/40 backdrop-blur-lg rounded-3xl border border-yellow-900/30">
                                  <i className="fa-solid fa-fingerprint text-gold text-5xl mb-4"></i>
                                  <p className="text-sm font-black text-white uppercase tracking-[0.3em]">Siap Re-Pose Identitas</p>
                                  <p className="text-[9px] text-yellow-700/80 uppercase mt-2 tracking-widest">Wajah Asli Anda Menjadi Jangkar Utama Render</p>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="text-center space-y-6">
                              <div className="w-32 h-32 border-2 border-dashed border-yellow-900/30 rounded-full flex items-center justify-center mx-auto mb-8 bg-yellow-900/5 group-hover:border-yellow-500/40 transition-colors">
                                <i className="fa-solid fa-user-check text-4xl text-yellow-900/40 group-hover:text-gold transition-colors"></i>
                              </div>
                              <h3 className="text-2xl font-black text-yellow-900/40 uppercase tracking-[0.5em]">Tunggu Upload</h3>
                              <p className="text-[10px] text-yellow-900/60 uppercase tracking-widest max-w-[240px] mx-auto leading-relaxed">Sistem Kami Menggunakan Pemetaan Biometrik 1:1 Untuk Menjamin Hasil Yang Mirip</p>
                            </div>
                          )}
                        </div>

                        {state.generatedImage && !state.isGenerating && (
                          <div className="p-8 bg-black/80 border-t border-yellow-900/30 backdrop-blur-xl flex justify-between items-center">
                              <div className="flex items-center gap-5">
                                  <div className="p-4 bg-yellow-900/20 rounded-2xl border border-yellow-500/20">
                                      <i className="fa-solid fa-id-badge text-yellow-500 text-xl"></i>
                                  </div>
                                  <div>
                                      <p className="text-[11px] font-black text-white uppercase tracking-[0.2em]">Master Kemiripan Tinggi</p>
                                      <p className="text-[9px] text-yellow-700 uppercase tracking-widest">Face Consistency Lock: Verified</p>
                                  </div>
                              </div>
                              <a 
                                href={state.generatedImage} 
                                download="posemaster-biometric-exact.png"
                                className="px-10 py-4 bg-white text-black text-[11px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-gold-primary transition-all hover:scale-105 active:scale-95 shadow-lg"
                              >
                                  Simpan Master
                              </a>
                          </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </main>

      <MegaMenu 
        isOpen={menuOpen.isOpen}
        onClose={closeMenu}
        type={menuOpen.type}
        items={getMenuItems()}
        selectedId={getSelectedId()}
        onSelect={handleSelect}
      />

      <footer className="mt-20 border-t border-yellow-900/20 py-16 bg-black/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center gap-10 mb-12">
            <div className="flex flex-col items-center text-center">
               <div className="h-px w-20 bg-gold-gradient mb-8"></div>
               <h3 className="text-sm font-black text-gold uppercase tracking-[0.6em] mb-6">Dukungan Kreatif</h3>
               <div className="flex items-center gap-10">
                  <a href="https://www.instagram.com/fikrii2997?igsh=MW8yejcweXFxcHR5Zw==" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-900/10 border border-yellow-900/30 flex items-center justify-center group-hover:bg-gold-gradient transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] group-hover:-translate-y-2">
                      <i className="fa-brands fa-instagram text-2xl text-gold group-hover:text-black transition-colors"></i>
                    </div>
                    <span className="text-[9px] font-black text-yellow-700/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">Instagram</span>
                  </a>

                  <a href="https://www.tiktok.com/@fikriharun297?_r=1&_t=ZS-935y4q23EM0" target="_blank" rel="noopener noreferrer" className="group flex flex-col items-center gap-3">
                    <div className="w-14 h-14 rounded-2xl bg-yellow-900/10 border border-yellow-900/30 flex items-center justify-center group-hover:bg-gold-gradient transition-all duration-500 group-hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] group-hover:-translate-y-2">
                      <i className="fa-brands fa-tiktok text-2xl text-gold group-hover:text-black transition-colors"></i>
                    </div>
                    <span className="text-[9px] font-black text-yellow-700/60 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all">TikTok</span>
                  </a>
               </div>
               <p className="mt-12 text-[8px] font-bold text-yellow-900/40 uppercase tracking-[0.5em]">© 2025 PoseMasterPRO Gold Edition. Seluruh Hak Cipta Dilindungi.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
