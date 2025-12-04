// Admin credentials (in production, use proper authentication)
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'raita123'
};

let isLoggedIn = false;
let currentEditingCrop = null;
let currentEditingTip = null;

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    checkLoginStatus();
});

function setupEventListeners() {
    // Login form
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    
    // Logout
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);
    
    // Navigation
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', switchSection);
    });
    
    // Add buttons
    document.getElementById('addCropBtn').addEventListener('click', () => openCropModal());
    document.getElementById('addTipBtn').addEventListener('click', () => openTipModal());
    document.getElementById('clearRequestsBtn').addEventListener('click', clearAllRequests);
    
    // Forms
    document.getElementById('cropForm').addEventListener('submit', handleCropSubmit);
    document.getElementById('tipForm').addEventListener('submit', handleTipSubmit);
}

function handleLogin(e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        isLoggedIn = true;
        localStorage.setItem('adminLoggedIn', 'true');
        showAdminPanel();
        loadData();
    } else {
        alert('Invalid credentials!');
    }
}

function handleLogout() {
    isLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    showLoginModal();
}

function checkLoginStatus() {
    if (localStorage.getItem('adminLoggedIn') === 'true') {
        isLoggedIn = true;
        showAdminPanel();
        loadData();
    } else {
        showLoginModal();
    }
}

function showLoginModal() {
    document.getElementById('loginModal').classList.add('active');
    document.getElementById('adminPanel').classList.remove('active');
}

function showAdminPanel() {
    document.getElementById('loginModal').classList.remove('active');
    document.getElementById('adminPanel').classList.add('active');
}

function switchSection(e) {
    const section = e.target.dataset.section;
    
    // Update nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    // Update sections
    document.querySelectorAll('.admin-section').forEach(sec => sec.classList.remove('active'));
    document.getElementById(`${section}-section`).classList.add('active');
}

function loadData() {
    renderCropsTable();
    renderTipsTable();
    renderRequestsTable();
}

