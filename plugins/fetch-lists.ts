import type { Ref } from 'vue'
import type { User } from '~/types'

export default defineNuxtPlugin(() => {
  const user = useStrapiUser() as Ref<User>
  if (user.value) {
    const { setLists } = useLists()
    setLists(user.value.lists)
  }
})
