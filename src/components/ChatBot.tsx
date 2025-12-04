import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
}

// Simple knowledge base for demo purposes
const knowledgeBase = {
  en: {
    rice: 'Rice is a Kharif crop best planted in June-August. It requires high water (flooding) and grows well in temperatures of 20-35°C. Harvest after 4-5 months when grains are golden.',
    wheat: 'Wheat is a Rabi crop planted in October-December. It needs moderate water and cool temperatures (10-25°C). Harvest in 4-5 months when stalks turn golden brown.',
    pest: 'For natural pest control, try neem oil spray (5ml per liter water), marigold companion planting, or yellow sticky traps. Avoid chemical pesticides when possible.',
    water: 'Use drip irrigation to save 60% water. Water early morning to reduce evaporation. Apply mulch to retain soil moisture.',
    soil: 'Test soil every 2-3 years. Add organic compost to improve structure. Practice crop rotation with legumes to restore nitrogen.',
    default: 'I can help with questions about crops, planting seasons, pest control, water management, and farming tips. What would you like to know?'
  },
  kn: {
    rice: 'ಭತ್ತ ಖರೀಫ್ ಬೆಳೆ, ಜೂನ್-ಆಗಸ್ಟ್‌ನಲ್ಲಿ ನೆಡಲು ಉತ್ತಮ. ಹೆಚ್ಚು ನೀರು (ಪ್ರವಾಹ) ಬೇಕು ಮತ್ತು 20-35°C ತಾಪಮಾನದಲ್ಲಿ ಚೆನ್ನಾಗಿ ಬೆಳೆಯುತ್ತದೆ. ಕಾಳುಗಳು ಚಿನ್ನದ ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ 4-5 ತಿಂಗಳ ನಂತರ ಕೊಯ್ಲು.',
    wheat: 'ಗೋಧಿ ರಬಿ ಬೆಳೆ, ಅಕ್ಟೋಬರ್-ಡಿಸೆಂಬರ್‌ನಲ್ಲಿ ನೆಡಲಾಗುತ್ತದೆ. ಮಧ್ಯಮ ನೀರು ಮತ್ತು ತಂಪು ತಾಪಮಾನ (10-25°C) ಬೇಕು. ತಂಡುಗಳು ಚಿನ್ನದ ಕಂದು ಬಣ್ಣಕ್ಕೆ ತಿರುಗಿದಾಗ 4-5 ತಿಂಗಳಲ್ಲಿ ಕೊಯ್ಲು.',
    pest: 'ನೈಸರ್ಗಿಕ ಕೀಟ ನಿಯಂತ್ರಣಕ್ಕೆ, ಬೇವಿನ ಎಣ್ಣೆ ಸ್ಪ್ರೇ (ಪ್ರತಿ ಲೀಟರ್ ನೀರಿಗೆ 5ml), ಚೆಂಡು ಹೂವು ಸಹ ನೆಡುವಿಕೆ, ಅಥವಾ ಹಳದಿ ಅಂಟು ಬಲೆಗಳನ್ನು ಪ್ರಯತ್ನಿಸಿ.',
    water: 'ಹನಿ ನೀರಾವರಿ ಬಳಸಿ 60% ನೀರನ್ನು ಉಳಿಸಿ. ಆವಿಯಾಗುವಿಕೆ ಕಡಿಮೆ ಮಾಡಲು ಬೆಳಿಗ್ಗೆ ಬೇಗ ನೀರು ಹಾಕಿ. ಮಣ್ಣಿನ ತೇವಾಂಶವನ್ನು ಉಳಿಸಿಕೊಳ್ಳಲು ಹೊದಿಕೆ ಹಾಕಿ.',
    soil: 'ಪ್ರತಿ 2-3 ವರ್ಷಗಳಿಗೊಮ್ಮೆ ಮಣ್ಣು ಪರೀಕ್ಷಿಸಿ. ರಚನೆ ಸುಧಾರಿಸಲು ಸಾವಯವ ಕಾಂಪೋಸ್ಟ್ ಸೇರಿಸಿ. ಸಾರಜನಕ ಪುನಃಸ್ಥಾಪಿಸಲು ದ್ವಿದಳ ಧಾನ್ಯಗಳೊಂದಿಗೆ ಬೆಳೆ ಸರದಿ ಅಭ್ಯಾಸ ಮಾಡಿ.',
    default: 'ನಾನು ಬೆಳೆಗಳು, ನೆಡುವ ಋತುಗಳು, ಕೀಟ ನಿಯಂತ್ರಣ, ನೀರು ನಿರ್ವಹಣೆ ಮತ್ತು ಕೃಷಿ ಸಲಹೆಗಳ ಬಗ್ಗೆ ಪ್ರಶ್ನೆಗಳಿಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ. ನೀವು ಏನು ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?'
  }
};