function renderCropsTable() {
    const container = document.getElementById('cropsTable');
    
    let html = `
        <div class="table-header crops-grid">
            <div>Name</div>
            <div>Season</div>
            <div>Water Need</div>
            <div>Months</div>
            <div>Image</div>
            <div>Actions</div>
        </div>
    `;
    
    crops.forEach(crop => {
        html += `
            <div class="table-row crops-grid">
                <div class="text-truncate">${crop.name} / ${crop.nameKn}</div>
                <div>${crop.season}</div>
                <div>${crop.waterNeed}</div>
                <div>${crop.months.join(', ')}</div>
                <div>${crop.image}</div>
                <div class="table-actions">
                    <button class="edit-btn" onclick="editCrop('${crop.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteCrop('${crop.id}')">Delete</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function renderTipsTable() {
    const container = document.getElementById('tipsTable');
    
    let html = `
        <div class="table-header tips-grid">
            <div>Title</div>
            <div>Category</div>
            <div>Description</div>
            <div>Actions</div>
        </div>
    `;
    
    tips.forEach(tip => {
        html += `
            <div class="table-row tips-grid">
                <div class="text-truncate">${tip.title}</div>
                <div>${tip.category}</div>
                <div class="text-truncate">${tip.description}</div>
                <div class="table-actions">
                    <button class="edit-btn" onclick="editTip('${tip.id}')">Edit</button>
                    <button class="delete-btn" onclick="deleteTip('${tip.id}')">Delete</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Crop CRUD operations
function openCropModal(crop = null) {
    currentEditingCrop = crop;
    const modal = document.getElementById('cropModal');
    const title = document.getElementById('cropModalTitle');
    
    if (crop) {
        title.textContent = 'Edit Crop';
        fillCropForm(crop);
    } else {
        title.textContent = 'Add New Crop';
        document.getElementById('cropForm').reset();
        document.getElementById('cropId').value = '';
    }
    
    modal.classList.add('active');
}

function closeCropModal() {
    document.getElementById('cropModal').classList.remove('active');
    currentEditingCrop = null;
}

function fillCropForm(crop) {
    document.getElementById('cropId').value = crop.id;
    document.getElementById('cropName').value = crop.name;
    document.getElementById('cropNameKn').value = crop.nameKn;
    document.getElementById('cropSeason').value = crop.season;
    document.getElementById('cropSeasonKn').value = crop.seasonKn;
    document.getElementById('cropWaterNeed').value = crop.waterNeed;
    document.getElementById('cropImage').value = crop.image;
    document.getElementById('cropMonths').value = crop.months.join(',');
    document.getElementById('cropDescription').value = crop.description;
    document.getElementById('cropDescriptionKn').value = crop.descriptionKn;
}

function handleCropSubmit(e) {
    e.preventDefault();
    
    const formData = {
        id: document.getElementById('cropId').value || generateId(),
        name: document.getElementById('cropName').value,
        nameKn: document.getElementById('cropNameKn').value,
        season: document.getElementById('cropSeason').value,
        seasonKn: document.getElementById('cropSeasonKn').value,
        waterNeed: document.getElementById('cropWaterNeed').value,
        image: document.getElementById('cropImage').value,
        months: document.getElementById('cropMonths').value.split(',').map(m => parseInt(m.trim())),
        description: document.getElementById('cropDescription').value,
        descriptionKn: document.getElementById('cropDescriptionKn').value
    };
    
    if (currentEditingCrop) {
        // Update existing crop
        const index = crops.findIndex(c => c.id === currentEditingCrop.id);
        crops[index] = formData;
    } else {
        // Add new crop
        crops.push(formData);
    }
    
    saveToLocalStorage();
    renderCropsTable();
    closeCropModal();
    alert('Crop saved successfully!');
}

function editCrop(id) {
    const crop = crops.find(c => c.id === id);
    if (crop) {
        openCropModal(crop);
    }
}

function deleteCrop(id) {
    if (confirm('Are you sure you want to delete this crop?')) {
        const index = crops.findIndex(c => c.id === id);
        crops.splice(index, 1);
        saveToLocalStorage();
        renderCropsTable();
        alert('Crop deleted successfully!');
    }
}

// Tip CRUD operations
function openTipModal(tip = null) {
    currentEditingTip = tip;
    const modal = document.getElementById('tipModal');
    const title = document.getElementById('tipModalTitle');
    
    if (tip) {
        title.textContent = 'Edit Tip';
        fillTipForm(tip);
    } else {
        title.textContent = 'Add New Tip';
        document.getElementById('tipForm').reset();
        document.getElementById('tipId').value = '';
    }
    
    modal.classList.add('active');
}

function closeTipModal() {
    document.getElementById('tipModal').classList.remove('active');
    currentEditingTip = null;
}

function fillTipForm(tip) {
    document.getElementById('tipId').value = tip.id;
    document.getElementById('tipTitle').value = tip.title;
    document.getElementById('tipTitleKn').value = tip.titleKn;
    document.getElementById('tipCategory').value = tip.category;
    document.getElementById('tipDescription').value = tip.description;
    document.getElementById('tipDescriptionKn').value = tip.descriptionKn;
}

function handleTipSubmit(e) {
    e.preventDefault();
    
    const formData = {
        id: document.getElementById('tipId').value || generateId(),
        title: document.getElementById('tipTitle').value,
        titleKn: document.getElementById('tipTitleKn').value,
        category: document.getElementById('tipCategory').value,
        description: document.getElementById('tipDescription').value,
        descriptionKn: document.getElementById('tipDescriptionKn').value
    };
    
    if (currentEditingTip) {
        // Update existing tip
        const index = tips.findIndex(t => t.id === currentEditingTip.id);
        tips[index] = formData;
    } else {
        // Add new tip
        tips.push(formData);
    }
    
    saveToLocalStorage();
    renderTipsTable();
    closeTipModal();
    alert('Tip saved successfully!');
}

function editTip(id) {
    const tip = tips.find(t => t.id === id);
    if (tip) {
        openTipModal(tip);
    }
}

function deleteTip(id) {
    if (confirm('Are you sure you want to delete this tip?')) {
        const index = tips.findIndex(t => t.id === id);
        tips.splice(index, 1);
        saveToLocalStorage();
        renderTipsTable();
        alert('Tip deleted successfully!');
    }
}

// Utility functions
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function saveToLocalStorage() {
    localStorage.setItem('cropsData', JSON.stringify(crops));
    localStorage.setItem('tipsData', JSON.stringify(tips));
}

// Load data from localStorage on page load
function loadFromLocalStorage() {
    const savedCrops = localStorage.getItem('cropsData');
    const savedTips = localStorage.getItem('tipsData');
    
    if (savedCrops) {
        crops.length = 0;
        crops.push(...JSON.parse(savedCrops));
    }
    
    if (savedTips) {
        tips.length = 0;
        tips.push(...JSON.parse(savedTips));
    }
}

function renderRequestsTable() {
    const container = document.getElementById('requestsTable');
    const requests = JSON.parse(localStorage.getItem('cropRequests') || '[]');
    
    console.log('Rendering requests:', requests); // Debug log
    
    if (requests.length === 0) {
        container.innerHTML = '<div style="padding: 2rem; text-align: center; color: var(--muted-foreground);">No crop requests yet</div>';
        return;
    }
    
    let html = `
        <div class="table-header requests-grid">
            <div>Crop Name</div>
            <div>Request Date</div>
            <div>Actions</div>
        </div>
    `;
    
    requests.forEach(request => {
        const date = new Date(request.timestamp).toLocaleDateString();
        html += `
            <div class="table-row requests-grid">
                <div>${request.cropName}</div>
                <div>${date}</div>
                <div class="table-actions">
                    <button class="delete-btn" onclick="deleteRequest('${request.id}')">Remove</button>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

function deleteRequest(id) {
    const requests = JSON.parse(localStorage.getItem('cropRequests') || '[]');
    const filtered = requests.filter(r => r.id !== id);
    localStorage.setItem('cropRequests', JSON.stringify(filtered));
    renderRequestsTable();
}

function clearAllRequests() {
    if (confirm('Are you sure you want to clear all crop requests?')) {
        localStorage.removeItem('cropRequests');
        renderRequestsTable();
        alert('All requests cleared!');
    }
}

// Load saved data when page loads
loadFromLocalStorage();