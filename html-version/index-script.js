let currentLanguage = 'en';
let isChatOpen = false;
let chatMessages = [];

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'kn')) {
        currentLanguage = savedLanguage;
    }
    
    // Reload data from localStorage (admin changes)
    loadDataFromStorage();
    
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

async function sendChatMessage() {
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
    
    try {
        const botResponse = await getBotResponse(message);
        hideTypingIndicator();
        const botMessage = {
            id: (Date.now() + 1).toString(),
            text: botResponse,
            sender: 'bot'
        };
        chatMessages.push(botMessage);
        renderChatMessages();
    } catch (error) {
        hideTypingIndicator();
        const errorMessage = {
            id: (Date.now() + 1).toString(),
            text: t('chatError'),
            sender: 'bot'
        };
        chatMessages.push(errorMessage);
        renderChatMessages();
    }
}

async function getBotResponse(message) {
    try {
        return await aiChat.generateResponse(message, currentLanguage);
    } catch (error) {
        console.error('Error getting bot response:', error);
        return aiChat.getFallbackResponse(message, currentLanguage);
    }
}

function renderChatMessages() {
    const messagesContainer = document.getElementById('chatMessages');
    
    messagesContainer.innerHTML = chatMessages.map(message => {
        let formattedText = formatMessageText(message.text);
        return `
            <div class="message ${message.sender}">
                <div class="message-content ${currentLanguage === 'kn' ? 'font-kannada' : ''}">
                    ${formattedText}
                </div>
            </div>
        `;
    }).join('');
    
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function formatMessageText(text) {
    // Convert markdown-style formatting
    let formatted = text
        // Convert **bold** to <strong>
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Convert numbered lists with proper indentation
        .replace(/\n\s*(\d+\.\s+)/g, '<br><span style="margin-left: 0; display: block;">$1')
        // Convert bullet points
        .replace(/\n\s*[-•*]\s+/g, '<br>• ')
        // Convert line breaks
        .replace(/\n/g, '<br>');
    
    // Handle numbered lists at the start
    if (formatted.match(/^\s*(\d+\.\s+)/)) {
        formatted = formatted.replace(/^\s*(\d+\.\s+)/, '<span style="display: block;">$1');
    }
    
    // If text starts with bullet point, add proper formatting
    if (formatted.match(/^\s*[-•*]\s+/)) {
        formatted = '• ' + formatted.replace(/^\s*[-•*]\s+/, '');
    }
    
    // Close any open spans
    if (formatted.includes('<span style="margin-left: 0; display: block;">') || formatted.includes('<span style="display: block;">')) {
        formatted = formatted.replace(/(\d+\.\s+[^<]*?)(<br>|$)/g, '$1</span>$2');
    }
    
    return formatted;
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

// Login Functions
function openUserLogin() {
    document.getElementById('userLoginModal').classList.add('active');
}

function closeUserLogin() {
    document.getElementById('userLoginModal').classList.remove('active');
}

function openAdminLogin() {
    document.getElementById('adminLoginModal').classList.add('active');
}

function closeAdminLogin() {
    document.getElementById('adminLoginModal').classList.remove('active');
}

// Authentication functions
function checkAuthAndRedirect(page) {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        window.location.href = page;
    } else {
        alert(currentLanguage === 'kn' ? 
            'ದಯವಿಟ್ಟು ಮೊದಲು ಲಾಗಿನ್ ಮಾಡಿ' : 
            'Please login first to access this page');
        openUserLogin();
    }
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Handle login forms
document.addEventListener('DOMContentLoaded', function() {
    // User login form
    document.getElementById('userLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('userUsername').value;
        const password = document.getElementById('userPassword').value;
        
        // Sample user credentials
        const validUsers = {
            'Raghu': 'Raghu123',
            'sahana': 'sahana123',
            'priya': 'priya123',
            'kumar': 'kumar123'
        };
        
        if (validUsers[username] && validUsers[username] === password) {
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            alert(currentLanguage === 'kn' ? 
                'ಬಳಕೆದಾರ ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ!' : 
                'User login successful!');
            closeUserLogin();
        } else {
            alert(currentLanguage === 'kn' ? 
                'ತಪ್ಪು ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಪಾಸ್ವರ್ಡ್!\n\nಮಾದರಿ ಲಾಗಿನ್:\nಬಳಕೆದಾರ: farmer1, ಪಾಸ್ವರ್ಡ್: pass123' : 
                'Invalid username or password!\n\nSample Login:\nUsername: farmer1, Password: pass123');
        }
    });
    
    // Admin login form
    document.getElementById('adminLoginForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('adminUsername').value;
        const password = document.getElementById('adminPassword').value;
        
        // Admin authentication
        if (username === 'admin' && password === 'raita123') {
            window.location.href = 'admin.html';
        } else {
            alert(currentLanguage === 'kn' ? 
                'ತಪ್ಪು ಅಡ್ಮಿನ್ ಪ್ರಮಾಣಪತ್ರಗಳು!' : 
                'Invalid admin credentials!');
        }
    });
});