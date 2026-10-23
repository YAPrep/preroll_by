// =======================================================
//// Разворачивание списка станций
// =======================================================

document.addEventListener('DOMContentLoaded', function() {
    const grid = document.getElementById('ru-stations-grid');
    const button = document.getElementById('toggle-ru-btn');
    const fade = document.getElementById('grid-fade-overlay');
    
    if (grid && button && fade) {
        // Устанавливаем стартовую точку
        grid.style.maxHeight = '350px'; 

        button.addEventListener('click', function() {
            if (grid.style.maxHeight === '350px') {
                // Раскрываем (высчитываем полную высоту контента внутри сетки)
                grid.style.maxHeight = grid.scrollHeight + 'px';
                button.textContent = 'Скрыть часть станций';
                fade.style.opacity = '0'; // Убираем размытие нижнего края
            } else {
                // Сворачиваем обратно
                grid.style.maxHeight = '350px';
                button.textContent = 'Показать больше';
                fade.style.opacity = '1'; // Возвращаем размытие
                
                // Плавно возвращаем пользователя к началу блока
                grid.closest('.stations-block').scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
});
