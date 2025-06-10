// Main JavaScript file

// Wait for DOM to be fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize scroll indicator
  initScrollIndicator()

  // Initialize scroll to top button
  initScrollToTopButton()

  // Initialize WhatsApp button
  initWhatsAppButton()

  // Initialize contact form
  initContactForm()

  // Initialize popup forms
  initPopupForms()

  // Initialize mobile menu
  initMobileMenu()
})

// Scroll Indicator
function initScrollIndicator() {
  const scrollIndicator = document.querySelector(".scroll-indicator-progress")

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPosition = window.scrollY
    const progress = (scrollPosition / totalHeight) * 100

    scrollIndicator.style.width = progress + "%"
  })
}

// Scroll to Top Button
function initScrollToTopButton() {
  const scrollToTopBtn = document.getElementById("scroll-to-top")

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      scrollToTopBtn.classList.add("visible")
    } else {
      scrollToTopBtn.classList.remove("visible")
    }
  })

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// WhatsApp Button
function initWhatsAppButton() {
  const whatsappButton = document.getElementById("whatsapp-button")
  const whatsappTooltip = document.getElementById("whatsapp-tooltip")
  const phoneNumber = "77066072335"
  const message = "Здравствуйте! Я хочу узнать подробнее о ваших услугах."

  whatsappButton.querySelector(".whatsapp-btn").addEventListener("click", () => {
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank")
  })

  whatsappButton.querySelector(".whatsapp-btn").addEventListener("mouseenter", () => {
    whatsappTooltip.style.opacity = "1"
    whatsappTooltip.style.transform = "translateY(0)"
  })

  whatsappButton.querySelector(".whatsapp-btn").addEventListener("mouseleave", () => {
    whatsappTooltip.style.opacity = "0"
    whatsappTooltip.style.transform = "translateY(0.5rem)"
  })
}

// Contact Form
function initContactForm() {
  const contactForm = document.getElementById("contact-form")
  const formSuccess = document.getElementById("form-success")
  const submitBtn = document.getElementById("submit-btn")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Show loading state
      submitBtn.disabled = true
      submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Отправка...
            `

      // Simulate form submission (replace with actual form submission)
      setTimeout(() => {
        contactForm.style.display = "none"
        formSuccess.style.display = "block"

        // Reset form
        contactForm.reset()

        // Reset button state
        submitBtn.disabled = false
        submitBtn.innerHTML = `
                    <span class="btn-text">Отправить сообщение</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                `

        // Hide success message after 5 seconds
        setTimeout(() => {
          formSuccess.style.display = "none"
          contactForm.style.display = "flex"
        }, 5000)
      }, 1500)
    })
  }
}

// Popup Forms
function initPopupForms() {
  const popup = document.getElementById("popup")
  const popupTitle = document.getElementById("popup-title")
  const popupClose = document.getElementById("popup-close")
  const popupOverlay = document.querySelector(".popup-overlay")
  const popupMessageGroup = document.getElementById("popup-message-group")
  const contactButtons = document.querySelectorAll(".contact-btn")

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
}

// Mobile Menu
function initMobileMenu() {
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
  const mobileMenu = document.getElementById("mobile-menu")
  const mobileMenuClose = document.getElementById("mobile-menu-close")
  const mobileNavLinks = document.querySelectorAll(".mobile-nav-link")

  if (!mobileMenuToggle || !mobileMenu || !mobileMenuClose) return

  // Open mobile menu
  mobileMenuToggle.addEventListener("click", () => {
    mobileMenu.classList.add("open")
    document.body.classList.add("menu-open")
  })

  // Close mobile menu
  mobileMenuClose.addEventListener("click", () => {
    mobileMenu.classList.remove("open")
    document.body.classList.remove("menu-open")
  })

  // Close mobile menu when clicking on a link
  mobileNavLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("open")
      document.body.classList.remove("menu-open")
    })
  })

  // Close mobile menu when clicking outside
  document.addEventListener("click", (e) => {
    if (
      mobileMenu.classList.contains("open") &&
      !mobileMenu.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      mobileMenu.classList.remove("open")
      document.body.classList.remove("menu-open")
    }
  })

  // Close mobile menu when pressing Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileMenu.classList.contains("open")) {
      mobileMenu.classList.remove("open")
      document.body.classList.remove("menu-open")
    }
  })
}
