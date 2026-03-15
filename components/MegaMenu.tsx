
import React from 'react';
import { SelectionItem, MenuType } from '../types';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  type: MenuType;
  items: SelectionItem[];
  selectedId: string | undefined;
  onSelect: (item: SelectionItem) => void;
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, type, items, selectedId, onSelect }) => {
  if (!isOpen) return null;

  const categories = Array.from(new Set(items.map(i => i.category)));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 mega-menu-overlay">
      <div className="w-full max-w-6xl bg-[#050505] border border-yellow-500/20 rounded-3xl overflow-hidden flex flex-col max-h-[92vh] shadow-[0_0_100px_rgba(212,175,55,0.15)]">
        <div className="p-8 border-b border-yellow-900/30 flex justify-between items-center bg-black">
          <div>
            <h2 className="text-3xl font-black text-gold uppercase tracking-widest leading-none">Catalog {type}</h2>
            <p className="text-[10px] text-yellow-700 font-bold uppercase tracking-[0.4em] mt-2">Arsip Pose Premium Harun Studio V.2</p>
          </div>
          <button onClick={onClose} className="w-12 h-12 rounded-full bg-yellow-900/10 border border-yellow-900/30 flex items-center justify-center hover:bg-yellow-500 hover:text-black transition-all group">
            <i className="fa-solid fa-xmark text-yellow-600 group-hover:text-black transition-colors"></i>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[#080808]">
          <div className="space-y-12">
            {categories.map(cat => (
              <div key={cat} className="animate-slide-up">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-900/30"></div>
                  <h3 className="text-sm font-black text-yellow-500 uppercase tracking-[0.4em] whitespace-nowrap">{cat}</h3>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-900/30"></div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {items.filter(i => i.category === cat).map(item => (
                    <button
                      key={item.id}
                      onClick={() => { onSelect(item); onClose(); }}
                      className={`text-left p-3 rounded-xl border transition-all flex flex-col gap-2 group relative overflow-hidden ${
                        selectedId === item.id 
                        ? 'bg-gold-gradient border-yellow-300 text-black shadow-lg shadow-yellow-500/20' 
                        : 'bg-black border-yellow-900/20 text-slate-400 hover:border-yellow-500/40 hover:bg-yellow-500/5'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm ${
                        selectedId === item.id ? 'bg-black/20 text-black' : 'bg-yellow-900/10 text-yellow-600 group-hover:bg-yellow-500/10'
                      }`}>
                        <i className={`fa-solid ${item.icon || 'fa-plus'}`}></i>
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold uppercase text-[10px] tracking-tight truncate">{item.label}</h4>
                        <p className={`text-[8px] uppercase truncate opacity-60`}>{item.description}</p>
                      </div>
                      {selectedId === item.id && (
                        <div className="absolute top-1 right-1">
                          <i className="fa-solid fa-check-circle text-[10px]"></i>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="p-4 bg-black border-t border-yellow-900/20 flex justify-center">
            <p className="text-[8px] font-bold text-yellow-800 uppercase tracking-widest">Total {items.length} Konfigurasi Tersedia dalam Database</p>
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
