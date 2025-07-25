import React, { useState } from 'react';
import { Sparkles, ArrowLeft } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { emojiToAlgorand } from '../utils/algorand';

export function DecoderPanel() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleDecode = () => {
    setError('');
    setOutput('');
    
    if (!input.trim()) {
      setError('Please enter an emoji sequence');
      return;
    }

    try {
      const decoded = emojiToAlgorand(input.trim());
      setOutput(decoded);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid emoji sequence');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleDecode();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-indigo-200/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-amber-100 to-yellow-100 rounded-full">
          <ArrowLeft className="w-6 h-6 text-amber-600" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
          Decode from Purr-fect 
        </h2>
        <span className="text-xl">😺</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="emoji-input" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Purr-fect Address
            <span className="text-amber-400">🐈</span>
          </label>
          <textarea
            id="emoji-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={4}
            placeholder="Paste purr-fect sequence here..."
            className="w-full px-4 py-3 border-2 border-amber-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-amber-400 transition-all duration-300 bg-white/70 backdrop-blur-sm resize-none text-2xl leading-relaxed"
          />
        </div>

        <button
          onClick={handleDecode}
          className="w-full bg-gradient-to-r from-amber-500 to-yellow-600 text-white py-4 px-6 rounded-2xl hover:from-amber-600 hover:to-yellow-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <ArrowLeft className="w-5 h-5" />
          Decode
          <span className="text-lg">😺</span>
        </button>

        {error && (
          <div className="text-red-600 text-sm bg-red-50/80 backdrop-blur-sm p-4 rounded-2xl border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Algorand Address
            <span className="text-amber-400">🐾</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={output}
              readOnly
              className="w-full px-4 py-3 pr-14 border-2 border-amber-200 rounded-2xl bg-amber-50/50 backdrop-blur-sm focus:outline-none font-mono text-sm"
              placeholder="Decoded Algorand address will appear here..."
            />
            <div className="absolute top-1/2 right-3 transform -translate-y-1/2">
              <CopyButton text={output} disabled={!output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}