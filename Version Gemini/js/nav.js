// Navigation and common utilities
document.addEventListener('DOMContentLoaded', () => {
    console.log('LaunchDarkly Training Portal Initialized');
    
    // Logic for highlighting active nav link
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('nav ul li a');
    
    navLinks.forEach(link => {
        if (currentPath.includes(link.getAttribute('href'))) {
            link.style.textDecoration = 'underline';
        }
    });
});
