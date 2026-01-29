let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const totalSlides = slides.length;

function moveSlide(step) {
  currentIndex = (currentIndex + step + totalSlides) % totalSlides;
  const offset = -currentIndex * 100;
  document.querySelector('.slider').style.transform = `translateX(${offset}%)`;
}

// 자동 슬라이드 (3초마다)
setInterval(() => moveSlide(1), 3000);