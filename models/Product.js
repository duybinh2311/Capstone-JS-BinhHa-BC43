export default class Product {
  /* Get Product From API */
  getProductList(selectorProduct) {
    axios
      .get('https://shop.cyberlearn.vn/api/Product')
      .then((result) => {
        /* Render Product */
        document.querySelector(selectorProduct).innerHTML =
          this.renderProductList(result.data.content, './views/')
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* Get Detail Product From API */
  getProductDetail(selectorDetail, selectorProduct) {
    const param = new URL(window.location.href)
    const id = param.searchParams.get('id')
    axios(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${id}`)
      .then((result) => {
        /* Render Detail Product */
        document.querySelector(selectorDetail).innerHTML =
          this.renderDetailProduct(result.data.content)
        document.querySelector(selectorProduct).innerHTML =
          this.renderProductList(result.data.content.relatedProducts)

        /* Assign Events Button After Render */
        this.btnActive()
        this.btnHandleEvent()
      })
      .catch((err) => {
        console.log(err)
      })
  }

  /* Render Product */
  renderProductList(arrProduct, link = '') {
    let htmlString = ''
    arrProduct.forEach((element) => {
      htmlString += `
      <div class="card">
        <a href="${link}detail.html?id=${element.id}">
          <div class="card-img">
            <img src=${element.image} alt="" />
          </div>
          <div class="card-name">
            <h4>${element.name}</h4>
          </div>
          <div class="card-description">
            <p>${element.shortDescription}</p>
          </div>
          <div class="card-button">
            <p>$ ${element.price}</p>
            <button class="btn-primary-dark">Detail</button>
          </div>
          </a>
      </div>`
    })
    return htmlString
  }

  /* Render Detail Product */
  renderDetailProduct(product) {
    let htmlString = `          
    <div class="detail__product-img">
      <img src=${product.image} alt="">
    </div>
    <div class="detail__product-description">
      <div class="detail__title">
        <h3>${product.name}</h3>
        <p>${product.description}</p>
        <p>$ <span class="total-price">${product.price}</span></p>
      </div>
      <div class="detail__size">
        <button class="button-size">${product.size[0]}</button>
        <button  utton class="button-size">${product.size[1]}</button>
        <button class="button-size">${product.size[2]}</button>
        <button class="button-size">${product.size[3]}</button>
        <button class="button-size">${product.size[4]}</button>
        <button class="button-size">${product.size[5]}</button>
        <button class="button-size">${product.size[6]}</button>
      </div>
      <div class="detail__button-quantity">
        <button class="btn-increase">
          <i class="fa fa-arrow-left"></i>
        </button>
        <span class="total-quantity">1</span>
        <button class="btn-reduce">
          <i class="fa fa-arrow-right"></i>
        </button>
      </div>
      <div class="detail__button">
        <button class="btn-detail">Add To Cart</button>
      </div>
    </div>`
    return htmlString
  }

  /* Button Size Active Event */
  btnActive() {
    const btnSize = document.querySelectorAll('.detail__size button')
    btnSize.forEach((button) => {
      button.onclick = () => {
        if (!button.classList.contains('active-btn')) {
          btnSize.forEach((btn) => {
            btn.classList.remove('active-btn')
          })
          button.classList.add('active-btn')
        }
      }
    })
  }

  /* Button Handle Event */
  btnHandleEvent() {
    const btnAddToCart = document.querySelector('.btn-detail')
    const btnQuantity = document.querySelectorAll(
      '.detail__button-quantity button'
    )
    const totalQuantity = document.querySelector('.total-quantity')
    const totalPrice = document.querySelector('.total-price')
    const priceProduct = Number(totalPrice.innerHTML)

    /* Button Reduce Quantity Event */
    btnQuantity[0].onclick = () => {
      if (totalQuantity.innerHTML > 1) {
        totalQuantity.innerHTML = totalQuantity.innerHTML - 1
        totalPrice.innerHTML = totalPrice.innerHTML - priceProduct
      }
    }

    /* Button Increase Quantity Event */
    btnQuantity[1].onclick = () => {
      totalQuantity.innerHTML = Number(totalQuantity.innerHTML) + 1
      totalPrice.innerHTML = Number(totalPrice.innerHTML) + priceProduct
    }

    /* Button Add To Cart Event */
    btnAddToCart.onclick = async () => {
      const param = new URL(window.location.href)
      const idProduct = Number(param.searchParams.get('id'))
      const cartList = JSON.parse(localStorage.getItem('cartList')) || []

      /* If Cart List Have Product, Change Quantity And Total Price */
      if (cartList.find((element) => element.id == idProduct)) {
        const index = cartList.findIndex((element) => element.id === idProduct)
        cartList[index].totalQuantity += Number(totalQuantity.innerHTML)
        cartList[index].totalPrice += Number(totalPrice.innerHTML)
        localStorage.setItem('cartList', JSON.stringify(cartList))
        return
      }

      /* If Cart List Does Not Have Product, Push Product To Cart List */
      const product = await axios
        .get(`https://shop.cyberlearn.vn/api/Product/getbyid?id=${idProduct}`)
        .then((result) => result.data.content)
        .catch((err) => console.log(err))
      const cartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        totalQuantity: Number(totalQuantity.innerHTML),
        totalPrice: Number(totalPrice.innerHTML),
        categories: product.categories[0].category,
      }
      cartList.push(cartItem)
      localStorage.setItem('cartList', JSON.stringify(cartList))
    }
  }
}
