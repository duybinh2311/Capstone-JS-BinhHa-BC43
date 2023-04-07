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
        if (isValid) {
          if (typeof this.callAPI === 'function') {
            this.callAPI()
            return
          }
          formElement.submit()
        }
      }
    }
  }

  /* Function Valid */
  validFunctions = {
    required: (value) => {
      return value.trim() ? '' : `Vui lòng không bỏ trống`
    },
    number: (value) => {
      const regexNumber = /^[0-9]+$/
      return regexNumber.test(value) ? '' : `Vui lòng nhập vào số`
    },
    letter: (value) => {
      const regexLetter = /^[A-Z a-z]+$/
      return regexLetter.test(this.validFunctions.removeAscent(value))
        ? ''
        : `Vui lòng nhập vào kí tự`
    },
    removeAscent: (str) => {
      if (str === null || str === undefined) return str
      str = str.toLowerCase()
      str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a')
      str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e')
      str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i')
      str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o')
      str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u')
      str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y')
      str = str.replace(/đ/g, 'd')
      return str
    },
    email: (value) => {
      const regexEmail =
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      return regexEmail.test(value) ? '' : `Email không hợp lệ`
    },
    password: (value) => {
      const regexPassword =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/
      return regexPassword.test(value)
        ? ''
        : `Mật khẩu cần ít nhất một kí tự hoa, số và kí tự đặc biệt`
    },
    min: (min) => {
      return (value) => {
        return value.length >= min ? '' : `Tối thiểu ${min} kí tự`
      }
    },
    max: (max) => {
      return (value) => {
        return value.length <= max ? '' : `Tối đa ${max} kí tự`
      }
    },
    confirm: (selectorConfirm) => {
      return (value) => {
        const valueConfirm = document.querySelector(selectorConfirm).value
        return value === valueConfirm ? '' : `Nhập lại không chính xác`
      }
    },
  }
}
