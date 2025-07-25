import React from 'react';
import { X, Sparkles, Heart } from 'lucide-react';

interface AlphabetModalProps {
  isOpen: boolean;
  onClose: () => void;
  alphabet: string[];
}

export function AlphabetModal({ isOpen, onClose, alphabet }: AlphabetModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-md rounded-3xl max-w-5xl w-full max-h-[85vh] overflow-hidden shadow-2xl border border-white/20">
        <div className="flex items-center justify-between p-8 border-b border-pink-200/50 bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-200 to-amber-200 rounded-full">
              <span className="text-2xl">🐱</span>
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
              Emoji Alphabet
            </h2>
            <span className="px-3 py-1 bg-gradient-to-r from-orange-100 to-amber-100 text-orange-700 rounded-full text-sm font-semibold">
              {alphabet.length} emojis
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-orange-100 rounded-full transition-all duration-200 hover:scale-110"
          >
            <X className="w-6 h-6 text-gray-500 hover:text-orange-600" />
          </button>
        </div>
        
        <div className="p-8 overflow-y-auto max-h-[65vh]">
          <div className="grid grid-cols-8 sm:grid-cols-12 md:grid-cols-16 lg:grid-cols-20 gap-3">
            {alphabet.map((emoji, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-3 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl hover:from-orange-100 hover:to-amber-100 transition-all duration-200 hover:scale-110 hover:shadow-md border border-orange-100/50"
                title={`Index: ${index}, Emoji: ${emoji}`}
              >
                <span className="text-3xl mb-1">{emoji}</span>
                <span className="text-xs text-orange-600 font-mono font-semibold">{index}</span>
              </div>
            ))}
          </div>
          
          <div className="mt-8 p-6 bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl border border-orange-200/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">🐾</span>
              <h3 className="font-bold text-orange-900 text-lg">Alphabet Statistics</h3>
              <span className="text-lg">😸</span>
            </div>
            <div className="text-sm text-orange-800 space-y-2 grid grid-cols-1 md:grid-cols-2 gap-4">
              <p>Total emojis: {alphabet.length}</p>
              <p>Unique emojis: {new Set(alphabet).size}</p>
              <p>Required for encoding: 256</p>
              <p className={alphabet.length >= 256 ? 'text-emerald-600 font-semibold' : 'text-rose-600 font-semibold'}>
                Status: {alphabet.length >= 256 ? '🐱 Purr-fect!' : '😿 Need more emojis'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}