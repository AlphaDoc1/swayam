'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [messages, setMessages] = useState([
    { sender: 'bot', text: 'Hi! How can I help you with Swayam 2024?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleToggle = () => {
    setIsOpen(prev => !prev);
    setIsMinimized(false);
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleSend = async () => {
    if (!userInput.trim()) return;

    // Add user message
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    const input = userInput;
    setUserInput('');

    try {
      setIsTyping(true);
      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userInput: input })
      });

      const data = await response.json();
      
      // Format the bot's response
      const formattedResponse = formatBotResponse(data.reply);
      
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: formattedResponse }
      ]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [
        ...prev,
        { sender: 'bot', text: "Sorry, I'm having trouble connecting to the server. Please try again later." }
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  // Function to format bot responses
  const formatBotResponse = (text) => {
    // Convert markdown-like formatting to HTML
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
      .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
      .replace(/\n/g, '<br />') // Line breaks
      .replace(/```(.*?)```/gs, '<pre><code>$1</code></pre>') // Code blocks
      .replace(/`(.*?)`/g, '<code>$1</code>') // Inline code
      .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'); // Links
  };

  const handleClearChat = () => {
    setMessages([{ sender: 'bot', text: 'Hi! How can I help you with Swayam 2024?' }]);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Icon */}
      <div
        className={`w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-[#C96C1D] to-[#8B3A00] flex items-center justify-center cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300 ${
          isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        onClick={handleToggle}
        role="button"
        aria-label="Open chat"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleToggle();
          }
        }}
      >
        <svg 
          width="24" 
          height="24" 
          viewBox="0 0 24 24" 
          fill="none"
          stroke="#FBEAD3"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      </div>

      {/* Chat Window */}
      <div className={`w-[90vw] md:w-96 ${isMinimized ? 'h-16' : 'h-[70vh] md:h-[600px]'} bg-[#EFE7DE] rounded-xl shadow-2xl flex flex-col transform transition-all duration-300 ${
        isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0 pointer-events-none'
      }`} style={{ 
        position: 'fixed', 
        bottom: '1rem', 
        right: '1rem',
        background: 'radial-gradient(circle at center, #FBEAD3 0%, #C96C1D 50%, #8B3A00 100%)'
      }}>
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-[#C96C1D] to-[#8B3A00] px-4 md:px-6 py-3 md:py-4 rounded-t-xl flex items-center justify-between">
          <h3 className="text-[#FBEAD3] text-lg md:text-xl font-semibold">Swayam Assistant</h3>
          <div className="flex gap-2">
            <button 
              onClick={handleMinimize}
              className="p-1 md:p-2 rounded-full hover:bg-[#FBEAD3]/10 transition-colors duration-200"
              aria-label="Minimize chat"
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="#FBEAD3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 15l7-7 7 7"/>
              </svg>
            </button>
            <button 
              onClick={handleToggle}
              className="p-1 md:p-2 rounded-full hover:bg-[#FBEAD3]/10 transition-colors duration-200"
              aria-label="Close chat"
            >
              <svg 
                width="18" 
                height="18" 
                viewBox="0 0 24 24" 
                fill="none"
                stroke="#FBEAD3"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 6L6 18M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </div>
        
        {!isMinimized && (
          <>
            {/* Chat Messages */}
            <div className="flex-1 p-3 md:p-4 overflow-y-auto space-y-3">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`max-w-[80%] p-2 md:p-3 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-br from-[#FFDAB9] to-[#FFE5B4] text-black ml-auto'
                      : 'bg-gray-100 text-black'
                  }`}
                >
                  <div 
                    className="text-sm"
                    dangerouslySetInnerHTML={{ __html: msg.sender === 'bot' ? formatBotResponse(msg.text) : msg.text }}
                  />
                </div>
              ))}
              {isTyping && (
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-3 md:p-4 border-t border-[#8B3A00]">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-1.5 md:px-4 md:py-2 border border-[#8B3A00] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#C96C1D] focus:border-transparent text-[#FBEAD3] bg-[#8B3A00]/50"
                />
                <button
                  onClick={handleSend}
                  className="p-2 md:p-3 bg-gradient-to-br from-[#C96C1D] to-[#8B3A00] text-[#FBEAD3] rounded-lg hover:opacity-90 transition-opacity duration-200"
                  aria-label="Send message"
                >
                  <svg 
                    width="18" 
                    height="18" 
                    viewBox="0 0 24 24" 
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/>
                  </svg>
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}