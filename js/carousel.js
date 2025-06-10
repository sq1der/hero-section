// Carousel functionality

document.addEventListener("DOMContentLoaded", () => {
  // Initialize hero carousel
  initHeroCarousel()

  // Initialize testimonials carousel
  initTestimonialsCarousel()

  // Initialize projects carousel
  initProjectsCarousel()
})

// Hero Carousel
function initHeroCarousel() {
  const carousel = document.getElementById("hero-carousel")
  if (!carousel) return

  const slides = carousel.querySelectorAll(".carousel-slide")
  const indicators = document.querySelectorAll(".carousel-indicator")
  const prevBtn = document.querySelector(".carousel-nav.prev")
  const nextBtn = document.querySelector(".carousel-nav.next")

  let currentIndex = 0
  let touchStartX = null
  let touchEndX = null

  // Function to show slide by index
  function showSlide(index) {
    // Hide all slides
    slides.forEach((slide) => {
      slide.classList.remove("active")
    })

    // Update indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })

    // Show current slide
    slides[index].classList.add("active")
    indicators[index].classList.add("active")

    // Update current index
    currentIndex = index
  }

  // Next slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % slides.length
    showSlide(newIndex)
  }

  // Previous slide
  function prevSlide() {
    const newIndex = (currentIndex - 1 + slides.length) % slides.length
    showSlide(newIndex)
  }

  // Event listeners for navigation buttons
  if (prevBtn) {
    prevBtn.addEventListener("click", prevSlide)
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", nextSlide)
  }

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      showSlide(index)
    })
  })

  // Touch events for swipe
  carousel.addEventListener("touchstart", (e) => {
    touchStartX = e.touches[0].clientX
  })

  carousel.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].clientX
    handleSwipe()
  })

  function handleSwipe() {
    if (!touchStartX || !touchEndX) return

    const swipeDistance = touchEndX - touchStartX

    // If swipe is long enough (more than 50px)
    if (Math.abs(swipeDistance) > 50) {
      if (swipeDistance > 0) {
        // Swipe right - previous slide
        prevSlide()
      } else {
        // Swipe left - next slide
        nextSlide()
      }
    }

    // Reset values
    touchStartX = null
    touchEndX = null
  }

  // Auto-advance slides every 5 seconds
  setInterval(nextSlide, 5000)
}

// Testimonials Carousel (Mobile)
function initTestimonialsCarousel() {
  const prevBtn = document.getElementById("testimonial-prev")
  const nextBtn = document.getElementById("testimonial-next")
  const indicators = document.getElementById("testimonial-indicators")?.querySelectorAll(".nav-indicator")

  if (!prevBtn || !nextBtn || !indicators) return

  // Testimonials data
  const testimonials = [
    {
      name: "Сергей",
      position: "CEO, TechVision",
      rating: 5,
      text: "Сотрудничество с Mol Digital превзошло все наши ожидания. Они создали для нас корпоративный сайт, который не только выглядит современно, но и отлично работает. Особенно впечатлила скорость загрузки и удобство администрирования. Рекомендую эту команду всем, кто ценит качество и профессионализм.",
      image: "assets/images/avatars/sergey.jpg",
    },
    {
      name: "Айгуль",
      position: "Маркетинг-директор, Beauty Shop",
      rating: 5,
      text: "Наш интернет-магазин косметики разработан командой Mol Digital. Результат превзошел все ожидания! Сайт не только красивый, но и функциональный. Особенно радует, что после запуска конверсия выросла на 35%. Спасибо за профессиональный подход и внимание к деталям.",
      image: "assets/images/avatars/aigul.jpg",
    },
    {
      name: "Наташа",
      position: "Владелец, Студия йоги 'Лотос'",
      rating: 4,
      text: "Для нашей студии йоги команда Mol Digital создала лендинг, который помог привлечь новых клиентов. Сайт получился атмосферным и полностью отражает философию нашей студии. Единственное, хотелось бы немного больше анимаций, но в целом результатом очень довольна!",
      image: "assets/images/avatars/natasha.jpg",
    },
    {
      name: "Нурсултан",
      position: "Директор, Строительная компания 'Астана-Строй'",
      rating: 5,
      text: "Выражаю благодарность команде Mol Digital за разработку корпоративного сайта для нашей строительной компании. Сайт получился информативным, с удобной навигацией и современным дизайном. Отдельное спасибо за оперативность и готовность учесть все наши пожелания.",
      image: "assets/images/avatars/nursultan.jpg",
    },
    {
      name: "Гаухар",
      position: "Основатель, Образовательный центр 'Smart Kids'",
      rating: 5,
      text: "Обратились в Mol Digital для создания сайта нашего образовательного центра. Команда проявила высокий профессионализм и креативность. Сайт получился ярким, информативным и удобным как для родителей, так и для наших сотрудников. Особенно понравилась функция онлайн-записи на занятия.",
      image: "assets/images/avatars/gaukhar.jpg",
    },
    {
      name: "Серик",
      position: "Генеральный директор, Логистическая компания 'TransKZ'",
      rating: 4,
      text: "Сотрудничаем с Mol Digital уже второй год. За это время они разработали для нас корпоративный сайт и личный кабинет для клиентов. Работа выполнена качественно, все сроки соблюдены. Радует, что команда всегда на связи и оперативно реагирует на наши запросы по доработке функционала.",
      image: "assets/images/avatars/serik.jpg",
    },
  ]

  let currentIndex = 0

  // Function to render stars
  function renderStars(rating) {
    let starsHTML = ""
    for (let i = 0; i < 5; i++) {
      if (i < rating) {
        starsHTML += '<span class="star filled"></span>'
      } else {
        starsHTML += '<span class="star"></span>'
      }
    }
    return starsHTML
  }

  // Function to update testimonial
  function updateTestimonial(index) {
    const testimonial = testimonials[index]
    const testimonialCard = document.querySelector(".testimonials-mobile .testimonial-card")

    if (testimonialCard) {
      testimonialCard.querySelector(".author-name").textContent = testimonial.name
      testimonialCard.querySelector(".author-position").textContent = testimonial.position
      testimonialCard.querySelector(".rating").innerHTML = renderStars(testimonial.rating)
      testimonialCard.querySelector(".testimonial-text").textContent = testimonial.text
      testimonialCard.querySelector(".testimonial-avatar img").src = testimonial.image
      testimonialCard.querySelector(".testimonial-avatar img").alt = testimonial.name

      // Update indicators
      indicators.forEach((indicator) => {
        indicator.classList.remove("active")
      })
      indicators[index].classList.add("active")

      currentIndex = index
    }
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + testimonials.length) % testimonials.length
    updateTestimonial(newIndex)
  })

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % testimonials.length
    updateTestimonial(newIndex)
  })

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      updateTestimonial(index)
    })
  })
}

