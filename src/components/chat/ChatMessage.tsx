
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
  };
}

// Function to format the message with Markdown-like syntax
const formatMessageContent = (content: string) => {
  // Split content into paragraphs
  const paragraphs = content.split('\n\n');
  
  return paragraphs.map((paragraph, idx) => {
    // Check if it's a list
    if (paragraph.match(/^[\d*-][\.\s]/m)) {
      const items = paragraph.split('\n');
      return (
        <ul key={idx} className="list-disc pl-5 my-2">
          {items.map((item, i) => (
            <li key={i}>{item.replace(/^[\d*-][\.\s]\s*/, '')}</li>
          ))}
        </ul>
      );
    }
    
    // Check if it's a heading
    if (paragraph.startsWith('#')) {
      const level = paragraph.match(/^(#+)/)?.[0].length || 1;
      const text = paragraph.replace(/^#+\s*/, '');
      
      if (level === 1) {
        return <h3 key={idx} className="text-lg font-bold my-2">{text}</h3>;
      } else {
        return <h4 key={idx} className="text-base font-semibold my-2">{text}</h4>;
      }
    }
    
    // Regular paragraph
    return <p key={idx} className="my-2">{paragraph}</p>;
  });
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  
  return (
    <div className={`flex gap-3 mb-4 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0 mt-1">
        {isBot ? (
          <Avatar>
            <AvatarImage src="/logo.png" alt="AI Assistant" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        ) : (
          <Avatar>
            <AvatarFallback>
              <User className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      
      <div 
        className={`rounded-lg p-4 max-w-[80%] ${
          isBot 
            ? 'bg-background border border-border' 
            : 'bg-primary text-primary-foreground ml-auto'
        }`}
      >
        <div className="text-sm font-medium mb-1">
          {isBot ? 'AI Mentor' : 'You'}
        </div>
        
        <div className="space-y-1">
          {formatMessageContent(message.content)}
        </div>
        
        <div className="text-xs mt-2 opacity-70">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
