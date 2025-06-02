// Script para o ano atual no rodapé
document.getElementById("currentYear").textContent = new Date().getFullYear();

// Scripts para os Carrosséis
function setupCarousel(carouselId) {
  const carousel = document.getElementById(carouselId);
  if (!carousel) return;

  const track = carousel.querySelector(".carousel-track");
  const items = Array.from(track.children);
  const nextButton = carousel.querySelector(".carousel-button.next");
  const prevButton = carousel.querySelector(".carousel-button.prev");

  if (!track || items.length === 0 || !nextButton || !prevButton) return;

  let itemWidth;
  let currentIndex = 0;
  let itemsPerPage = 1;

  function updateItemsPerPageAndWidth() {
    itemWidth = items[0].getBoundingClientRect().width;

    if (carouselId === "testimonialsCarousel") {
      if (window.innerWidth >= 1024) {
        itemsPerPage = 3;
      } else if (window.innerWidth >= 768) {
        itemsPerPage = 2;
      } else {
        itemsPerPage = 1;
      }
    } else {
      itemsPerPage = 1;
    }
  }

  function updateCarouselPosition() {
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
  }

  function showSlide(index) {
    const maxIndex = items.length - itemsPerPage;

    if (index > maxIndex) {
      currentIndex = items.length > itemsPerPage ? 0 : maxIndex;
    } else if (index < 0) {
      currentIndex = maxIndex;
    } else {
      currentIndex = index;
    }
    updateCarouselPosition();
  }

  updateItemsPerPageAndWidth();

  nextButton.addEventListener("click", () => {
    if (currentIndex < items.length - itemsPerPage) {
      showSlide(currentIndex + 1);
    } else {
      showSlide(0);
    }
  });

  prevButton.addEventListener("click", () => {
    if (currentIndex > 0) {
      showSlide(currentIndex - 1);
    } else {
      showSlide(items.length - itemsPerPage);
    }
  });

  window.addEventListener("resize", () => {
    updateItemsPerPageAndWidth();
    showSlide(currentIndex);
  });

  showSlide(0);
}

document.addEventListener("DOMContentLoaded", () => {
  setupCarousel("galleryCarousel");
  setupCarousel("testimonialsCarousel");
});
