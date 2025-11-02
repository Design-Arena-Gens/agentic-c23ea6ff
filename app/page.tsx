'use client';

import { useState, useEffect, useRef } from 'react';
import VoiceVisualizer from './components/VoiceVisualizer';
import CommandPanel from './components/CommandPanel';
import AppGrid from './components/AppGrid';
import ChatHistory from './components/ChatHistory';

export default function Home() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [chatHistory, setChatHistory] = useState<Array<{role: string, content: string}>>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<any>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const SpeechSynthesis = window.speechSynthesis;

      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition();
        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setTranscript(transcript);
          handleVoiceCommand(transcript);
        };

        recognitionRef.current.onerror = (event: any) => {
          console.error('Speech recognition error:', event.error);
          setIsListening(false);
        };

        recognitionRef.current.onend = () => {
          setIsListening(false);
        };
      }

      synthRef.current = SpeechSynthesis;
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const speak = (text: string) => {
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.1;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;
      synthRef.current.speak(utterance);
    }
  };

  const handleVoiceCommand = async (command: string) => {
    setIsProcessing(true);
    setChatHistory(prev => [...prev, { role: 'user', content: command }]);

    try {
      const res = await fetch('/api/process-command', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ command }),
      });

      const data = await res.json();
      setResponse(data.response);
      speak(data.response);
      setChatHistory(prev => [...prev, { role: 'assistant', content: data.response }]);
    } catch (error) {
      const errorMsg = 'Sorry, I encountered an error processing your command.';
      setResponse(errorMsg);
      speak(errorMsg);
      setChatHistory(prev => [...prev, { role: 'assistant', content: errorMsg }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome or Edge.');
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setTranscript('');
      setResponse('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-7xl font-bold text-glow mb-4 animate-pulse-slow">
            J.A.R.V.I.S.
          </h1>
          <p className="text-xl text-jarvis-blue/70">
            Just A Rather Very Intelligent System
          </p>
        </div>

        {/* Main Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Voice Visualizer */}
          <div className="lg:col-span-2">
            <div className="glass-effect rounded-2xl p-8">
              <VoiceVisualizer isListening={isListening} isProcessing={isProcessing} />

              <div className="text-center mt-8">
                <button
                  onClick={toggleListening}
                  className={`px-12 py-4 rounded-full text-xl font-semibold transition-all duration-300 ${
                    isListening
                      ? 'bg-red-500 hover:bg-red-600 animate-glow'
                      : 'bg-jarvis-blue hover:bg-jarvis-blue/80 border-glow'
                  } text-white shadow-lg`}
                >
                  {isListening ? '🎤 Listening...' : '🎤 Activate JARVIS'}
                </button>
              </div>

              {transcript && (
                <div className="mt-6 p-4 glass-effect rounded-lg">
                  <p className="text-sm text-jarvis-blue/60 mb-1">You said:</p>
                  <p className="text-lg text-white">{transcript}</p>
                </div>
              )}

              {response && (
                <div className="mt-4 p-4 glass-effect rounded-lg border-l-4 border-jarvis-blue">
                  <p className="text-sm text-jarvis-blue/60 mb-1">JARVIS:</p>
                  <p className="text-lg text-jarvis-blue">{response}</p>
                </div>
              )}
            </div>
          </div>

          {/* Command Panel */}
          <div className="lg:col-span-1">
            <CommandPanel onCommandClick={handleVoiceCommand} />
          </div>
        </div>

        {/* Apps Grid */}
        <div className="mb-8">
          <AppGrid onAppClick={handleVoiceCommand} />
        </div>

        {/* Chat History */}
        {chatHistory.length > 0 && (
          <div className="glass-effect rounded-2xl p-6">
            <ChatHistory history={chatHistory} />
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-jarvis-blue/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-jarvis-blue/10 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '1.5s'}}></div>
      </div>
    </main>
  );
}
