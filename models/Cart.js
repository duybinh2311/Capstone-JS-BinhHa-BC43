export default class Cart {
  /* Get Data Cart List */
  cartList = JSON.parse(localStorage.getItem('cartList'))

  /* Render Cart */
  renderCartItem(cartList, selector) {
    /* If Cart List Empty Render Message */
    if (!cartList.length) {
      document.querySelector(
        selector
      ).innerHTML = `<p class="empty-cart">Empty Cart</p>`
      return
    }
    /* If Cart List Have Product Render Cart Item */
    let htmlString = ''
    cartList.forEach((cartItem) => {
      htmlString += `
        <div class="cart__item">
          <div class="cart__item-content-left">
            <div class="cart__item-product-pic">
              <img src="${cartItem.image}" alt="" />
            </div>
            <div class="cart__item-product-description">
              <p class="name">${cartItem.name}</p>
              <p class="short-description">${cartItem.categories}</p>
              <p class="price">$ ${cartItem.price}</p>
            </div>
          </div>
          <div class="cart__item-content-right">
            <div class="cart__item-button">
              <button class="btn-reduce">
                <i class="fa fa-arrow-left"></i>
              </button>
              <span class="quantity">${cartItem.totalQuantity}</span>
              <button class="btn-increase">
                <i class="fa fa-arrow-right"></i>
              </button>
              <button class="delete-cart-item"><i class="fa fa-times"></i></button>
            </div>
            <div class="cart__item-total">
              <p>$ <span class="total-price-item">${cartItem.totalPrice}</span></p>
            </div>
          </div>
        </div>
      `
    })
    document.querySelector(selector).innerHTML = htmlString

    /* Assign Events Button After Render */
    this.reduceQuantityCartItem()
    this.increaseQuantityCartItem()
    this.deleteCartItem()
  }

  /* Render Total Cart Price */
  renderTotalCart(cartList, selector) {
    debugger
    if (!cartList.length) return
    const totalCart = cartList.reduce(
      (output, element) => (output += element.totalPrice),
      0
    )
    document.querySelector(selector).innerHTML = totalCart.toLocaleString()
  }

  /* CLick Reduce Quantity */
  reduceQuantityCartItem() {
    const btnReduce = document.querySelectorAll('.btn-reduce')
    btnReduce.forEach((element, index) => {
      element.onclick = () => {
        const quantity =
          btnReduce[index].parentElement.querySelector('.quantity')
        if (quantity.innerHTML > 1) {
          quantity.innerHTML = quantity.innerHTML - 1
          this.cartList[index].totalQuantity -= 1
          this.cartList[index].totalPrice -= this.cartList[index].price
        } else {
          this.cartList.splice(index, 1)
        }
        this.renderCartItem(this.cartList, '.cart__list-item')
        this.renderTotalCart(this.cartList, '.total-cart')
        localStorage.setItem('cartList', JSON.stringify(this.cartList))
      }
    })
  }

  /* Click Increase Quantity */
  increaseQuantityCartItem() {
    const btnIncrease = document.querySelectorAll('.btn-increase')
    btnIncrease.forEach((element, index) => {
      element.onclick = () => {
        const quantity =
          btnIncrease[index].parentElement.querySelector('.quantity')
        quantity.innerHTML = Number(quantity.innerHTML) + 1
        this.cartList[index].totalQuantity += 1
        this.cartList[index].totalPrice += this.cartList[index].price
        this.renderCartItem(this.cartList, '.cart__list-item')
        this.renderTotalCart(this.cartList, '.total-cart')
        localStorage.setItem('cartList', JSON.stringify(this.cartList))
      }
    })
  }

  /* CLick Delete Cart Item */
  deleteCartItem() {
    const btnDelete = document.querySelectorAll('.delete-cart-item')
    btnDelete.forEach((element, index) => {
      element.onclick = () => {
        this.cartList.splice(index, 1)
        this.renderCartItem(this.cartList, '.cart__list-item')
        this.renderTotalCart(this.cartList, '.total-cart')
        localStorage.setItem('cartList', JSON.stringify(this.cartList))
      }
    })
  }
}