const getResponse = (message: string, lang: 'en' | 'kn'): string => {
  const lowerMsg = message.toLowerCase();
  const kb = knowledgeBase[lang];
  
  if (lowerMsg.includes('rice') || lowerMsg.includes('ಭತ್ತ')) return kb.rice;
  if (lowerMsg.includes('wheat') || lowerMsg.includes('ಗೋಧಿ')) return kb.wheat;
  if (lowerMsg.includes('pest') || lowerMsg.includes('insect') || lowerMsg.includes('ಕೀಟ')) return kb.pest;
  if (lowerMsg.includes('water') || lowerMsg.includes('irrigation') || lowerMsg.includes('ನೀರು')) return kb.water;
  if (lowerMsg.includes('soil') || lowerMsg.includes('ಮಣ್ಣು')) return kb.soil;
  
  return kb.default;
};

const ChatBot = () => {
  const { t, language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Add welcome message
      setMessages([{
        id: 'welcome',
        text: t('chatWelcome'),
        sender: 'bot'
      }]);
    }
  }, [isOpen, messages.length, t]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: input,
      sender: 'user'
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1200));

    const response = getResponse(input, language);
    
    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'bot'
    };

    setIsTyping(false);
    setMessages(prev => [...prev, botMessage]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full',
          'bg-gradient-hero shadow-lg',
          'flex items-center justify-center',
          'transition-all duration-300 hover:scale-110',
          'hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]',
          isOpen ? 'rotate-180' : 'animate-pulse-glow'
        )}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X className="h-7 w-7 text-primary-foreground" />
        ) : (
          <MessageCircle className="h-7 w-7 text-primary-foreground" />
        )}
      </button>

      {/* Chat Window */}
      <div
        className={cn(
          'fixed bottom-24 right-6 z-50 w-[90vw] max-w-md',
          'bg-card rounded-2xl shadow-2xl border border-border overflow-hidden',
          'transition-all duration-300 transform-gpu',
          isOpen
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-4 scale-95 pointer-events-none'
        )}
      >
        {/* Header */}
        <div className="bg-gradient-hero p-4 text-primary-foreground">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
              <span className="text-2xl">🤖</span>
            </div>
            <div>
              <h3 className={`font-bold ${language === 'kn' ? 'font-kannada' : ''}`}>
                {t('chatTitle')}
              </h3>
              <p className={`text-sm opacity-90 ${language === 'kn' ? 'font-kannada' : ''}`}>
                {t('chatSubtitle')}
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="h-80 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={cn(
                'flex animate-fade-in-up',
                msg.sender === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              <div
                className={cn(
                  'max-w-[80%] rounded-2xl px-4 py-3',
                  msg.sender === 'user'
                    ? 'bg-primary text-primary-foreground rounded-br-md'
                    : 'bg-card border border-border rounded-bl-md shadow-sm',
                  language === 'kn' ? 'font-kannada' : ''
                )}
              >
                {msg.text}
              </div>
            </div>
          ))}
          
          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex justify-start animate-fade-in">
              <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                <div className="flex gap-1.5">
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                  <span className="typing-dot" />
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-4 bg-card border-t border-border">
          <div className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chatPlaceholder')}
              className={cn(
                'flex-1 px-4 py-3 rounded-xl bg-muted border border-input',
                'focus:outline-none focus:ring-2 focus:ring-primary',
                'transition-all duration-200',
                language === 'kn' ? 'font-kannada' : ''
              )}
            />
            <Button
              onClick={sendMessage}
              disabled={!input.trim() || isTyping}
              variant="hero"
              size="icon"
              className="h-12 w-12 rounded-xl"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatBot;
