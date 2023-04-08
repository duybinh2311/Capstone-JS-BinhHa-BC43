export default class Validation {
  validateForm(selectorForm) {
    /* Get Form Need Valid */
    const formElement = document.querySelector(selectorForm)
    /* If Formelement Has It, Loop List Input Get Rule Check */
    if (formElement) {
      const inputList = formElement.querySelectorAll('[id][rulesCheck]')
      const formRules = {}
      const handleError = (event) => {
        let errorMessage = ''
        formRules[event.target.id].find((test) => {
          errorMessage = test(event.target.value)
          return errorMessage
        })
        if (errorMessage) {
          event.target.parentElement.querySelector('.form-message').innerHTML =
            errorMessage
          event.target.classList.add('invalid')
          return true
        }
        return false
      }
      const clearError = (event) => {
        event.target.parentElement.querySelector('.form-message').innerHTML = ''
        event.target.classList.remove('invalid')
      }
      for (let input of inputList) {
        let rules = input.getAttribute('rulesCheck')
        if (rules.includes('|')) {
          rules = rules.split('|')
        } else {
          rules = [rules]
        }
        for (let rule of rules) {
          if (rule.includes(':')) {
            const ruleSplit = rule.split(':')
            if (Array.isArray(formRules[input.id])) {
              formRules[input.id].push(
                this.validFunctions[ruleSplit[0]](ruleSplit[1])
              )
              continue
            }
            formRules[input.id] = [
              this.validFunctions[ruleSplit[0]](ruleSplit[1]),
            ]
            continue
          }
          if (Array.isArray(formRules[input.id])) {
            formRules[input.id].push(this.validFunctions[rule])
          } else {
            formRules[input.id] = [this.validFunctions[rule]]
          }
        }
        input.onblur = handleError
        input.oninput = clearError
      }
      formElement.onsubmit = (event) => {
        event.preventDefault()
        let isValid = true
        for (const input of inputList) {
          if (handleError({ target: input })) {
            isValid = false
          }
        }
        if (isValid && typeof this.callAPI === 'function') {
          this.callAPI()
        }
      }
    }
  }

  /* Function Valid */
  validFunctions = {
    required: (value) => {
      return value.trim() ? '' : `Please enter something`
    },
    number: (value) => {
      const regexNumber = /^[0-9]+$/
      return regexNumber.test(value) ? '' : `Input value must be number`
    },
    letter: (value) => {
      const regexLetter = /^[A-Z a-z]+$/
      return regexLetter.test(this.validFunctions.removeAscent(value))
        ? ''
        : `Input value must be letter`
    },
    email: (value) => {
      const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      return regexEmail.test(value) ? '' : `Invalid Email`
    },
    password: (value) => {
      const regexPassword =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      return regexPassword.test(value)
        ? ''
        : `Password needs at least one uppercase, number and special character`
    },
    min: (min) => {
      return (value) => {
        return value.length >= min ? '' : `Min ${min} characters`
      }
    },
    max: (max) => {
      return (value) => {
        return value.length <= max ? '' : `Max ${max} characters`
      }
    },
    confirm: (selectorConfirm) => {
      return (value) => {
        const confirmElement = document.querySelector(selectorConfirm)
        const valueConfirm = confirmElement.value
        return value === valueConfirm
          ? ''
          : `Confirmation ${confirmElement.id} is not correcct`
      }
    },
    removeAscent: (string) => {
      if (string === null || string === undefined) return string
      string = string.toLowerCase()
      string = string.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      string = string.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      string = string.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      string = string.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      string = string.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      string = string.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      string = string.replace(/đ/g, 'd')
      return string
    },
  }
}
