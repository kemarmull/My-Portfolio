
(function () {
    const body = document.body;

    function applyTheme(theme) {
        body.classList.toggle('theme-dark', theme === 'dark');
        localStorage.setItem('siteTheme', theme);
    }

    function applyFontSize(size) {
        body.classList.toggle('font-large', size === 'large');
        localStorage.setItem('siteFontSize', size);
    }

    function initFromStorage() {
        const savedTheme = localStorage.getItem('siteTheme') || 'light';
        const savedFontSize = localStorage.getItem('siteFontSize') || 'normal';
        applyTheme(savedTheme);
        applyFontSize(savedFontSize);
        return { savedTheme, savedFontSize };
    }

    const initial = initFromStorage();

    const themeToggle = document.getElementById('theme-toggle');
    const fontSizeSelect = document.getElementById('font-size');
    const resetButton = document.getElementById('settings-reset');
    const preview = document.getElementById('settings-preview');

    function updatePreview() {
        if (!preview) return;
        const themeLabel = (localStorage.getItem('siteTheme') || 'light') === 'dark' ? 'dark' : 'light';
        const sizeLabel = (localStorage.getItem('siteFontSize') || 'normal') === 'large' ? 'large' : 'normal';
        preview.textContent = `Current: ${themeLabel} theme, ${sizeLabel} text`;
    }

    if (themeToggle) {
        themeToggle.checked = initial.savedTheme === 'dark';
        themeToggle.addEventListener('change', () => {
            const mode = themeToggle.checked ? 'dark' : 'light';
            applyTheme(mode);
            updatePreview();
        });
    }

    if (fontSizeSelect) {
        fontSizeSelect.value = initial.savedFontSize;
        fontSizeSelect.addEventListener('change', () => {
            applyFontSize(fontSizeSelect.value);
            updatePreview();
        });
    }

    if (resetButton) {
        resetButton.addEventListener('click', () => {
            applyTheme('light');
            applyFontSize('normal');
            if (themeToggle) {
                themeToggle.checked = false;
            }
            if (fontSizeSelect) {
                fontSizeSelect.value = 'normal';
            }
            updatePreview();
        });
    }

    updatePreview();
})();
