/* Cart List */
import Cart from '../models/Cart.js'
const cart = new Cart()
cart.renderCartItem(cart.cartList, '.cart__list-item')
cart.renderTotalCart(cart.cartList, '.total-cart')

/* Display Icon User If Have Access Token */
if (localStorage.getItem('accessToken')) {
  document.querySelector('#log-out').style.display = 'inline'
}

/* Check Login, Logout */
import { checkLogin, logOut } from '../utils/method.js'
checkLogin()
logOut()
