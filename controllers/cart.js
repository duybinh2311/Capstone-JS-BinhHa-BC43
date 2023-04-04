/* Cart List */
import Cart from '../models/Cart.js'
const cart = new Cart()
cart.renderCartItem(cart.cartList, '.cart__list-item')
cart.renderTotalCart(cart.cartList, '.total-cart')
