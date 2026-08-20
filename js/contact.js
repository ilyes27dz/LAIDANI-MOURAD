document.addEventListener('DOMContentLoaded', () => {
    // Form submission
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.textContent = '⏳ جاري إرسال الرسالة...';
            }

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            const msgData = { name, phone, email, subject, message };

            if (window.db && typeof window.db.addMessage === 'function') {
                await window.db.addMessage(msgData);
            } else if (typeof addMessage === 'function') {
                addMessage(msgData);
            }

            contactForm.reset();
            if (submitBtn) {
                submitBtn.disabled = false;
                submitBtn.textContent = 'إرسال الرسالة';
            }
            formSuccess.style.display = 'block';
            
            setTimeout(() => {
                formSuccess.style.display = 'none';
            }, 5000);
        });
    }

    // FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const isActive = question.classList.contains('active');
            
            // Close all
            faqQuestions.forEach(q => {
                q.classList.remove('active');
                q.nextElementSibling.style.maxHeight = null;
            });

            // Open clicked if it wasn't active
            if (!isActive) {
                question.classList.add('active');
                const answer = question.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            }
        });
    });
});
