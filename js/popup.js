// Popup functionality

document.addEventListener("DOMContentLoaded", () => {
  // Initialize popup
  initPopup()
})

// Popup
function initPopup() {
  const popup = document.getElementById("popup")
  const popupTitle = document.getElementById("popup-title")
  const popupClose = document.getElementById("popup-close")
  const popupOverlay = document.querySelector(".popup-overlay")
  const popupMessageGroup = document.getElementById("popup-message-group")
  const contactButtons = document.querySelectorAll(".contact-btn")

  if (!popup || !popupTitle || !popupClose || !popupOverlay || !popupMessageGroup) return

  // Form type titles
  const formTitles = {
    contact: "Связаться с нами",
    landing: "Заказать Landing Page",
    corporate: "Заказать корпоративный сайт",
    store: "Заказать интернет-магазин",
  }

  // Open popup when contact buttons are clicked
  contactButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const formType = this.getAttribute("data-form-type")

      // Set popup title based on form type
      popupTitle.textContent = formTitles[formType]

      // Show/hide message field based on form type
      if (formType === "contact") {
        popupMessageGroup.style.display = "none"
      } else {
        popupMessageGroup.style.display = "block"
      }

      // Open popup
      popup.classList.add("open")
      document.body.style.overflow = "hidden" // Prevent scrolling
    })
  })

  // Close popup when close button is clicked
  popupClose.addEventListener("click", () => {
    popup.classList.remove("open")
    document.body.style.overflow = "auto" // Restore scrolling
  })

  // Close popup when overlay is clicked
  popupOverlay.addEventListener("click", () => {
    popup.classList.remove("open")
    document.body.style.overflow = "auto" // Restore scrolling
  })

  // Close popup when Escape key is pressed
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && popup.classList.contains("open")) {
      popup.classList.remove("open")
      document.body.style.overflow = "auto" // Restore scrolling
    }
  })

  // Handle form submission
  const popupForm = popup.querySelector(".popup-form")
  if (popupForm) {
    popupForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        // Close popup
        popup.classList.remove("open")
        document.body.style.overflow = "auto" // Restore scrolling

        // Reset form
        popupForm.reset()

        // Show success message (you can implement this as needed)
        alert("Ваша заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.")
      }, 1000)
    })
  }
}

document.querySelector('.popup-form').addEventListener('submit', function(e) {
  e.preventDefault();
  
  const formData = {
      name: document.getElementById('popup-name').value,
      email: document.getElementById('popup-email').value,
      phone: document.getElementById('popup-phone').value,
      message: document.getElementById('popup-message').value
  };

  // Отправка в Telegram
  const botToken = '7979049133:AAHjRV9wEuxyWXEYV3KmCey8tdfij0-q5xs';
  const chatId = '844291620';
  
  const text = `Новая заявка!\n\nИмя: ${formData.name}\nEmail: ${formData.email}\nТелефон: ${formData.phone}\nСообщение: ${formData.message}`;
  
  fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          chat_id: chatId,
          text: text
      })
  })
  .then(response => response.json())
  .then(data => {
      alert('Заявка отправлена! Мы скоро свяжемся с вами.');
      document.querySelector('.popup-form').reset();
      document.getElementById('popup').style.display = 'none';
  })
  .catch(error => {
      console.error('Error:', error);
      alert('Произошла ошибка при отправке.');
  });
});