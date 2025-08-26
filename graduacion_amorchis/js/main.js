document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.querySelector('.card-container');
    const openButton = document.querySelector('.open-button');
    const cardBack = document.querySelector('.card-back');
    const letterContent = document.querySelector('.letter-content');
    const headerMessage = document.querySelector('.header-message');

    const carouselSection = document.querySelector('.carousel-section');
    const carouselTrack = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;

    // Función para actualizar los botones de navegación
    const updateNavButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === images.length - 1;
    };

    // Observer para el mensaje de cabecera que controla la aparición de la carta
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Cuando el mensaje inicial sale de la vista (isIntersecting es false)
            if (!entry.isIntersecting) {
                // Hacemos visible la tarjeta
                mainCard.classList.add('visible');
                // Dejamos de observar este elemento para no ejecutar el código repetidamente
                headerObserver.unobserve(entry.target);
            }
        });
    }, {
        // El umbral se establece en 0.1, lo que significa que se activa cuando el 10% del elemento ya no es visible.
        threshold: 0.1 
    });

    // Empezamos a observar el mensaje de cabecera
    headerObserver.observe(headerMessage);

    // Observer para el carrusel que controla su aparición
    const carouselObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                carouselSection.classList.add('visible');
                carouselObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    carouselObserver.observe(carouselSection);

    // Abrir la carta y revelar el contenido
    openButton.addEventListener('click', () => {
        mainCard.classList.add('open');
        setTimeout(() => {
            cardBack.classList.add('opened');
            const paragraphs = letterContent.querySelectorAll('.paragraph');
            paragraphs.forEach((p, index) => {
                p.style.transitionDelay = `${index * 0.3}s`;
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            });
        }, 1000);
    });

    // Lógica para el botón 'siguiente' del carrusel
    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth + 20; // 20px de padding
            carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });

    // Lógica para el botón 'anterior' del carrusel
    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth + 20; // 20px de padding
            carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });

    // Sincroniza el índice del carrusel con el desplazamiento manual
    carouselTrack.addEventListener('scroll', () => {
        const imageWidth = images[0].offsetWidth + 20; // 20px de padding
        currentIndex = Math.round(carouselTrack.scrollLeft / imageWidth);
        updateNavButtons();
    });

    // Inicializa el estado de los botones al cargar la página
    updateNavButtons();
});
