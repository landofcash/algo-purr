import React, { useState } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { CopyButton } from './CopyButton';
import { algorandToEmoji } from '../utils/algorand';

export function EncoderPanel() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  const handleEncode = () => {
    setError('');
    setOutput('');
    
    if (!input.trim()) {
      setError('Please enter an Algorand address');
      return;
    }

    try {
      const encoded = algorandToEmoji(input.trim());
      setOutput(encoded);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid Algorand address format');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEncode();
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-3xl border border-pink-200/50 p-8 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
      {/* Decorative gradient overlay */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-400"></div>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-gradient-to-r from-orange-100 to-amber-100 rounded-full">
          <ArrowRight className="w-6 h-6 text-orange-600" />
        </div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent">
          Encode to Purr-fect
        </h2>
        <span className="text-xl">🐾</span>
      </div>
      
      <div className="space-y-4">
        <div>
          <label htmlFor="algorand-input" className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Algorand Address
            <span className="text-orange-400">🐱</span>
          </label>
          <input
            id="algorand-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter Algorand address (58 characters)"
            className="w-full px-4 py-3 border-2 border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-orange-400 transition-all duration-300 bg-white/70 backdrop-blur-sm font-mono text-sm"
          />
        </div>

        <button
          onClick={handleEncode}
          className="w-full bg-gradient-to-r from-orange-500 to-amber-600 text-white py-4 px-6 rounded-2xl hover:from-orange-600 hover:to-amber-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-[1.02] flex items-center justify-center gap-2"
        >
          <span className="text-lg">🐾</span>
          Encode
          <ArrowRight className="w-5 h-5" />
        </button>

        {error && (
          <div className="text-red-600 text-sm bg-red-50/80 backdrop-blur-sm p-4 rounded-2xl border border-red-200">
            {error}
          </div>
        )}

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
            Purr-fect Address
            <span className="text-orange-400">😸</span>
          </label>
          <div className="relative">
            <textarea
              value={output}
              readOnly
              rows={3}
              className="w-full px-4 py-3 pr-14 border-2 border-orange-200 rounded-2xl bg-orange-50/50 backdrop-blur-sm resize-none focus:outline-none text-2xl leading-relaxed"
              placeholder="Encoded purr-fect address will appear here..."
            />
            <div className="absolute top-3 right-3">
              <CopyButton text={output} disabled={!output} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}