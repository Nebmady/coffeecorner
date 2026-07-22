// button joch all,coffee,tea,dessert
const buttons = document.querySelectorAll('.btn-outline');
const sections = document.querySelectorAll('.tab-section');

function switchTab(sectionId) {
            sections.forEach(section => {
                section.classList.remove('active');
            });

        
            buttons.forEach(button => {
                button.classList.remove('active');
            });

            document.getElementById(sectionId).classList.add('active');

            
            event.currentTarget.classList.add('active');
}


// ah contact form
const contactForm = document.getElementById('contactForm');
const submitButton = document.getElementById('submitButton');
const formStatus = document.getElementById('formStatus');

if (contactForm && submitButton && formStatus) {
    const originalButtonText = submitButton.innerHTML;

    function setStatus(message, type) {
        formStatus.textContent = message;
        formStatus.className = `contact-status show ${type}`;
    }

    function resetButton() {
        submitButton.disabled = false;
        submitButton.innerHTML = originalButtonText;
    }

    contactForm.addEventListener('submit', async function (event) {
        event.preventDefault();

        const formData = new FormData(contactForm);
        const nameValue = formData.get('name');
        const emailValue = formData.get('email');
        const subjectValue = formData.get('subject');
        const messageValue = formData.get('message');

        const name = typeof nameValue === 'string' ? nameValue.trim() : '';
        const email = typeof emailValue === 'string' ? emailValue.trim() : '';
        const subject = typeof subjectValue === 'string' ? subjectValue.trim() : '';
        const message = typeof messageValue === 'string' ? messageValue.trim() : '';

        if (!name || !email || !subject || !message) {
            setStatus('Please fill in all fields before sending.', 'error');
            return;
        }

        submitButton.disabled = true;
        submitButton.innerHTML = '<span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>Sending...';
        setStatus('Sending your message...', 'loading');

        try {
            const response = await fetch('https://formsubmit.co/ajax/mmdylb33@gmail.com', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                setStatus('Message sent successfully! We will reply soon.', 'success');
                contactForm.reset();
            } else {
                throw new Error('Unable to send message right now.');
            }
        } catch (error) {
            console.error(error);
            const emailBody = `Name: ${name}\nEmail: ${email}\n\n${message}`;
            const mailtoLink = `mailto:mmdylb33@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(emailBody)}`;
            window.location.href = mailtoLink;
            setStatus('Your message could not be sent automatically. Your mail app has been opened instead.', 'error');
        } finally {
            resetButton();
        }
    });
}