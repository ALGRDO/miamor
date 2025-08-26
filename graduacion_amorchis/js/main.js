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

    const updateNavButtons = () => {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === images.length - 1;
    };

    const headerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                mainCard.classList.add('visible');
                headerObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    headerObserver.observe(headerMessage);

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

    // Abrir la carta y añadir la funcionalidad de desplazamiento automático
    openButton.addEventListener('click', () => {
        mainCard.classList.add('open');
        setTimeout(() => {
            cardBack.classList.add('opened');
            
            // Animación para que los párrafos aparezcan
            const paragraphs = letterContent.querySelectorAll('.paragraph');
            paragraphs.forEach((p, index) => {
                p.style.transitionDelay = `${index * 0.3}s`;
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
            });

            // Lógica de desplazamiento automático
            const totalScrollDuration = 30000; // 30 segundos en milisegundos
            const startTime = Date.now();
            
            const scrollInterval = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const progress = elapsed / totalScrollDuration;

                if (progress >= 1) {
                    // Limpiar el intervalo cuando la animación haya terminado
                    clearInterval(scrollInterval);
                    return;
                }

                // Calcular la posición de desplazamiento actual
                const scrollHeight = cardBack.scrollHeight - cardBack.clientHeight;
                const newScrollTop = scrollHeight * progress;
                cardBack.scrollTop = newScrollTop;

            }, 50); // Mover cada 50 milisegundos para una animación fluida

        }, 1000);
    });

    // Lógica del carrusel (sin cambios)
    nextButton.addEventListener('click', () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth + 20;
            carouselTrack.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentIndex > 0) {
            currentIndex--;
            const imageWidth = images[currentIndex].offsetWidth;
            const scrollAmount = imageWidth + 20;
            carouselTrack.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            updateNavButtons();
        }
    });
    
    carouselTrack.addEventListener('scroll', () => {
        const imageWidth = images[0].offsetWidth + 20;
        currentIndex = Math.round(carouselTrack.scrollLeft / imageWidth);
        updateNavButtons();
    });

    updateNavButtons();
});
