

'use strict';

// Light and dark mode

const $themeBtn = document.querySelector('[data-theme-btn]');
const $HTML = document.documentElement;
let isDark = window.matchMedia('(prefers-color-scheme:dark)').matches;

if (sessionStorage.getItem('theme')) {
  $HTML.dataset.theme = sessionStorage.getItem('theme');
} else {
  $HTML.dataset.theme = isDark ? 'dark' : 'light';
  sessionStorage.setItem('theme', $HTML.dataset.theme);
}

const changeTheme = () => {
  $HTML.dataset.theme =
    sessionStorage.getItem('theme') === 'light' ? 'dark' : 'light';
  sessionStorage.setItem('theme', $HTML.dataset.theme);
};

$themeBtn.addEventListener('click', changeTheme);

// Tab

const $tabBtn = document.querySelectorAll('[data-tab-btn]');
let [lastActiveTab] = document.querySelectorAll('[data-tab-content]');

let [lastActiveTabBtn] = $tabBtn;

$tabBtn.forEach((item) => {
  item.addEventListener('click', function () {
    lastActiveTab.classList.remove('active');
    lastActiveTabBtn.classList.remove('active');

    const $tabContent = document.querySelector(
      `[data-tab-content="${item.dataset.tabBtn}"]`
    );
    $tabContent.classList.add('active');
    this.classList.add('active');

    lastActiveTab = $tabContent;
    lastActiveTabBtn = this;
  });
});

// Contact Form
document
  .getElementById('contactForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Clear previous error messages
    document
      .querySelectorAll('.error-message')
      .forEach((el) => (el.style.display = 'none'));

    // Get form field values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    let isValid = true;

    // Name validation
    if (name === '') {
      document.getElementById('nameError').textContent = 'Name is required';
      document.getElementById('nameError').style.display = 'block';
      isValid = false;
    }

    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email === '' || !emailPattern.test(email)) {
      document.getElementById('emailError').textContent =
        'Valid email is required';
      document.getElementById('emailError').style.display = 'block';
      isValid = false;
    }

    // Message validation
    if (message === '') {
      document.getElementById('messageError').textContent =
        'Message is required';
      document.getElementById('messageError').style.display = 'block';
      isValid = false;
    }

    // If valid, send email
    if (isValid) {
      const params = { name, email, subject, message };
      const serviceId = 'service_j30ojo4';
      const templateId = 'template_gy1ewio';

      emailjs
        .send(serviceId, templateId, params)
        .then((res) => {
          document.getElementById('contactForm').reset();
          alert('Your message sent successfully!');
          console.log(res);
        })
        .catch((err) => console.log(err));
    }
  });

