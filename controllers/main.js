// Import Carousel
import { carouselNext, carouselPrev } from '../utils/method.js'
document.querySelector('.btn-next').onclick = carouselNext
document.querySelector('.btn-prev').onclick = carouselPrev
setInterval(carouselNext, 20000)

