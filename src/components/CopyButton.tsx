import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

interface CopyButtonProps {
  text: string;
  disabled?: boolean;
}

export function CopyButton({ text, disabled }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    if (disabled || !text) return;
    
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      disabled={disabled || !text}
      className={`p-2 rounded-lg transition-colors ${
        disabled || !text
          ? 'text-gray-300 cursor-not-allowed'
          : 'text-orange-500 hover:text-orange-700 hover:bg-orange-100 hover:scale-110 transform transition-all duration-200'
      }`}
      title="Copy to clipboard"
    >
      {copied ? (
        <Check className="w-5 h-5 text-emerald-500" />
      ) : (
        <Copy className="w-5 h-5" />
      )}
    </button>
  );
}