// --- Инициализация анимаций AOS ---
AOS.init({
    duration: 900,
    once: true,
    offset: 80,
    easing: 'ease-out-cubic'
});


// ============================================================
//  ТАЙМЕР ОБРАТНОГО ОТСЧЁТА
// ============================================================
// Установите дату свадьбы: (Год, Месяц-1, День, Часы, Минуты)
// ВАЖНО: месяц считается с 0! Август = 7
const weddingDate = new Date(2026, 10, 11, 15, 0, 0).getTime();

const timerFunction = setInterval(function () {
    const now = new Date().getTime();
    const distance = weddingDate - now;

    if (distance < 0) {
        clearInterval(timerFunction);
        document.getElementById("countdown").innerHTML =
            '<h3 style="font-family: Cormorant Garamond, serif; font-size: 2rem; color: #5f4d3a;">Свадьба состоялась!</h3>';
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = days < 10 ? "0" + days : days;
    document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
    document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
    document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
}, 1000);


// ============================================================
//  МОДАЛЬНЫЕ ОКНА
// ============================================================
const rsvpModal = document.getElementById('rsvpModal');
const wishlistModal = document.getElementById('wishlistModal');
const openRsvpBtn = document.getElementById('openRsvpBtn');
const openWishlistBtn = document.getElementById('openWishlistBtn');

function openModal(modal) {
    modal.classList.add('active');
    document.body.classList.add('modal-open');
}

function closeModal(modal) {
    modal.classList.remove('active');
    document.body.classList.remove('modal-open');
}

// Открытие
openRsvpBtn.addEventListener('click', () => openModal(rsvpModal));
openWishlistBtn.addEventListener('click', () => openModal(wishlistModal));

// Закрытие по крестику
document.querySelectorAll('[data-close-modal]').forEach(btn => {
    btn.addEventListener('click', function () {
        closeModal(this.closest('.modal-overlay'));
    });
});

// Закрытие по клику вне модального окна
document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', function (e) {
        if (e.target === this) {
            closeModal(this);
        }
    });
});

// Закрытие по Escape
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
        document.querySelectorAll('.modal-overlay.active').forEach(modal => {
            closeModal(modal);
        });
    }
});


// ============================================================
//  ФОРМА RSVP
// ============================================================
const form = document.getElementById('rsvpForm');
const successMessage = document.getElementById('successMessage');
const guestsGroup = document.getElementById('guestsGroup');
const attendanceRadios = document.querySelectorAll('input[name="attendance"]');

// Показываем/скрываем поле "количество гостей"
attendanceRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.value === 'no') {
            guestsGroup.style.display = 'none';
        } else {
            guestsGroup.style.display = 'block';
        }
    });
});

// Отправка формы
form.addEventListener('submit', function (e) {
    e.preventDefault();

    const formData = {
        name: document.getElementById('name').value,
        attendance: document.querySelector('input[name="attendance"]:checked').value,
        guests: document.getElementById('guests').value,
        drinks: document.getElementById('drinks').value,
        comment: document.getElementById('comment').value
    };

    console.log('Данные формы:', formData);

    // Здесь можно добавить отправку на сервер, например через Formspree:
    // fetch('https://formspree.io/f/ваш-код', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(formData)
    // });

    // Скрываем форму, показываем сообщение
    form.style.display = 'none';
    successMessage.style.display = 'block';

    // Автозакрытие через 3.5 сек
    setTimeout(() => {
        closeModal(rsvpModal);
    }, 3500);
});