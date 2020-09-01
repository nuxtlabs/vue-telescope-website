import Vue from 'vue'

export default async function (
  { $content, beforeNuxtRender, nuxtState },
  inject
) {
  let updatedAt
  if (process.server) {
    const changelog = await $content('changelog').only('updatedAt').fetch()
    updatedAt = changelog.updatedAt
    beforeNuxtRender(({ nuxtState }) => {
      nuxtState.changelog = { updatedAt }
    })
  } else {
    updatedAt = nuxtState.changelog.updatedAt
  }
  const $changelog = new Vue({
    data() {
      return {
        updatedAt,
        lastSeenAt: updatedAt // to set hasSeen to true on SSR
      }
    },
    computed: {
      hasSeen() {
        if (!this.lastSeenAt) return false

        return new Date(this.lastSeenAt) >= new Date(this.updatedAt)
      }
    },
    methods: {
      saw() {
        this.lastSeenAt = this.updatedAt
        localStorage.setItem('changelog_seen_at', this.lastSeenAt)
      }
    }
  })
  inject('changelog', $changelog)

  if (process.client) {
    window.onNuxtReady(() => {
      $changelog.lastSeenAt = localStorage.getItem('changelog_seen_at')
    })
  }
}
