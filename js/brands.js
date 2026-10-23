// =======================================================
//// Карусель брендов 
// =======================================================


document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.ticker-wrapper');
    const ticker = document.querySelector('.ticker');
    if (!slider || !ticker) return;

    let isDown = false;
    let startX;
    let scrollLeft;
    let autoScrollInterval;

    // 1. ПЕРЕТАСКИВАНИЕ МЫШЬЮ (ДЛЯ ПК)
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        ticker.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
        stopAutoScroll(); // Останавливаем автопрокрутку, когда юзер тащит сам
    });

    slider.addEventListener('mouseleave', () => {
        isDown = false;
        ticker.style.cursor = 'grab';
        startAutoScroll(); // Возвращаем автопрокрутку, если мышь ушла
    });

    slider.addEventListener('mouseup', () => {
        isDown = false;
        ticker.style.cursor = 'grab';
        startAutoScroll(); // Возвращаем автопрокрутку, когда отпустили мышь
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5; // Умножаем на 1.5 для скорости прокрутки
        slider.scrollLeft = scrollLeft - walk;
    });

    // 2. ДЛЯ ТЕЛЕФОНОВ (ПАЛЬЦЕМ)
    // Скролл пальцем работает нативно из-за CSS, но нам нужно временно выключать автопрокрутку
    slider.addEventListener('touchstart', () => {
        stopAutoScroll();
    });

    slider.addEventListener('touchend', () => {
        startAutoScroll();
    });


    // 3. МЯГКАЯ АВТОПРОКРУТКА НА JS (Взамен старой CSS-анимации)
    // Чтобы строка не стояла мертвым грузом, когда её никто не трогает
    function startAutoScroll() {
        if (autoScrollInterval) return;
        
        autoScrollInterval = setInterval(() => {
            // Если доскроллили до конца, плавно возвращаемся в начало
            if (slider.scrollLeft >= (slider.scrollWidth - slider.clientWidth - 1)) {
                slider.scrollLeft = 0;
            } else {
                slider.scrollLeft += 1; // Скорость автопрокрутки (1px за шаг)
            }
        }, 30); // Плавность обновления (примерно 30 кадров в секунду)
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
    }

    // Запускаем автопрокрутку при старте страницы
    startAutoScroll();
});