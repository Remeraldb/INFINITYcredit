// src/hooks/useClickSound.js
import { useRef } from 'react';

export function useClickSound() {
  const audioRef = useRef(null);

  if (!audioRef.current) {
    // Create a single <audio> element with two <source> children
    const audio = document.createElement('audio');
    audio.preload = 'auto';

    // Try MP3 first
    const srcMp3 = document.createElement('source');
    srcMp3.src = '.../src/assets/sounds/click1.mp3';
    srcMp3.type = 'audio/mpeg';
    audio.appendChild(srcMp3);

    // Fallback to WAV
    //const srcWav = document.createElement('source');
    //srcWav.src = '/sounds/click.wav';
    //srcWav.type = 'audio/wav';
    //audio.appendChild(srcWav);

    audioRef.current = audio;
  }

  function play() {
    const audio = audioRef.current.cloneNode(true);
    audio.volume = 0.5;
    audio.play().catch(err => {
      console.warn('Click sound play failed:', err);
    });
  }

  return play;
}
