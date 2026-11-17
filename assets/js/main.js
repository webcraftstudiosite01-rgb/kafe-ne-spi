// Main JavaScript for Kafe "Ne Spi"
document.addEventListener('DOMContentLoaded', function() {
    // Auto-dismiss alerts after 5 seconds
    const alerts = document.querySelectorAll('.alert-dismissible');
    alerts.forEach(function(alert) {
        setTimeout(function() {
            try {
                const bsAlert = new bootstrap.Alert(alert);
                bsAlert.close();
            } catch (e) {
                alert.style.display = 'none';
            }
        }, 5000);
    });

    // Handle Reservation Form submissions on static site
    const forms = document.querySelectorAll('form');
    forms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            const isReservation = form.querySelector('[name="customer_name"]') || form.querySelector('input[type="date"]');
            const isFeedback = form.querySelector('[name="contact"]') || form.querySelector('textarea');

            if (isReservation) {
                e.preventDefault();
                const nameInput = form.querySelector('[name="customer_name"]');
                const phoneInput = form.querySelector('[name="phone"]');
                const dateInput = form.querySelector('[name="date"]');
                const timeInput = form.querySelector('[name="time"]');
                const guestsInput = form.querySelector('[name="guests_count"]');
                const noteInput = form.querySelector('[name="special_requests"]');

                const name = nameInput ? nameInput.value : 'Гість';
                const phone = phoneInput ? phoneInput.value : '';
                const dateVal = dateInput ? dateInput.value : 'Найближчий час';
                const timeVal = timeInput ? timeInput.value : '';
                const guests = guestsInput ? guestsInput.value : '2';
                const note = noteInput ? noteInput.value : '';

                // Save to localStorage for CRM
                try {
                    const existing = localStorage.getItem('nespi_reservations');
                    const list = existing ? JSON.parse(existing) : [];
                    list.unshift({
                        id: Math.floor(Math.random() * 9000) + 1000,
                        name: name,
                        phone: phone,
                        date: dateVal,
                        time: timeVal,
                        guests: parseInt(guests) || 2,
                        note: note,
                        status: 'new'
                    });
                    localStorage.setItem('nespi_reservations', JSON.stringify(list));
                } catch(err) {}

                alert(`☕ Дякуємо, ${name}!\n\nВашу заявку на бронювання столика прийнято!\nДата: ${dateVal} ${timeVal}\nКількість гостей: ${guests}\n\nЧекаємо на вас у кав'ярні-книгарні «Не спи» на проспекті Злуки, 7 у Тернополі!`);
                form.reset();
            } else if (isFeedback) {
                e.preventDefault();
                alert(`Дякуємо за ваше повідомлення! Ми обов'язково зв'яжемося з вами найближчим часом.`);
                form.reset();
            }
        });
    });
});
