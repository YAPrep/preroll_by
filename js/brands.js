// =======================================================
// КАРУСЕЛЬ БРЕНДОВ: ПОЛНЫЙ АППАРАТНЫЙ ИНТЕРАКТИВ (МЫШЬ + ПАЛЕЦ)
// =======================================================
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.querySelector('.ticker-wrapper');
    const ticker = document.querySelector('.ticker');
    if (!slider || !ticker) return;

    let isDown = false;
    let startX;
    let baseTranslateX = 0; 
    let currentX = 0;       
    let speed = 0.75; // Скорость автопрокрутки (выше = быстрее)

    // Функция плавной автопрокрутки (на видеокарте)
    function animate() {
        if (!isDown) { // Бежит сама, только когда юзер НЕ держит её пальцем
            const halfWidth = ticker.scrollWidth / 2;

            if (halfWidth > 0) {
                currentX -= speed;

                // Бесшовный циклический сброс
                if (Math.abs(currentX) >= halfWidth) {
                    currentX = 0;
                }

                ticker.style.transform = `translate3d(${currentX}px, 0, 0)`;
            }
        }
        requestAnimationFrame(animate);
    }

    // --- 1. РУЧНОЙ ТАЧ ПАЛЬЦЕМ (ДЛЯ ТЕЛЕФОНОВ) ---
    slider.addEventListener('touchstart', (e) => {
        isDown = true;
        startX = e.touches[0].pageX; // Фиксируем точку касания первого пальца
        baseTranslateX = currentX;
    }, { passive: true });

    slider.addEventListener('touchend', () => {
        isDown = false;
    }, { passive: true });

    slider.addEventListener('touchmove', (e) => {
        if (!isDown) return;
        
        // Считаем, на сколько пикселей палец сдвинулся от старта
        const dragDistance = e.touches[0].pageX - startX;
        let targetX = baseTranslateX + dragDistance;

        // Математика бесконечной петли при ручном перетаскивании
        const halfWidth = ticker.scrollWidth / 2;
        if (targetX > 0) targetX -= halfWidth;
        if (Math.abs(targetX) >= halfWidth) targetX += halfWidth;

        currentX = targetX;
        ticker.style.transform = `translate3d(${currentX}px, 0, 0)`;
    }, { passive: true });


    // --- 2. РУЧНОЙ ТАЧ МЫШКОЙ (ДЛЯ ПК) ---
    slider.addEventListener('mousedown', (e) => {
        isDown = true;
        ticker.style.cursor = 'grabbing';
        startX = e.pageX;
        baseTranslateX = currentX;
    });

    window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        ticker.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        
        const dragDistance = e.pageX - startX;
        let targetX = baseTranslateX + dragDistance;

        const halfWidth = ticker.scrollWidth / 2;
        if (targetX > 0) targetX -= halfWidth;
        if (Math.abs(targetX) >= halfWidth) targetX += halfWidth;

        currentX = targetX;
        ticker.style.transform = `translate3d(${currentX}px, 0, 0)`;
    });

    // Стартуем бесконечный цикл
    animate();
});