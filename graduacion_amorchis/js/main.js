document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.querySelector('.card-container');
    const openButton = document.querySelector('.open-button');
    const cardBack = document.querySelector('.card-back');
    const letterContent = document.querySelector('.letter-content');
    const headerMessage = document.querySelector('.header-message');

    // Nuevos elementos del carrusel
    const carouselSection = document.querySelector('.carousel-section');
    const carouselTrack = document.querySelector('.carousel-track');
    const nextButton = document.querySelector('.carousel-nav.next');
    const prevButton = document.querySelector('.carousel-nav.prev');
    const images = document.querySelectorAll('.carousel-image');
    let currentIndex = 0;
    let isCardVisible = false;

    // Función para actualizar los botones de navegación
    const updateNavButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === images.length - 1;
    };

    // Nuevo Observer para la cabecera (header)
    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Cuando el mensaje inicial sale de la vista
            if (!entry.isIntersecting && !isCardVisible) {
                mainCard.classList.add('visible');
                isCardVisible = true;
                // Opcional: Desactivar el observer una vez que la tarjeta esté visible
                headerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // Activa el observer cuando el 10% del elemento sea visible
    });

    // Empezamos a observar el mensaje de cabecera
    headerObserver.observe(headerMessage);

    // Observer para el carrusel (mantiene la lógica existente)
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

    // Lógica de navegación del carrusel (mantiene la lógica existente)
    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth;
            carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth;
            carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });
    
    carouselTrack.addEventListener('scroll', () => {
        const imageWidth = images[0].offsetWidth;
        currentIndex = Math.round(carouselTrack.scrollLeft / imageWidth);
        updateNavButtons();
    });

    // Actualiza los botones al cargar la página
    updateNavButtons();
});
