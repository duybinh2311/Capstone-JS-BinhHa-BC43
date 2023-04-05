import UserRegister from './UserRegister.js'
export default class User {
  userRegister = new UserRegister()
  postUserRegister() {
    axios
      .post('https://shop.cyberlearn.vn/api/Users/signup', this.userRegister)
      .then((result) => {
        console.log(result.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }
}
