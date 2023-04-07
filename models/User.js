import UserLogin from './UserLogin.js'
import UserRegister from './UserRegister.js'

export default class User {
  userRegister = new UserRegister()
  userLogin = new UserLogin()
  postUserRegister(showPopup, clearForm) {
    axios
      .post('https://shop.cyberlearn.vn/api/Users/signup', this.userRegister)
      .then((result) => {
        showPopup(result.data.message)
        clearForm()
      })
      .catch((err) => {
        showPopup(err.response.data.message)
      })
  }
  postUSerLogin(showPopup, clearForm) {
    axios
      .post('https://shop.cyberlearn.vn/api/Users/signin', this.userLogin)
      .then((result) => {
        showPopup(result.data.message)
        clearForm()
        localStorage.setItem('accessToken', result.data.content.accessToken)
      })
      .catch((err) => {
        showPopup(err.response.data.message)
      })
  }
}
