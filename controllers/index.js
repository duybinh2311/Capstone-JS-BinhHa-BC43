/* Carousel */
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
document.querySelector('.btn-next').onclick = carouselNext
document.querySelector('.btn-prev').onclick = carouselPrev

/* Product Render List */
import Product from '../models/Product.js'
const product = new Product()
product.getProductList('.product .content')
