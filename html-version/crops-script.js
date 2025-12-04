let currentLanguage = 'en';
let filteredCrops = [...crops];
let isChatOpen = false;
let chatMessages = [];

document.addEventListener('DOMContentLoaded', function() {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'kn')) {
        currentLanguage = savedLanguage;
    }
    
    // Reload data from localStorage (admin changes)
    loadDataFromStorage();
    filteredCrops = [...crops];
    
    setupEventListeners();
    updateLanguage();
    renderCrops();
    initializeChat();
});

function setupEventListeners() {
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    document.getElementById('cropSearch').addEventListener('input', handleCropSearch);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleCropFilter);
    });
    document.getElementById('chatToggle').addEventListener('click', toggleChat);
    document.getElementById('chatSend').addEventListener('click', sendChatMessage);
    document.getElementById('chatInputField').addEventListener('keypress', handleChatKeypress);
    window.addEventListener('scroll', handleScroll);
}

function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'kn' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
    renderCrops();
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

function handleCropSearch(e) {
    const query = e.target.value.toLowerCase();
    filterCrops(query);
}

function handleCropFilter(e) {
    document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    const filter = e.target.getAttribute('data-filter');
    filterCrops(document.getElementById('cropSearch').value.toLowerCase(), filter);
}

function filterCrops(searchQuery = '', seasonFilter = 'all') {
    filteredCrops = crops.filter(crop => {
        const name = currentLanguage === 'kn' ? crop.nameKn : crop.name;
        const matchesSearch = name.toLowerCase().includes(searchQuery);
        const matchesSeason = seasonFilter === 'all' || crop.season === seasonFilter;
        return matchesSearch && matchesSeason;
    });
    renderCrops();
}

function renderCrops() {
    const grid = document.getElementById('cropsGrid');
    const searchQuery = document.getElementById('cropSearch').value.trim();
    
    if (filteredCrops.length === 0) {
        const requestBtn = searchQuery ? `
            <button class="btn btn-primary" onclick="requestCrop('${searchQuery}')" style="margin-top: 1rem;">
                ${currentLanguage === 'kn' ? 'ಈ ಬೆಳೆಯ ಮಾಹಿತಿಗಾಗಿ ವಿನಂತಿಸಿ' : 'Request information for this crop'}
            </button>
        ` : '';
        
        grid.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                <p style="font-size: 1.2rem; color: var(--muted-foreground);">
                    ${currentLanguage === 'kn' ? 'ಯಾವುದೇ ಬೆಳೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No crops found'}
                </p>
                ${requestBtn}
            </div>
        `;
        return;
    }
    
    grid.innerHTML = filteredCrops.map((crop, index) => `
        <div class="crop-card animate-fade-in-up" style="animation-delay: ${index * 50}ms">
            <div class="crop-image">
                <span style="transition: transform 0.3s ease;">${crop.image}</span>
            </div>
            <div class="crop-content">
                <h3 class="crop-title ${currentLanguage === 'kn' ? 'font-kannada' : ''}">
                    ${currentLanguage === 'kn' ? crop.nameKn : crop.name}
                </h3>
                <div class="crop-tags">
                    <span class="crop-tag season-tag">
                        ${t('season')}: ${currentLanguage === 'kn' ? crop.seasonKn : crop.season}
                    </span>
                    <span class="crop-tag water-tag">
                        💧 ${t(`water${crop.waterNeed}`)}
                    </span>
                </div>
                <p class="crop-desc ${currentLanguage === 'kn' ? 'font-kannada' : ''}">
                    ${currentLanguage === 'kn' ? crop.descriptionKn : crop.description}
                </p>
                <div class="crop-months">
                    <p class="months-label ${currentLanguage === 'kn' ? 'font-kannada' : ''}">
                        ${t('months')}:
                    </p>
                    <div class="months-list">
                        ${crop.months.map(month => `
                            <span class="month-tag">
                                ${monthNames[currentLanguage][month - 1]}
                            </span>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    `).join('');
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
        // Use AI API if available, otherwise fallback to local responses
        return await aiChat.generateResponse(message, currentLanguage);
    } catch (error) {
        console.error('Error getting bot response:', error);
        return aiChat.getFallbackResponse(message, currentLanguage);
    }
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

function requestCrop(cropName) {
    const requests = JSON.parse(localStorage.getItem('cropRequests') || '[]');
    const request = {
        id: Date.now().toString(),
        cropName: cropName,
        timestamp: new Date().toISOString(),
        status: 'pending'
    };
    
    requests.push(request);
    localStorage.setItem('cropRequests', JSON.stringify(requests));
    
    alert(currentLanguage === 'kn' ? 
        `"${cropName}" ಬೆಳೆಯ ಮಾಹಿತಿಗಾಗಿ ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ಸಲ್ಲಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ಮಾಹಿತಿಯನ್ನು ಸೇರಿಸುತ್ತೇವೆ.` :
        `Your request for "${cropName}" crop information has been submitted. We will add this information soon.`
    );
}