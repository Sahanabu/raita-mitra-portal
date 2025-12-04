let currentLanguage = 'en';
let isChatOpen = false;
let chatMessages = [];

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'kn')) {
        currentLanguage = savedLanguage;
    }
    
    setupEventListeners();
    updateLanguage();
    initializeChat();
});

function setupEventListeners() {
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    document.getElementById('chatToggle').addEventListener('click', toggleChat);
    document.getElementById('chatSend').addEventListener('click', sendChatMessage);
    document.getElementById('chatInputField').addEventListener('keypress', handleChatKeypress);
    window.addEventListener('scroll', handleScroll);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'kn' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
}

function updateLanguage() {
    document.querySelectorAll('[data-key]').forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    document.querySelectorAll('[data-placeholder]').forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    document.body.classList.toggle('font-kannada', currentLanguage === 'kn');
    document.documentElement.lang = currentLanguage;
}

function t(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    mobileMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function initializeChat() {
    chatMessages = [{
        id: 'welcome',
        text: t('chatWelcome'),
        sender: 'bot'
    }];
    renderChatMessages();
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    const chatToggle = document.getElementById('chatToggle');
    
    isChatOpen = !isChatOpen;
    
    if (isChatOpen) {
        chatWindow.classList.add('active');
        chatToggle.classList.add('active');
    } else {
        chatWindow.classList.remove('active');
        chatToggle.classList.remove('active');
    }
}

function handleChatKeypress(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInputField');
    const message = input.value.trim();
    
    if (!message) return;
    
    const userMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user'
    };
    
    chatMessages.push(userMessage);
    input.value = '';
    renderChatMessages();
    
    showTypingIndicator();
    
    setTimeout(() => {
        hideTypingIndicator();
        const botResponse = getBotResponse(message);
        const botMessage = {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            sender: 'bot'
        };
        chatMessages.push(botMessage);
        renderChatMessages();
    }, 1200);
}

function getBotResponse(message) {
    const lowerMsg = message.toLowerCase();
    const kb = knowledgeBase[currentLanguage];
    
    if (lowerMsg.includes('rice') || lowerMsg.includes('ಭತ್ತ')) return kb.rice;
    if (lowerMsg.includes('wheat') || lowerMsg.includes('ಗೋಧಿ')) return kb.wheat;
    if (lowerMsg.includes('pest') || lowerMsg.includes('insect') || lowerMsg.includes('ಕೀಟ')) return kb.pest;
    if (lowerMsg.includes('water') || lowerMsg.includes('irrigation') || lowerMsg.includes('ನೀರು')) return kb.water;
    if (lowerMsg.includes('soil') || lowerMsg.includes('ಮಣ್ಣು')) return kb.soil;
    
    return kb.default;
}

function renderChatMessages() {
    const messagesContainer = document.getElementById('chatMessages');
    
    messagesContainer.innerHTML = chatMessages.map(message => `
        <div class="message ${message.sender}">
            <div class="message-content ${currentLanguage === 'kn' ? 'font-kannada' : ''}">
                ${message.text}
            </div>
        </div>
    `).join('');
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chatMessages');
    const typingIndicator = document.createElement('div');
    typingIndicator.id = 'typingIndicator';
    typingIndicator.className = 'message bot';
    typingIndicator.innerHTML = `
        <div class="typing-indicator">
            <span class="${currentLanguage === 'kn' ? 'font-kannada' : ''}">${t('chatTyping')}</span>
            <div class="typing-dots">
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
                <div class="typing-dot"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingIndicator);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typingIndicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}