'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import toast from 'react-hot-toast';

interface UseSpeechRecognitionProps {
  onTranscript?: (transcript: string, isFinal: boolean) => void;
}

export function useSpeechRecognition({
  onTranscript,
}: UseSpeechRecognitionProps = {}) {
  const [isListening, setIsListening] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Check if SpeechRecognition is supported
    if (typeof window !== 'undefined') {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      
      if (SpeechRecognition) {
        setIsSupported(true);
      }
    }
  }, []);

  const startListening = useCallback(() => {
    if (!isSupported) {
      toast.error('Speech recognition is not supported in your browser. Try Chrome or Edge.');
      return;
    }

    if (isListening) {
      console.log('Already listening');
      return;
    }

    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;
      
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true; // Enable interim results for real-time
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        console.log('Speech recognition started');
        setIsListening(true);
        toast.success('🎤 Listening...');
      };

      recognitionRef.current.onresult = (event: any) => {
        console.log('Speech result received');
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];
          const transcript = result[0].transcript;
          const isFinal = result.isFinal;
          
          console.log('Transcript:', transcript, 'isFinal:', isFinal);
          
          if (onTranscript && transcript.trim()) {
            onTranscript(transcript.trim(), isFinal);
          }
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        
        if (event.error === 'not-allowed' || event.error === 'permission-denied') {
          toast.error('Microphone permission denied');
          setIsListening(false);
        } else if (event.error === 'no-speech') {
          // Don't show error for no-speech, it's normal
          console.log('No speech detected');
        } else if (event.error !== 'aborted') {
          toast.error(`Error: ${event.error}`);
          setIsListening(false);
        }
      };

      recognitionRef.current.onend = () => {
        console.log('Speech recognition ended');
        
        // Only restart if we're still supposed to be listening
        if (isListening && recognitionRef.current) {
          console.log('Restarting speech recognition...');
          try {
            recognitionRef.current.start();
          } catch (error) {
            console.error('Failed to restart:', error);
            setIsListening(false);
          }
        } else {
          setIsListening(false);
        }
      };

      recognitionRef.current.start();
    } catch (error) {
      console.error('Error starting recognition:', error);
      toast.error('Failed to start listening');
      setIsListening(false);
    }
  }, [isSupported, isListening, onTranscript]);

  const stopListening = useCallback(() => {
    console.log('Stopping speech recognition');
    setIsListening(false);
    
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
        recognitionRef.current = null;
        toast('Stopped listening', { icon: '🛑' });
      } catch (error) {
        console.error('Error stopping recognition:', error);
      }
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (error) {
          console.error('Cleanup error:', error);
        }
      }
    };
  }, []);

  return {
    isListening,
    isSupported,
    startListening,
    stopListening,
  };
}
