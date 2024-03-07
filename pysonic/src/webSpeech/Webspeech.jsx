import React from 'react';

const WebSpeech = {
  speak: (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance);
  },
};

export default WebSpeech;
