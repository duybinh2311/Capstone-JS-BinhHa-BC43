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

/* Modal Popup */
const modalPopupBG = document.querySelector('.message-container')
const modalPopup = document.querySelector('.popup-message')
const closePopup = document.querySelector('.close-popup')
const messagePopup = document.querySelector('.message-popup')
const showPopup = (message) => {
  modalPopupBG.classList.add('active')
  modalPopup.classList.add('active')
  messagePopup.innerHTML = message
}
closePopup.onclick = () => {
  closePopup.parentElement.classList.remove('active')
  closePopup.parentElement.parentElement.classList.remove('active')
}

/* User Class */
import User from '../models/User.js'
const user = new User()

/* Validation Class */
import Validation from '../models/Validation.js'

/* SignUp Form */
{
  const btnSignUp = document.querySelector('#btn-sign-up')
  const inputField = document.querySelectorAll(
    '.form__sign-up input:not([type="radio"])'
  )
  const clearForm = () => {
    for (const input of inputField) {
      input.value = ''
    }
  }
  btnSignUp.onclick = () => {
    const inputCheck = document.querySelector(
      '.form__sign-up input[type="radio"]:checked'
    )
    /* Assign Value Input To User Register */
    inputField.forEach((input) => {
      user.userRegister[input.id] = input.value
    })
    user.userRegister[inputCheck.name] = inputCheck.value
  }
  /* Validation SignUp Form */
  const validSignUp = new Validation()
  validSignUp.validateForm('.form__sign-up')
  validSignUp.callAPI = () => {
    /* Call API Post Data User Register After Validation */
    user.postUserRegister(showPopup, clearForm)
  }
}

/* SignIn Form */
{
  const btnSignIn = document.querySelector('#btn-sign-in')
  const inputField = document.querySelectorAll('.form__sign-in input')
  const clearForm = () => {
    for (const input of inputField) {
      input.value = ''
    }
    document.querySelector('#log-out').style.display = 'inline'
  }
  btnSignIn.onclick = () => {
    /* Assign Value Input To User Login */
    inputField.forEach((input) => {
      user.userLogin[input.id.split('-')[0]] = input.value
    })
    console.log(user.userLogin)
  }
  /* Validation SignIn Form */
  const validSignIn = new Validation()
  validSignIn.validateForm('.form__sign-in')
  validSignIn.callAPI = () => {
    user.postUSerLogin(showPopup, clearForm)
  }
}

/* Check Login, Logout */
import { checkLogin, logOut } from '../utils/method.js'
checkLogin()
logOut()
