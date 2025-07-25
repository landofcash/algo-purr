import { base32 } from '@scure/base';
import algosdk from 'algosdk';

// Emoji alphabet for encoding (256 unique emojis)
export const EMOJI_ALPHABET = ["😂","❤️","😍","🤣","😊","🙏","💕","😭","😘","👍","😅","👏","😁","🔥","💔","💖","💙","😢","🤔","😆","🙄","💪","😉","👌","🤗","💜","😔","😎","😇","🌹","🤦","🎉","💞","✌️","✨","🤷","😱","😌","🌸","🙌","😋","💗","💚","😏","💛","🙂","💓","🤩","😄","😀","🖤","😃","💯","🙈","👇","🎶","😒","🤭","❣️","😜","💋","👀","😪","😑","💥","🙋","😞","😩","😡","🤪","👊","☀️","😥","🤤","👉","💃","😳","✋","😚","😝","😴","🌟","😬","🙃","🍀","🌷","😻","😓","⭐","✅","🌈","😈","🤘","💦","✔️","😣","🏃","💐","☹️","🎊","💘","😠","☝️","😕","🌺","🎂","🌻","😐","🖕","💝","🙊","😹","🗣️","💫","💀","👑","🎵","🤞","😛","🔴","😤","🌼","😫","⚽","🤙","☕","🏆","🧡","🎁","⚡","🌞","🎈","❌","✊","👋","😲","🌿","🤫","👈","😮","🙆","🍻","🍃","🐶","💁","😰","🤨","😶","🤝","🚶","💰","🍓","💢","🤟","🙁","🚨","💨","🤬","✈️","🎀","🍺","🤓","😙","💟","🌱","😖","👶","❓","💎","💸","😨","🌚","🦋","😷","🕺","⚠️","🙅","😟","😵","👎","🤲","🤠","🤧","📌","🔵","💅","🧐","🐾","🍒","😗","🤑","🚀","🌊","🤯","🐷","☎️","💧","😯","💆","👆","🎤","🙇","🍑","❄️","🌴","💣","🐸","💌","🥀","🤢","👅","💡","💩","👐","📸","👻","🤐","🤮","🎼","✍️","🚩","🍎","🍊","👼","💍","📣","🥂","📱","☔","🌙","🍾","🎧","🍁","🏀","☠️","🖐️","😧","🎯","📲","☘️","👁️","🍷","👄","🐟","🍰","💤","🕊️","📺","💭","🐱","🐝","🧚","📢","📷","🐕","🎸"];

// Debug: Check if we have enough unique emojis
console.log('Total emojis in alphabet:', EMOJI_ALPHABET.length);
console.log('Unique emojis:', new Set(EMOJI_ALPHABET).size);

export function isValidAlgorandAddress(address: string): boolean {
  try {
    // Use algosdk to validate the address
    algosdk.decodeAddress(address);
    return true;
  } catch {
    return false;
  }
}

export function algorandToEmoji(address: string): string {
  if (!isValidAlgorandAddress(address)) {
    throw new Error('Invalid Algorand address');
  }
  
  // Check if we have enough emojis for encoding
  if (EMOJI_ALPHABET.length < 256) {
    throw new Error(`Not enough emojis in alphabet. Need 256, have ${EMOJI_ALPHABET.length}`);
  }
  
  // Decode the base32 address to get all 36 bytes (32 public key + 4 checksum)
  const addressWithoutChecksum = address.slice(0, -8); // Remove last 8 chars (4 bytes in base32)
  const checksumPart = address.slice(-8); // Last 8 chars
  
  // Use algosdk to get just the public key (32 bytes, no checksum)
  const decodedAddress = algosdk.decodeAddress(address);
  const publicKeyBytes = decodedAddress.publicKey;
  
  // Debug: Log the public key bytes
  console.log('Public key bytes length:', publicKeyBytes.length);
  console.log('First 4 bytes:', Array.from(publicKeyBytes.slice(0, 4)));
  // The public key should be exactly 32 bytes
  if (publicKeyBytes.length !== 32) {
    throw new Error(`Invalid public key length. Expected 32 bytes, got ${publicKeyBytes.length}`);
  }
  
  // Calculate custom checksum: sum of all public key bytes modulo 256
  const customChecksumByte = Array.from(publicKeyBytes).reduce((sum, byte) => sum + byte, 0) % 256;
  
  // Convert public key bytes to emojis
  const publicKeyEmojis = Array.from(publicKeyBytes).map(byte => EMOJI_ALPHABET[byte]);
  
  // Add checksum emoji at the end
  const checksumEmoji = EMOJI_ALPHABET[customChecksumByte];
  
  console.log('Custom checksum byte:', customChecksumByte);
  console.log('Checksum emoji:', checksumEmoji);
  
  return [...publicKeyEmojis, checksumEmoji].join('');
}

export function emojiToAlgorand(emojiString: string): string {
  // Use Intl.Segmenter to properly split emojis (including compound emojis)
  const segmenter = new Intl.Segmenter('en', { granularity: 'grapheme' });
  const emojis = Array.from(segmenter.segment(emojiString), segment => segment.segment);
  
  if (emojis.length !== 33) {
    throw new Error(`Invalid emoji sequence length. Expected 33 emojis (32 for public key + 1 for checksum), got ${emojis.length}`);
  }
  
  // Separate public key emojis (first 32) from checksum emoji (last 1)
  const publicKeyEmojis = emojis.slice(0, 32);
  const checksumEmoji = emojis[32];
  
  // Convert public key emojis to bytes
  const publicKeyBytes = new Uint8Array(32);
  
  for (let i = 0; i < publicKeyEmojis.length; i++) {
    const index = EMOJI_ALPHABET.indexOf(publicKeyEmojis[i]);
    if (index === -1) {
      throw new Error(`Invalid emoji in public key sequence: ${publicKeyEmojis[i]}`);
    }
    publicKeyBytes[i] = index;
  }
  
  // Convert checksum emoji to byte
  const receivedChecksumByte = EMOJI_ALPHABET.indexOf(checksumEmoji);
  if (receivedChecksumByte === -1) {
    throw new Error(`Invalid checksum emoji: ${checksumEmoji}`);
  }
  
  // Calculate expected checksum from public key bytes
  const expectedChecksumByte = Array.from(publicKeyBytes).reduce((sum, byte) => sum + byte, 0) % 256;
  
  console.log('Received checksum byte:', receivedChecksumByte);
  console.log('Expected checksum byte:', expectedChecksumByte);
  
  // Validate checksum
  if (receivedChecksumByte !== expectedChecksumByte) {
    throw new Error(`Checksum mismatch. Expected ${expectedChecksumByte}, got ${receivedChecksumByte}. The emoji sequence may be corrupted.`);
  }
  
  // Use algosdk to encode the 32-byte public key back to a proper Algorand address
  // This will automatically calculate and append the correct checksum
  return algosdk.encodeAddress(publicKeyBytes);
}