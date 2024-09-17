document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS
    emailjs.init("YOUR_USER_ID");

    // Add event listener to the form submission
    document.getElementById('contact-form').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting in the traditional way

        // Show the loading spinner
        const spinner = document.querySelector('.spinner');
        spinner.classList.remove('hidden');

        // Send form using EmailJS
        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
            .then(function () {
                spinner.classList.add('hidden'); // Hide spinner
                showFeedbackMessage('Form successfully sent!', 'success');
            }, function (error) {
                spinner.classList.add('hidden'); // Hide spinner
                showFeedbackMessage('Failed to send form. Please try again.', 'error');
            });
    });

    // Function to show feedback messages
    function showFeedbackMessage(message, type) {
        const formStatusMessage = document.getElementById('form-status-message');
        formStatusMessage.textContent = message;
        formStatusMessage.style.color = (type === 'success') ? 'green' : 'red';
        formStatusMessage.style.opacity = 1;

        // Fade out the message after a few seconds
        setTimeout(function () {
            formStatusMessage.style.opacity = 0;
        }, 3000);
    }

    // Fade in the contact section when it comes into view
    const contactCard = document.querySelector('.contact-card');

    function checkVisibility() {
        const rect = contactCard.getBoundingClientRect();
        const windowHeight = window.innerHeight || document.documentElement.clientHeight;

        if (rect.top <= windowHeight) {
            contactCard.classList.add('visible'); // Add class to fade it in
            window.removeEventListener('scroll', checkVisibility); // Remove the listener once visible
        }
    }

    // Trigger the visibility check on scroll
    window.addEventListener('scroll', checkVisibility);
});

// Function to handle the fade-in effect on scroll
function handleScrollAnimation() {
    const fadeInSections = document.querySelectorAll('.fade-in-section');

    fadeInSections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // Add the 'visible' class when the section enters the viewport
        if (sectionTop < windowHeight - 100) {
            section.classList.add('visible');
        }
    });
}

// Add the scroll event listener
window.addEventListener('scroll', handleScrollAnimation);

// Trigger the function on page load in case some sections are already in view
handleScrollAnimation();

