
import { useState, useRef, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Navbar from '@/components/layout/NavbarWithAI';
import Footer from '@/components/layout/Footer';
import ChatMessage from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { RefreshCw, Copy, MessageCircle, AlertCircle, Info } from 'lucide-react';
import { toast } from 'sonner';

// Define the chat message interface
interface ChatMessageType {
  id: string;
  role: 'user' | 'bot';
  content: string;
  timestamp: Date;
  isError?: boolean;
}

// Define the class and subject options
const classOptions = ['Class 8', 'Class 9', 'Class 10', 'Class 11', 'Class 12'];
const subjectOptions = [
  'Mathematics', 
  'Science', 
  'Physics', 
  'Chemistry', 
  'Biology',
  'English', 
  'Hindi', 
  'Social Studies', 
  'Computer Science',
  'Career Guidance',
  'Public Speaking',
  'Other'
];

const AIChat = () => {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: '1',
      role: 'bot',
      content: 'Hello! I\'m SGK14\'s AI Mentor. How can I help you with your studies today?',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [errorRetries, setErrorRetries] = useState(0);
  const [apiStatus, setApiStatus] = useState<'idle' | 'checking' | 'error' | 'ready'>('idle');

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom when new messages are added
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  // Check API connectivity on component mount
  useEffect(() => {
    checkApiConnection();
  }, []);

  // Function to check API connection
  const checkApiConnection = async () => {
    setApiStatus('checking');
    try {
      // Simple ping message to test connectivity
      const { data, error } = await supabase.functions.invoke('chat-with-gemini', {
        body: {
          message: "ping test",
          studentClass: "test",
          subject: "test",
        },
      });

      if (error) {
        console.error("API connection test failed:", error);
        setApiStatus('error');
        toast.error('Cannot connect to AI service. Please try again later.');
      } else {
        setApiStatus('ready');
      }
    } catch (error) {
      console.error("API connection check error:", error);
      setApiStatus('error');
      toast.error('Cannot connect to AI service. Please try again later.');
    }
  };

  // Handle sending a new message
  const handleSendMessage = async (message: string, format?: string) => {
    if (!message.trim()) return;

    // Generate a unique ID for the message
    const userMessageId = Date.now().toString();

    // Add user message to the chat
    const userMessage: ChatMessageType = {
      id: userMessageId,
      role: 'user',
      content: message,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      console.log("Sending message to AI:", message);
      console.log("With params - Class:", selectedClass, "Subject:", selectedSubject);
      
      // Call the Supabase Edge Function
      const { data, error } = await supabase.functions.invoke('chat-with-gemini', {
        body: {
          message,
          studentClass: selectedClass,
          subject: selectedSubject,
          format
        },
      });

      console.log("Response received:", data);

      if (error) {
        console.error("Supabase function error:", error);
        throw new Error(error.message || "Failed to call the AI assistant. Please try again.");
      }

      if (data.error) {
        console.error("Chat function returned error:", data.error);
        throw new Error(data.error);
      }

      // Add bot response to the chat
      const botMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: data.response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
      setErrorRetries(0); // Reset error counter on success
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Create a default error message
      let errorText = "Sorry, I encountered an error while processing your request. Please try again later.";
      
      // Provide more specific error messages based on the error
      if (error.message && error.message.includes("API key")) {
        errorText = "Sorry, there's an issue with the AI service configuration. Please contact support.";
      } else if (error.message && error.message.includes("rate limit")) {
        errorText = "Sorry, we've reached our usage limit. Please try again in a few minutes.";
      } else if (errorRetries > 2) {
        errorText = "I'm still having trouble connecting to the AI service. You might want to refresh the page or try again later.";
      }
      
      toast.error('Failed to get a response. Please try again.');

      // Add error message to the chat
      const errorBotMessage: ChatMessageType = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: errorText,
        timestamp: new Date(),
        isError: true
      };

      setMessages((prev) => [...prev, errorBotMessage]);
      setErrorRetries(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  // Regenerate the last response
  const handleRegenerateResponse = () => {
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === 'user');
    if (lastUserMessageIndex !== -1) {
      const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
      handleSendMessage(lastUserMessage.content);
    }
  };

  // Simplify the last response
  const handleSimplifyResponse = () => {
    // Find the last user message
    const lastUserMessageIndex = [...messages].reverse().findIndex(m => m.role === 'user');
    if (lastUserMessageIndex !== -1) {
      const lastUserMessage = messages[messages.length - 1 - lastUserMessageIndex];
      handleSendMessage(lastUserMessage.content, 'simplified');
    }
  };

  // Copy the last response to clipboard
  const handleCopyResponse = () => {
    // Find the last bot message
    const lastBotMessage = [...messages].reverse().find(m => m.role === 'bot' && !m.isError);
    if (lastBotMessage) {
      navigator.clipboard.writeText(lastBotMessage.content);
      toast.success('Response copied to clipboard!');
    }
  };

  // Try to reconnect to the API
  const handleRetryConnection = () => {
    checkApiConnection();
    toast.info('Checking connection to AI service...');
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-24 pb-20">
        <div className="container max-w-4xl">
          <h1 className="text-3xl font-bold mb-2">AI Student Mentor</h1>
          <p className="text-muted-foreground mb-6">Ask any study questions, get help with assignments, or seek career guidance.</p>
          
          {apiStatus === 'error' && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-4 flex items-start">
              <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5 mr-3" />
              <div>
                <h3 className="font-medium text-destructive">AI Service Unavailable</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  There's an issue connecting to our AI service. This might be due to server maintenance or configuration issues.
                </p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-2"
                  onClick={handleRetryConnection}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Try Again
                </Button>
              </div>
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="md:col-span-2">
              <label htmlFor="class" className="block text-sm font-medium mb-1">Class (Optional)</label>
              <select
                id="class"
                className="w-full rounded-md border border-input p-2 bg-background"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">Select Class</option>
                {classOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject (Optional)</label>
              <select
                id="subject"
                className="w-full rounded-md border border-input p-2 bg-background"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                <option value="">Select Subject</option>
                {subjectOptions.map((option) => (
                  <option key={option} value={option}>{option}</option>
                ))}
              </select>
            </div>
          </div>
          
          <Card className="mb-4">
            <div className="p-4 bg-primary/5 rounded-t-lg flex items-center">
              <MessageCircle className="mr-2 h-5 w-5 text-primary" />
              <h2 className="font-medium">AI Chat</h2>
              {apiStatus === 'checking' && (
                <span className="ml-auto text-xs text-muted-foreground flex items-center">
                  <Info className="h-3 w-3 mr-1" /> Checking connection...
                </span>
              )}
            </div>
            
            <div 
              ref={chatContainerRef}
              className="p-4 h-[400px] overflow-y-auto"
            >
              {messages.map((message, index) => (
                <div 
                  key={message.id}
                  ref={index === messages.length - 1 ? lastMessageRef : null}
                >
                  <ChatMessage message={message} />
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-center my-4">
                  <div className="flex space-x-2 items-center bg-accent/50 p-3 rounded-md">
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    <span className="ml-2 text-sm text-muted-foreground">Thinking...</span>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 border-t">
              <ChatInput 
                value={inputValue}
                onChange={setInputValue}
                onSend={handleSendMessage}
                disabled={isLoading || apiStatus === 'error'}
                placeholder={apiStatus === 'error' ? "AI service unavailable..." : "Type your question here..."}
              />
            </div>
          </Card>
          
          <div className="flex flex-wrap gap-3 mb-8">
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleRegenerateResponse}
              disabled={isLoading || messages.length <= 1 || apiStatus === 'error'}
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Regenerate Response
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleSimplifyResponse}
              disabled={isLoading || messages.length <= 1 || apiStatus === 'error'}
            >
              Simplify Answer
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={handleCopyResponse}
              disabled={messages.length <= 1}
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Answer
            </Button>
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg text-sm">
            <h3 className="font-medium mb-2">Tips for better responses:</h3>
            <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
              <li>Be specific with your questions</li>
              <li>Select your class and subject for more accurate answers</li>
              <li>For math problems, clearly describe all steps and values</li>
              <li>For conceptual doubts, mention what you already understand</li>
              <li>Use "Simplify Answer" if the response is too complex</li>
            </ul>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AIChat;
