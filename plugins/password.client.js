const PASS_KEY = 'beta-password'

async function checkPassword() {
  let password = localStorage.getItem(PASS_KEY)

  if (!password) {
    password = prompt('Please provide the beta password:')
    localStorage.setItem(PASS_KEY, password)
  }
  await fetch(`/api/password?password=${password}`).then(async (res) => {
    if (res.status === 200) {
      return
    }
    localStorage.setItem(PASS_KEY, '')
    await checkPassword()
  })
}

export default checkPassword