// Projects Carousel
function initProjectsCarousel() {
  const prevBtn = document.querySelector(".project-navigation .nav-btn.prev")
  const nextBtn = document.querySelector(".project-navigation .nav-btn.next")
  const indicators = document.querySelectorAll(".project-navigation .nav-indicator")

  if (!prevBtn || !nextBtn || !indicators.length) return

  // Projects data
  const projects = [
    {
      id: "kursgo",
      title: "KursGo",
      description: "Образовательная платформа для курсов программирования",
      image: "assets/images/projects/kursgo.png",
      url: "https://kursgo.kz",
      tags: ["Образование", "Курсы", "Программирование"],
      features: ["Каталог курсов", "Личный кабинет", "Онлайн-оплата", "Адаптивный дизайн"],
      year: "2023",
    },
    {
      id: "ndtedu",
      title: "NDT Education",
      description: "Центр обучения и аттестации специалистов неразрушающего контроля",
      image: "assets/images/projects/ndtedu.png",
      url: "https://ndtedu.kz",
      tags: ["Образование", "Сертификация", "Промышленность"],
      features: ["Каталог курсов", "Онлайн-запись", "Информация о сертификации", "Корпоративный стиль"],
      year: "2022",
    },
    {
      id: "newmotors",
      title: "New Motors",
      description: "Интернет-магазин автомобильных двигателей с гарантией",
      image: "assets/images/projects/newmotors.png",
      url: "https://newmotors.kz",
      tags: ["Автомобили", "Интернет-магазин", "Запчасти"],
      features: ["Каталог товаров", "Фильтрация", "Корзина", "Онлайн-оплата", "Доставка"],
      year: "2023",
    },
    {
      id: "allfasad",
      title: "Agregator",
      description: "Компания по продаже фиброцементных панелей и фасадных решений",
      image: "assets/images/projects/allfasad.png",
      url: "https://allfasad.kz",
      tags: ["Строительство", "Фасады", "Материалы"],
      features: ["Каталог продукции", "Портфолио проектов", "Калькулятор стоимости", "Форма заявки"],
      year: "2022",
    },
    {
      id: "molavto",
      title: "MolAvto",
      description: "Интернет-магазин автомобильных аксессуаров и ковриков",
      image: "assets/images/projects/molavto.png",
      url: "https://molavto.kz",
      tags: ["Автомобили", "Аксессуары", "Интернет-магазин"],
      features: ["Каталог по маркам авто", "Корзина", "Отзывы", "Доставка", "Онлайн-оплата"],
      year: "2024",
    },
  ]

  let currentIndex = 0

  // Function to update project
  function updateProject(index) {
    const project = projects[index]

    // Update project title and year
    document.querySelector(".project-title").textContent = project.title
    document.querySelector(".project-year").textContent = project.year

    // Update project description
    document.querySelector(".project-description").textContent = project.description

    // Update project tags
    const tagsContainer = document.querySelector(".project-tags")
    tagsContainer.innerHTML = ""
    project.tags.forEach((tag) => {
      const tagElement = document.createElement("span")
      tagElement.className = "tag"
      tagElement.textContent = tag
      tagsContainer.appendChild(tagElement)
    })

    // Update project features
    const featuresList = document.querySelector(".features-list")
    featuresList.innerHTML = ""
    project.features.forEach((feature) => {
      const featureItem = document.createElement("li")
      featureItem.className = "feature-item"
      featureItem.innerHTML = `
                <div class="feature-icon">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                </div>
                <span>${feature}</span>
            `
      featuresList.appendChild(featureItem)
    })

    // Update project URL
    document.querySelector(".project-actions a").href = project.url
    document.querySelector(".browser-url").textContent = project.url

    // Update project screenshot
    document.querySelector(".project-screenshot").src = project.image
    document.querySelector(".project-screenshot").alt = `Скриншот сайта ${project.title}`

    // Update indicators
    indicators.forEach((indicator) => {
      indicator.classList.remove("active")
    })
    indicators[index].classList.add("active")

    // Reset scroll position
    const scrollContainer = document.getElementById("project-scroll")
    if (scrollContainer) {
      scrollContainer.scrollTop = 0
    }

    currentIndex = index
  }

  // Event listeners for navigation buttons
  prevBtn.addEventListener("click", () => {
    const newIndex = (currentIndex - 1 + projects.length) % projects.length
    updateProject(newIndex)
  })

  nextBtn.addEventListener("click", () => {
    const newIndex = (currentIndex + 1) % projects.length
    updateProject(newIndex)
  })

  // Event listeners for indicators
  indicators.forEach((indicator, index) => {
    indicator.addEventListener("click", () => {
      updateProject(index)
    })
  })
}
