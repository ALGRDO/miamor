document.addEventListener('DOMContentLoaded', () => {
    const mainCard = document.querySelector('.card-container');
    const openButton = document.querySelector('.open-button');
    const cardBack = document.querySelector('.card-back');
    const letterContent = document.querySelector('.letter-content');
    
    // Nuevos elementos del carrusel
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

    // Observer para la carta
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                mainCard.classList.add('visible');
                cardObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    cardObserver.observe(mainCard);

    // Observer para el carrusel
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

    // Lógica de navegación del carrusel
    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth + 20; // 20px de padding
            carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth + 20; // 20px de padding
            carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });

    // Añadir el listener para el scroll en el carrusel (para actualizar el índice)
    carouselTrack.addEventListener('scroll', () => {
        const imageWidth = images[0].offsetWidth + 20;
        currentIndex = Math.round(carouselTrack.scrollLeft / imageWidth);
        updateNavButtons();
    });

    // Actualiza los botones al cargar la página
    updateNavButtons();
});