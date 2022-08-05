import { useState } from '#imports'

export const usePrivacyAwareness = () => {
  const privacyAwarenessCb = useState('privacyAwarenessCb', () => null)

  function setPrivacyAwarenessCb (cb) {
    privacyAwarenessCb.value = cb
  }

  function processPrivacyAwareness (cb) {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem('privacyAware') !== 'true') {
        setPrivacyAwarenessCb(cb)
        resolve(false)
      } else {
        cb()
        resolve(true)
      }
    })
  }

  return { processPrivacyAwareness, privacyAwarenessCb, setPrivacyAwarenessCb }
}
