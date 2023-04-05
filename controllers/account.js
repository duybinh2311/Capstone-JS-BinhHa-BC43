// Form Slide Animation
const btnSignUpSLide = document.querySelector('#signUp')
const btnSignInSlide = document.querySelector('#signIn')
const formContainer = document.querySelector('.form-container')
btnSignUpSLide.onclick = () => {
  formContainer.classList.add('right-panel-active')
}
btnSignInSlide.onclick = () => {
  formContainer.classList.remove('right-panel-active')
}

/* User */
import User from '../models/User.js'
const user = new User()

// SignUp Form
const btnSignUp = document.querySelector('#btn-sign-up')
btnSignUp.onclick = (event) => {
  event.preventDefault()
  const inputField = btnSignUp
    .closest('form')
    .querySelectorAll('input:not([type="radio"])')
  const inputCheck = btnSignUp
    .closest('form')
    .querySelector('input[type="radio"]:checked')
  inputField.forEach((element) => {
    user.userRegister[element.id] = element.value
  })
  user.userRegister[inputCheck.name] = inputCheck.value
  user.postUserRegister()
}
