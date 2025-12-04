// Global variables
let currentLanguage = 'en';
let currentSection = 'home';
let filteredCrops = [...crops];
let filteredTips = [...tips];
let isChatOpen = false;
let chatMessages = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Load saved language
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'kn')) {
        currentLanguage = savedLanguage;
    }
    
    // Set up event listeners
    setupEventListeners();
    
    // Initialize content
    updateLanguage();
    renderCrops();
    renderTips();
    populateCropSelect();
    
    // Show home section by default
    showSection('home');
    
    // Initialize chat
    initializeChat();
}

function setupEventListeners() {
    // Language toggle
    document.getElementById('langToggle').addEventListener('click', toggleLanguage);
    
    // Mobile menu toggle
    document.getElementById('mobileMenuToggle').addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
        link.addEventListener('click', handleNavigation);
    });
    
    // Crop search and filters
    document.getElementById('cropSearch').addEventListener('input', handleCropSearch);
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', handleCropFilter);
    });
    
    // Tips category filters
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', handleTipsFilter);
    });
    
    // Calendar crop selection
    document.getElementById('cropSelect').addEventListener('change', handleCropSelection);
    
    // Chat functionality
    document.getElementById('chatToggle').addEventListener('click', toggleChat);
    document.getElementById('chatSend').addEventListener('click', sendChatMessage);
    document.getElementById('chatInputField').addEventListener('keypress', handleChatKeypress);
    
    // Scroll event for navbar
    window.addEventListener('scroll', handleScroll);
}

// Language functions
function toggleLanguage() {
    currentLanguage = currentLanguage === 'en' ? 'kn' : 'en';
    localStorage.setItem('language', currentLanguage);
    updateLanguage();
    renderCrops();
    renderTips();
    populateCropSelect();
    updateCalendarView();
}

function updateLanguage() {
    const elements = document.querySelectorAll('[data-key]');
    elements.forEach(element => {
        const key = element.getAttribute('data-key');
        if (translations[currentLanguage][key]) {
            element.textContent = translations[currentLanguage][key];
        }
    });
    
    // Update placeholders
    const placeholderElements = document.querySelectorAll('[data-placeholder]');
    placeholderElements.forEach(element => {
        const key = element.getAttribute('data-placeholder');
        if (translations[currentLanguage][key]) {
            element.placeholder = translations[currentLanguage][key];
        }
    });
    
    // Update font class for Kannada
    document.body.classList.toggle('font-kannada', currentLanguage === 'kn');
    document.documentElement.lang = currentLanguage;
}

function t(key) {
    return translations[currentLanguage][key] || translations.en[key] || key;
}

// Navigation functions
function handleNavigation(e) {
    e.preventDefault();
    const href = e.target.getAttribute('href');
    if (href && href.startsWith('#')) {
        const sectionId = href.substring(1);
        showSection(sectionId);
        closeMobileMenu();
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section-page').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
        currentSection = sectionId;
    }
    
    // Update navigation active state
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
        }
    });
    
    // Scroll to top of section
    if (sectionId !== 'home') {
        document.getElementById(sectionId).scrollIntoView({ behavior: 'smooth' });
    } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

function scrollToFeatures() {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    
    mobileMenu.classList.toggle('active');
    toggle.classList.toggle('active');
}

function closeMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    const toggle = document.getElementById('mobileMenuToggle');
    
    mobileMenu.classList.remove('active');
    toggle.classList.remove('active');
}

function handleScroll() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Crops functions
function handleCropSearch(e) {
    const query = e.target.value.toLowerCase();
    filterCrops(query);
}

function handleCropFilter(e) {
    // Update active filter button
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
    
    if (filteredCrops.length === 0) {
        grid.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; padding: 3rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">🔍</div>
                <p style="font-size: 1.2rem; color: var(--muted-foreground);">
                    ${currentLanguage === 'kn' ? 'ಯಾವುದೇ ಬೆಳೆಗಳು ಕಂಡುಬಂದಿಲ್ಲ' : 'No crops found'}
                </p>
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

// Tips functions
function handleTipsFilter(e) {
    // Update active category button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    const category = e.target.getAttribute('data-category');
    filterTips(category);
}

function filterTips(category = 'all') {
    filteredTips = category === 'all' ? [...tips] : tips.filter(tip => tip.category === category);
    renderTips();
}

function renderTips() {
    const grid = document.getElementById('tipsGrid');
    
    grid.innerHTML = filteredTips.map((tip, index) => `
        <div class="tip-card animate-fade-in-up" style="animation-delay: ${index * 100}ms">
            <span class="tip-category">${getCategoryIcon(tip.category)} ${getCategoryName(tip.category)}</span>
            <h3 class="tip-title ${currentLanguage === 'kn' ? 'font-kannada' : ''}">
                ${currentLanguage === 'kn' ? tip.titleKn : tip.title}
            </h3>
            <p class="tip-content ${currentLanguage === 'kn' ? 'font-kannada' : ''}">
                ${currentLanguage === 'kn' ? tip.descriptionKn : tip.description}
            </p>
        </div>
    `).join('');
}

function getCategoryIcon(category) {
    const icons = {
        soil: '🌱',
        water: '💧',
        pest: '🐛',
        harvest: '🌾',
        general: '📋'
    };
    return icons[category] || '📋';
}

function getCategoryName(category) {
    const categoryKeys = {
        soil: 'tipsCategorySoil',
        water: 'tipsCategoryWater',
        pest: 'tipsCategoryPest',
        harvest: 'tipsCategoryHarvest',
        general: 'tipsCategoryGeneral'
    };
    return t(categoryKeys[category] || 'tipsCategoryGeneral');
}

// Calendar functions
function populateCropSelect() {
    const select = document.getElementById('cropSelect');
    const placeholder = t('selectCrop');
    
    select.innerHTML = `<option value="">${placeholder}</option>` +
        crops.map(crop => `
            <option value="${crop.id}">
                ${currentLanguage === 'kn' ? crop.nameKn : crop.name}
            </option>
        `).join('');
}

function handleCropSelection(e) {
    const cropId = e.target.value;
    if (cropId) {
        const crop = crops.find(c => c.id === cropId);
        if (crop) {
            updateCalendarView(crop.months);
        }
    } else {
        updateCalendarView([]);
    }
}

function updateCalendarView(activeMonths = []) {
    const months = document.querySelectorAll('.month');
    months.forEach((month, index) => {
        const monthNumber = index + 1;
        if (activeMonths.includes(monthNumber)) {
            month.classList.add('active');
        } else {
            month.classList.remove('active');
        }
    });
}

// Chat functions
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
    
    // Add user message
    const userMessage = {
        id: Date.now().toString(),
        text: message,
        sender: 'user'
    };
    
    chatMessages.push(userMessage);
    input.value = '';
    renderChatMessages();
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate bot response delay
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
    
    // Scroll to bottom
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

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add intersection observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animationPlayState = 'running';
        }
    });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.animate-fade-in-up, .animate-fade-in-down').forEach(el => {
    el.style.animationPlayState = 'paused';
    observer.observe(el);
});

// Add loading states and error handling
window.addEventListener('error', function(e) {
    console.error('Application error:', e.error);
});

// Performance optimization: Lazy load images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}