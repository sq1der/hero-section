// Auto-scroll functionality

document.addEventListener("DOMContentLoaded", () => {
  // Initialize auto-scroll for project preview
  initAutoScroll()

  // Initialize toggle scroll button
  initToggleScroll()
})

// Auto-scroll for project preview
function initAutoScroll() {
  const scrollContainer = document.getElementById("project-scroll")
  const scrollIndicator = document.querySelector(".scroll-indicator-progress-vertical")

  if (!scrollContainer || !scrollIndicator) return

  let isPaused = false
  let scrollDirection = "down"
  let animationId = null
  const speed = 1 // Scroll speed in pixels per frame

  // Function to handle scroll animation
  function scrollStep() {
    if (!scrollContainer) return

    // Skip animation if paused
    if (isPaused) {
      animationId = requestAnimationFrame(scrollStep)
      return
    }

    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight

    if (scrollDirection === "down") {
      scrollContainer.scrollTop += speed
      if (scrollContainer.scrollTop >= maxScroll - 1) {
        // Reached bottom, change direction
        scrollDirection = "up"
        // Small pause at the bottom
        isPaused = true
        setTimeout(() => {
          isPaused = false
        }, 1000)
      }
    } else {
      scrollContainer.scrollTop -= speed
      if (scrollContainer.scrollTop <= 1) {
        // Reached top, change direction
        scrollDirection = "down"
        // Small pause at the top
        isPaused = true
        setTimeout(() => {
          isPaused = false
        }, 1000)
      }
    }

    // Update scroll indicator
    updateScrollIndicator()

    animationId = requestAnimationFrame(scrollStep)
  }

  // Function to update scroll indicator
  function updateScrollIndicator() {
    const maxScroll = scrollContainer.scrollHeight - scrollContainer.clientHeight
    const scrollPercentage = (scrollContainer.scrollTop / maxScroll) * 100

    scrollIndicator.style.height = `${scrollPercentage}%`
    scrollIndicator.style.top = "0"
  }

  // Start animation
  animationId = requestAnimationFrame(scrollStep)

  // Pause on mouse enter
  scrollContainer.addEventListener("mouseenter", () => {
    isPaused = true
  })

  // Resume on mouse leave
  scrollContainer.addEventListener("mouseleave", () => {
    isPaused = false
  })

  // Update indicator on scroll
  scrollContainer.addEventListener("scroll", updateScrollIndicator)
}

// Toggle scroll button
function initToggleScroll() {
  const toggleBtn = document.querySelector(".toggle-scroll")
  const scrollContainer = document.getElementById("project-scroll")

  if (!toggleBtn || !scrollContainer) return

  let isPaused = false

  toggleBtn.addEventListener("click", () => {
    isPaused = !isPaused

    if (isPaused) {
      toggleBtn.classList.add("paused")
      toggleBtn.querySelector(".toggle-scroll-text").textContent = "Продолжить прокрутку"
      toggleBtn.querySelector("svg").outerHTML = `
                <svg class="play-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
            `

      // Trigger mouseenter event to pause scrolling
      const mouseEnterEvent = new Event("mouseenter")
      scrollContainer.dispatchEvent(mouseEnterEvent)
    } else {
      toggleBtn.classList.remove("paused")
      toggleBtn.querySelector(".toggle-scroll-text").textContent = "Остановить прокрутку"
      toggleBtn.querySelector("svg").outerHTML = `
                <svg class="pause-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="6" y="4" width="4" height="16"></rect>
                    <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
            `

      // Trigger mouseleave event to resume scrolling
      const mouseLeaveEvent = new Event("mouseleave")
      scrollContainer.dispatchEvent(mouseLeaveEvent)
    }
  })
}
