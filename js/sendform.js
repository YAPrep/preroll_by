// =======================================================
//// Отправка сообщения из формы
// =======================================================


const BOT_TOKEN = '5651735192:AAFJtirBsqwXS6aRfpd130bORlUUiAcVpWY';
const CHAT_ID = '988404976';
const API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

// Находим поле телефона на странице
const phoneInput = document.getElementById('user_phone');

// АВТОПОДСТАНОВКА +375 ПРИ КЛИКЕ
phoneInput.addEventListener('focus', function() {
  if (phoneInput.value === '') {
    phoneInput.value = '+375';
  }
});

// ОЧИСТКА, ЕСЛИ ПОЛЬЗОВАТЕЛЬ НИЧЕГО НЕ ВВЕЛ КРОМЕ ПРЕФИКСА
phoneInput.addEventListener('blur', function() {
  if (phoneInput.value === '+375') {
    phoneInput.value = '';
  }
});

document.getElementById('tg-form').addEventListener('submit', async function(e) {
  e.preventDefault();

  // 2. Исправлено под точные id твоих инпутов на сайте
  const name = document.getElementById('user_name').value;
  const phone = document.getElementById('user_phone').value;
  const company = document.getElementById('user_company').value;

// 3. ПРОВЕРКА МАСКИ НОМЕРА ТЕЛЕФОНА (+375 и ровно 9 цифр)
  const phoneRegex = /^\+375\d{9}$/;
  
  if (!phoneRegex.test(phone)) {
    alert('Пожалуйста, введите корректный номер телефона в формате +375XXXXXXXXX (всего 12 символов, без пробелов и дефисов).');
    // Фокусируем курсор на поле телефона, чтобы пользователю было удобно исправить ошибку
    document.getElementById('user_phone').focus();
    return; // Останавливаем выполнение функции, отправка в ТГ не произойдет
  }


  // 4. Красивый текст сообщения с разметкой Markdown
  const text = `*Новая заявка с сайта:*\n*Имя:* ${name}\n*Телефон:* ${phone}\n*Компания:* ${company}`;

  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: text,
        parse_mode: 'Markdown' // Включает поддержку жирного текста через звездочки
      })
    });

    if (response.ok) {
      alert('Сообщение успешно отправлено в Telegram!');
      document.getElementById('tg-form').reset(); // Очищаем форму
    } else {
      alert('Ошибка при отправке! Проверь, запущен ли бот в Telegram.');
    }
  } catch (error) {
    console.error('Ошибка:', error);
    alert('Не удалось отправить сообщение. Ошибка сети.');
  }
});