// Authentication check for protected pages
function checkAuthentication() {
    if (localStorage.getItem('userLoggedIn') !== 'true') {
        alert('Please login first to access this page');
        window.location.href = 'index.html';
        return false;
    }
    return true;
}

// Add logout functionality to navigation
function addLogoutButton() {
    const navActions = document.querySelector('.nav-actions');
    if (navActions && localStorage.getItem('userLoggedIn') === 'true') {
        const currentUser = localStorage.getItem('currentUser') || 'User';
        const logoutBtn = document.createElement('button');
        logoutBtn.className = 'lang-toggle';
        logoutBtn.innerHTML = `<span>👤</span><span>${currentUser} | Logout</span>`;
        logoutBtn.onclick = logout;
        navActions.insertBefore(logoutBtn, navActions.firstChild);
    }
}

function logout() {
    localStorage.removeItem('userLoggedIn');
    localStorage.removeItem('currentUser');
    window.location.href = 'index.html';
}

// Run authentication check when page loads
document.addEventListener('DOMContentLoaded', function() {
    if (checkAuthentication()) {
        addLogoutButton();
    }
});