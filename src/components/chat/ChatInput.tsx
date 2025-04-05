
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic, MicOff } from 'lucide-react';

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ 
  value, 
  onChange, 
  onSend, 
  disabled = false 
}) => {
  const [recording, setRecording] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Check if speech recognition is supported
  useEffect(() => {
    setSpeechSupported('webkitSpeechRecognition' in window || 'SpeechRecognition' in window);
  }, []);
  
  // Focus the textarea when it mounts
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  }, []);
  
  // Auto-resize the textarea as content grows
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [value]);
  
  // Handle key press events (send on Enter, but allow Shift+Enter for new lines)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (!disabled && value.trim()) {
        onSend(value);
      }
    }
  };
  
  // Start speech recognition
  const startSpeechRecognition = () => {
    if (!speechSupported) return;
    
    setRecording(true);
    
    // Use the appropriate speech recognition API
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      onChange(value + ' ' + transcript);
    };
    
    recognition.onerror = (event: any) => {
      console.error('Speech recognition error', event);
      setRecording(false);
    };
    
    recognition.onend = () => {
      setRecording(false);
    };
    
    recognition.start();
  };
  
  return (
    <div className="flex items-end gap-2">
      <Textarea
        ref={textareaRef}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Type your question here..."
        className="min-h-[60px] max-h-[160px] resize-none"
        disabled={disabled}
      />
      
      <div className="flex flex-col gap-2">
        {speechSupported && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className="rounded-full"
            onClick={startSpeechRecognition}
            disabled={disabled || recording}
          >
            {recording ? (
              <MicOff className="h-5 w-5 text-destructive" />
            ) : (
              <Mic className="h-5 w-5" />
            )}
          </Button>
        )}
        
        <Button
          type="button"
          size="icon"
          className="rounded-full"
          onClick={() => onSend(value)}
          disabled={disabled || !value.trim()}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatInput;
