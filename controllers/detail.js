/* Detail Product */
import Product from '../models/Product.js'
const product = new Product()
product.getProductDetail('.detail .detail__product', '.product .content')

/* Check Login, Logout */
import { checkLogin, logOut } from '../utils/method.js'
checkLogin()
logOut()
