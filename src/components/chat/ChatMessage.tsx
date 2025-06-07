
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, AlertCircle, BookOpen, Brain, PenTool, Lightbulb, Globe, Rocket } from 'lucide-react';

interface ChatMessageProps {
  message: {
    role: 'user' | 'bot';
    content: string;
    timestamp: Date;
    isError?: boolean;
  };
}

// Function to get appropriate icon for sections
const getSectionIcon = (title: string) => {
  if (title.toLowerCase().includes('academic')) return <BookOpen className="h-4 w-4" />;
  if (title.toLowerCase().includes('study')) return <Brain className="h-4 w-4" />;
  if (title.toLowerCase().includes('writing')) return <PenTool className="h-4 w-4" />;
  if (title.toLowerCase().includes('problem')) return <Lightbulb className="h-4 w-4" />;
  if (title.toLowerCase().includes('language')) return <Globe className="h-4 w-4" />;
  if (title.toLowerCase().includes('support') || title.toLowerCase().includes('moral')) return <Rocket className="h-4 w-4" />;
  return <BookOpen className="h-4 w-4" />;
};

// Function to format the message with enhanced UI
const formatMessageContent = (content: string) => {
  // Remove <think> tags and their content
  const cleanContent = content.replace(/<think>[\s\S]*?<\/think>/g, '');
  
  // Split content into sections
  const sections = cleanContent.split(/### /);
  
  return sections.map((section, idx) => {
    if (idx === 0 && !section.trim()) return null;
    
    if (idx === 0) {
      // This is content before the first ###
      return (
        <div key={idx} className="mb-4">
          {formatParagraph(section)}
        </div>
      );
    }
    
    // This is a section starting with ###
    const lines = section.split('\n').filter(line => line.trim());
    if (lines.length === 0) return null;
    
    const titleLine = lines[0];
    const titleMatch = titleLine.match(/\*\*(.*?)\*\*/);
    const icon = titleMatch ? titleMatch[1] : '';
    const title = titleLine.replace(/\*\*(.*?)\*\*/, '').replace(/📚|🧠|✍️|💡|🌍|🚀/g, '').trim();
    
    const contentLines = lines.slice(1);
    
    return (
      <div key={idx} className="mb-6 bg-muted/30 rounded-lg p-4 border border-border/50">
        <div className="flex items-center gap-2 mb-3">
          {getSectionIcon(title)}
          <h4 className="font-semibold text-foreground flex items-center gap-2">
            {icon && <span className="text-lg">{icon}</span>}
            {title}
          </h4>
        </div>
        <div className="space-y-2">
          {contentLines.map((line, lineIdx) => {
            if (line.startsWith('**') && line.endsWith('**:')) {
              // Subsection header
              const subsectionTitle = line.replace(/\*\*/g, '').replace(':', '');
              return (
                <h5 key={lineIdx} className="font-medium text-sm text-primary mt-3 mb-1">
                  {subsectionTitle}
                </h5>
              );
            } else if (line.trim()) {
              return (
                <div key={lineIdx} className="text-sm text-muted-foreground">
                  {formatParagraph(line)}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    );
  }).filter(Boolean);
};

// Function to format individual paragraphs
const formatParagraph = (text: string) => {
  // Handle bold text
  let formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  
  // Handle italic text
  formatted = formatted.replace(/\*(.*?)\*/g, '<em>$1</em>');
  
  // Handle inline code
  formatted = formatted.replace(/`(.*?)`/g, '<code class="bg-muted px-1 py-0.5 rounded text-sm font-mono">$1</code>');
  
  // Handle questions in quotes
  formatted = formatted.replace(/"(.*?)"/g, '<span class="bg-primary/10 px-2 py-1 rounded text-primary font-medium text-sm">"$1"</span>');
  
  // Handle emojis at the end
  formatted = formatted.replace(/(😊|😄|🎉|👍|💪|🚀)$/, '<span class="text-lg ml-1">$1</span>');
  
  return <span dangerouslySetInnerHTML={{ __html: formatted }} />;
};

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isBot = message.role === 'bot';
  const isError = message.isError;
  
  return (
    <div className={`flex gap-3 mb-6 ${isBot ? '' : 'flex-row-reverse'}`}>
      <div className="flex-shrink-0 mt-1">
        {isBot ? (
          <Avatar className="h-8 w-8">
            <AvatarImage src="/logo.png" alt="AI Assistant" />
            <AvatarFallback className="bg-primary text-primary-foreground text-xs font-medium">
              AI
            </AvatarFallback>
          </Avatar>
        ) : (
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              <User className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
        )}
      </div>
      
      <div 
        className={`rounded-lg p-4 max-w-[85%] ${
          isBot 
            ? isError 
              ? 'bg-destructive/10 border border-destructive/20 text-destructive-foreground' 
              : 'bg-background border border-border shadow-sm' 
            : 'bg-primary text-primary-foreground ml-auto'
        }`}
      >
        <div className="text-xs font-medium mb-2 flex items-center gap-1 opacity-80">
          {isBot && isError && <AlertCircle className="h-3 w-3" />}
          {isBot ? 'AI Mentor' : 'You'}
          <span className="ml-auto">
            {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
        
        <div className="space-y-2">
          {isBot ? formatMessageContent(message.content) : formatParagraph(message.content)}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
