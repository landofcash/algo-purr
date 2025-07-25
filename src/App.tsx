import React from 'react';
import { useState } from 'react';
import { Eye, Sparkles, Heart } from 'lucide-react';
import { EncoderPanel } from './components/EncoderPanel';
import { DecoderPanel } from './components/DecoderPanel';
import { AlphabetModal } from './components/AlphabetModal';
import { EMOJI_ALPHABET } from './utils/algorand';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-100 py-8 px-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-orange-200 rounded-full opacity-20 blur-xl"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-amber-200 rounded-full opacity-30 blur-lg"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-yellow-200 rounded-full opacity-15 blur-2xl"></div>
        <div className="absolute bottom-20 right-10 w-28 h-28 bg-orange-300 rounded-full opacity-25 blur-xl"></div>
      </div>
      
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12 relative">
          {/* Hero image */}
          <div className="mb-8 relative">
            <div className="w-full h-80 rounded-3xl shadow-2xl relative overflow-hidden">
              <img 
                src="/algorand-girls-cats.png" 
                alt="Algorand Emoji Converter" 
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent rounded-3xl"></div>
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white text-center">
              <div className="bg-black/70 backdrop-blur-sm px-6 py-4 rounded-2xl border border-white/20">
                <h1 className="text-4xl font-bold text-white drop-shadow-lg whitespace-nowrap">
                Algorand ↔ purr-fect address
                </h1>
                <p className="text-white text-sm font-medium drop-shadow-md mt-2">
                  Transform addresses into purr-fect versions 🐱
                </p>
              </div>
            </div>
          </div>
          
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-400 to-amber-500 hover:from-orange-500 hover:to-amber-600 text-white rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 font-medium"
          >
            <Eye className="w-5 h-5" />
            View purr-fect Alphabet
          </button>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <EncoderPanel />
          <DecoderPanel />
        </div>

        <footer className="text-center mt-12 relative">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
            <div className="flex items-center justify-center gap-2 mb-3">
              <span className="text-xl">🐾</span>
              <Heart className="w-5 h-5 text-orange-400" />
              <span className="text-xl">🐾</span>
            </div>
            <p className="text-gray-600 font-medium">
              Enter a valid 58-character Algorand address to encode, or paste an emoji sequence to decode
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Made with love for the algofam 🐱💕
            </p>
          </div>
        </footer>

        <AlphabetModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          alphabet={EMOJI_ALPHABET}
        />
      </div>
    </div>
  );
}

export default App;