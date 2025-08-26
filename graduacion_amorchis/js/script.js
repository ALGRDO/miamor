document.addEventListener('DOMContentLoaded', () => {
    const button = document.querySelector('.principal');
    const contentWrapper = document.querySelector('.content-wrapper');

    button.addEventListener('click', () => {
        // Muestra el cuadro de alerta
        alert('!! Felicitaciones !! 🎉🎉🎉 mi amor, estoy muy orgulloso de ti 💖💖💖');

        // El código de animación y redirección se ejecuta AHORA, después de que el usuario haga clic en OK
        
        // Añade la animación de salida
        contentWrapper.style.animation = 'fadeOut 1s ease forwards';
        
        // Espera 1 segundo para que la animación termine
        setTimeout(() => {
            // Lanza el confeti desde la posición del botón
            confetti({
                particleCount: 150,
                spread: 120,
                origin: { 
                    x: button.offsetLeft / window.innerWidth, 
                    y: (button.offsetTop + button.offsetHeight) / window.innerHeight 
                }
            });

            // Espera 3 segundos para que el efecto del confeti sea visible antes de redirigir
            setTimeout(() => {
                window.location.href = './pages/main_page.html';
            }, 3000); 
            
        }, 1000); 
    });

    // Animación de salida (para que el botón desaparezca con estilo)
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
        @keyframes fadeOut {
            from { opacity: 1; transform: translateY(0); }
            to { opacity: 0; transform: translateY(20px); }
        }
    `;
    document.head.appendChild(styleSheet);
});