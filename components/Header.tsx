
import React from 'react';

const Header: React.FC = () => {
  return (
    <nav className="border-b border-yellow-900/30 bg-black/90 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-to-br from-yellow-700 via-yellow-500 to-yellow-200 rounded-lg shadow-lg">
                    <i className="fa-solid fa-crown text-black"></i>
                </div>
                <div className="flex flex-col">
                    <h1 className="text-xl font-extrabold tracking-tight uppercase italic leading-none">
                        <span className="text-gold">PoseMaster</span><span className="text-white text-sm ml-1">PRO</span>
                    </h1>
                    <span className="text-[9px] font-bold text-yellow-600/70 tracking-[0.4em] uppercase mt-1">OLEH HARUN STUDIO V.2</span>
                </div>
            </div>
            <div className="hidden md:flex items-center gap-6 text-[10px] font-bold text-yellow-600/50 uppercase tracking-[0.2em]">
                <span className="flex items-center gap-2"><i className="fa-solid fa-camera"></i> Sudut Presisi Ultra</span>
                <span className="flex items-center gap-2"><i className="fa-solid fa-gem"></i> Pelindung Identitas Mewah</span>
            </div>
        </div>
    </nav>
  );
};

export default Header;
