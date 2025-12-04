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

function openRegistration() {
    document.getElementById('registrationModal').classList.add('active');
}

function closeRegistration() {
    document.getElementById('registrationModal').classList.remove('active');
}

function switchToRegistration() {
    closeUserLogin();
    openRegistration();
}

function switchToLogin() {
    closeRegistration();
    openUserLogin();
}

function openForgotPassword() {
    closeUserLogin();
    document.getElementById('forgotPasswordModal').classList.add('active');
}

function closeForgotPassword() {
    document.getElementById('forgotPasswordModal').classList.remove('active');
}

function openChangePassword() {
    document.getElementById('changePasswordModal').classList.add('active');
}

function closeChangePassword() {
    document.getElementById('changePasswordModal').classList.remove('active');
}

// Authentication functions
function checkAuthAndRedirect(page) {
    if (localStorage.getItem('userLoggedIn') === 'true') {
        window.location.href = page;
    } else {
        localStorage.setItem('intendedPage', page);
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
        
        // Get registered users from localStorage
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        
        // Sample default users
        const defaultUsers = {
            'farmer1': 'pass123',
            'ravi': 'ravi123',
            'priya': 'priya123',
            'kumar': 'kumar123'
        };
        
        const allUsers = {...defaultUsers, ...registeredUsers};
        
        if (allUsers[username] && allUsers[username] === password) {
            localStorage.setItem('userLoggedIn', 'true');
            localStorage.setItem('currentUser', username);
            
            const intendedPage = localStorage.getItem('intendedPage');
            if (intendedPage) {
                localStorage.removeItem('intendedPage');
                window.location.href = intendedPage;
            } else {
                alert(currentLanguage === 'kn' ? 
                    'ಬಳಕೆದಾರ ಲಾಗಿನ್ ಯಶಸ್ವಿಯಾಗಿದೆ!' : 
                    'User login successful!');
                closeUserLogin();
            }
        } else {
            let attempts = parseInt(localStorage.getItem('loginAttempts') || '0') + 1;
            localStorage.setItem('loginAttempts', attempts.toString());
            
            if (attempts >= 2) {
                document.getElementById('forgotPasswordLink').style.display = 'block';
            }
            
            alert(currentLanguage === 'kn' ? 
                'ತಪ್ಪು ಬಳಕೆದಾರ ಹೆಸರು ಅಥವಾ ಪಾಸ್ವರ್ಡ್!' : 
                'Invalid username or password!');
        }
    });
    
    // Registration form
    document.getElementById('registrationForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const fullName = document.getElementById('regFullName').value;
        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('regConfirmPassword').value;
        
        if (password !== confirmPassword) {
            alert(currentLanguage === 'kn' ? 
                'ಪಾಸ್ವರ್ಡ್ ಮತ್ತು ನಿರ್ಧಾರಣೆ ಪಾಸ್ವರ್ಡ್ ಸಮಾನವಾಗಿಲ್ಲ' : 
                'Password and confirm password do not match');
            return;
        }
        
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        
        if (registeredUsers[username]) {
            alert(currentLanguage === 'kn' ? 
                'ಈ ಬಳಕೆದಾರ ಹೆಸರು ಈಗಾಗಲೇ ಅಸ್ತಿತ್ವದೆ' : 
                'Username already exists');
            return;
        }
        
        registeredUsers[username] = password;
        localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
        
        alert(currentLanguage === 'kn' ? 
            'ನೋಂದಣಿ ಯಶಸ್ವಿಯಾಗಿದೆ! ಇಪ್ಪುದು ಲಾಗಿನ್ ಮಾಡಿ' : 
            'Registration successful! You can now login');
        
        closeRegistration();
        document.getElementById('registrationForm').reset();
    });
    
    // Forgot password form
    document.getElementById('forgotPasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const username = document.getElementById('forgotUsername').value;
        const newPassword = document.getElementById('forgotNewPassword').value;
        const confirmPassword = document.getElementById('forgotConfirmPassword').value;
        
        if (newPassword !== confirmPassword) {
            alert(currentLanguage === 'kn' ? 
                'ಪಾಸ್ವರ್ಡ್ ಮತ್ತು ನಿರ್ಧಾರಣೆ ಪಾಸ್ವರ್ಡ್ ಸಮಾನವಾಗಿಲ್ಲ' : 
                'Password and confirm password do not match');
            return;
        }
        
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        
        if (registeredUsers[username]) {
            registeredUsers[username] = newPassword;
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            localStorage.removeItem('loginAttempts');
            
            alert(currentLanguage === 'kn' ? 
                'ಪಾಸ್ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ರೀಸೆಟ್ ಮಾಡಲಾಗಿದೆ!' : 
                'Password reset successfully!');
            
            closeForgotPassword();
            document.getElementById('forgotPasswordForm').reset();
        } else {
            alert(currentLanguage === 'kn' ? 
                'ಬಳಕೆದಾರ ಹೆಸರು ಕಂಡುಬಂದಿಲ್ಲ' : 
                'Username not found');
        }
    });
    
    // Change password form
    document.getElementById('changePasswordForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const currentPassword = document.getElementById('currentPassword').value;
        const newPassword = document.getElementById('newPassword').value;
        const confirmPassword = document.getElementById('confirmNewPassword').value;
        const currentUser = localStorage.getItem('currentUser');
        
        if (newPassword !== confirmPassword) {
            alert(currentLanguage === 'kn' ? 
                'ಪಾಸ್ವರ್ಡ್ ಮತ್ತು ನಿರ್ಧಾರಣೆ ಪಾಸ್ವರ್ಡ್ ಸಮಾನವಾಗಿಲ್ಲ' : 
                'Password and confirm password do not match');
            return;
        }
        
        const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '{}');
        
        if (registeredUsers[currentUser] && registeredUsers[currentUser] === currentPassword) {
            registeredUsers[currentUser] = newPassword;
            localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
            
            alert(currentLanguage === 'kn' ? 
                'ಪಾಸ್ವರ್ಡ್ ಯಶಸ್ವಿಯಾಗಿ ಬದಲಾಗಿದೆ!' : 
                'Password changed successfully!');
            
            closeChangePassword();
            document.getElementById('changePasswordForm').reset();
        } else {
            alert(currentLanguage === 'kn' ? 
                'ಸದ್ಯದ ಪಾಸ್ವರ್ಡ್ ತಪ್ಪು' : 
                'Current password is incorrect');
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