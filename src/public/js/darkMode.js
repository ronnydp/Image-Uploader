const buttonTheme = document.getElementById('button-theme');
const modeIcon = document.getElementById('mode-icon')

buttonTheme.addEventListener('click', () => {
    // Alterna la clase 'dark-mode' en el body
    document.body.classList.toggle('dark-mode');

    // Cambia el texto del botón según el modo actual
    if (document.body.classList.contains('dark-mode')){
        modeIcon.src = '/img/Sun_fill.svg';
    }else{
        modeIcon.src = '/img/Moon_fill.svg';
    }
})