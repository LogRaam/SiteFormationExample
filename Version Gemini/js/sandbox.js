document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleFlagBtn');
    const output = document.getElementById('sandboxOutput');
    let isEnabled = false;

    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            isEnabled = !isEnabled;
            
            if (isEnabled) {
                toggleBtn.textContent = 'Activé';
                toggleBtn.style.backgroundColor = '#98c379'; // Greenish
                output.innerHTML = '> <span class="feature-on">Exécution de la nouvelle logique...</span>';
            } else {
                toggleBtn.textContent = 'Désactivé';
                toggleBtn.style.backgroundColor = '#e06c75'; // Reddish
                output.innerHTML = '> <span class="feature-off">Logique standard active.</span>';
            }
        });
    }
});
