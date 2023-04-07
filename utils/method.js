/* Display Icon User If Have Access Token */
export function checkLogin() {
  if (localStorage.getItem('accessToken')) {
    document.querySelector('#log-out').style.display = 'inline'
  } else {
    document.querySelector('#log-out').style.display = 'none'
  }
}

export function logOut() {
  document.querySelector('#log-out').onclick = () => {
    localStorage.removeItem('accessToken')
    checkLogin()
  }
}
