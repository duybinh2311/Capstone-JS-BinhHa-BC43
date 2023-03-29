function carouselNext() {
  const carouselItem = document.querySelectorAll('.carousel__item')
  const carousel = document.querySelector('.carousel__content')
  carousel.appendChild(carouselItem[0])
}

function carouselPrev() {
  const carouselItem = document.querySelectorAll('.carousel__item')
  const carousel = document.querySelector('.carousel__content')
  carousel.prepend(carouselItem[carouselItem.length - 1])
}