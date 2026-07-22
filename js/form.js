export function initForm() {
  const form = document.getElementById('gform');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = form.querySelector('[name="Full Name"]').value.trim();
    const email = form.querySelector('[name="Email Address"]').value.trim();
    const phone = form.querySelector('[name="Phone Number"]').value.trim();

    if (!name || !email || !phone) {
      showPopup('error', 'Please fill in all required fields.');
      return;
    }

    const button = document.getElementById('formSubmitBtn');
    button.disabled = true;
    button.innerText = 'Submitting...';

    const actionUrl = form.action;
    if (actionUrl === 'YAHAN_APNA_NEW_WEB_APP_URL_DALEIN' || actionUrl === window.location.href) {
      showPopup('success', 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.');
      form.reset();
      button.disabled = false;
      button.innerText = 'Submit & Get Free Trial';
      return;
    }

    fetch(actionUrl, {
      method: 'POST',
      body: new FormData(form)
    })
    .then(res => res.json())
    .then(data => {
      if (data.result === 'success') {
        showPopup('success', 'Thank you! Your message has been sent successfully. We will contact you within 24 hours.');
        form.reset();
      } else {
        showPopup('error', 'Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      showPopup('error', 'Error sending message! Please check your internet and try again.');
      console.error(error);
    })
    .finally(() => {
      button.disabled = false;
      button.innerText = 'Submit & Get Free Trial';
    });
  });
}

function showPopup(type, message) {
  const existing = document.querySelector('.custom-popup');
  if (existing) existing.remove();

  const popup = document.createElement('div');
  popup.className = 'custom-popup';
  popup.innerHTML = `
    <div class="popup-overlay"></div>
    <div class="popup-box popup-${type}">
      <span class="popup-icon material-symbols-outlined">${type === 'success' ? 'check_circle' : 'error'}</span>
      <h3>${type === 'success' ? 'Success!' : 'Error'}</h3>
      <p>${message}</p>
      <button class="popup-btn" onclick="this.closest('.custom-popup').remove()">OK</button>
    </div>
  `;

  popup.querySelector('.popup-overlay').addEventListener('click', () => popup.remove());
  document.body.appendChild(popup);
}
