document.addEventListener('DOMContentLoaded', () => {
    const toggleButton = document.querySelector('.toggle-mode');
    const body = document.body;

    toggleButton.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
    });
});
