// carousel nav button
document.querySelector('.btn-next').onclick = carouselNext
document.querySelector('.btn-prev').onclick = carouselPrev
setInterval(carouselNext, 15000)
