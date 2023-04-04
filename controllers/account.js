const btnSignUp = document.querySelector('#signUp')
const btnSignIn = document.querySelector('#signIn')
const formContainer = document.querySelector('.form-container')

btnSignUp.onclick = () => {
  formContainer.classList.add('right-panel-active')
}

btnSignIn.onclick = () => {
  formContainer.classList.remove('right-panel-active')
}
