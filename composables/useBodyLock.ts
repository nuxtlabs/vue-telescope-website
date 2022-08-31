export const useBodyLock = () => {
  const isBodyLocked = useState('isBodyLocked', () => false)

  function bodyLock () {
    const scrollBarGap = window.innerWidth - document.documentElement.clientWidth

    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollBarGap}px`

    const fixedEls = document.querySelectorAll('.body-lock-hack')
    fixedEls.forEach((el: HTMLElement) => {
      el.style.paddingRight = `${scrollBarGap}px`
    })
    // document.querySelector(
    //   '#main-header'
    // ).style.paddingRight = `${scrollBarGap}px`
    // document.querySelector(
    //   '#tour-main-header'
    // ).style.paddingRight = `${scrollBarGap}px`

    isBodyLocked.value = true
  }

  function bodyUnlock () {
    setTimeout(() => {
      document.body.style.overflow = null
      document.body.style.paddingRight = null
      // document.querySelector('#main-header').style.paddingRight = null
      const fixedEls = document.querySelectorAll('.body-lock-hack')
      fixedEls.forEach((el: HTMLElement) => {
        el.style.paddingRight = null
      })
      isBodyLocked.value = false
    }, 16)
  }

  return { isBodyLocked, bodyLock, bodyUnlock }
}
