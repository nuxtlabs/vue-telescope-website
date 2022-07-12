## TODO

- ~~duplication of `setFilterKey` call, to repro:~~
  - got to `/explore`
  - select Nuxt in Framework filter (see duplicate `setFilterKey` output in devtools)
  - select Tailwind in UI (same)
  - now select Pinia in Plugins and it completely fails to work properly because of double call: in devtools it says `setFilterKey plugins.slug ['pinia']` first and `setFilterKey plugins.slug []` second, so filters are broken. Check working vuetelescope.com for example of working filters.
- lot's of SSR hydration issues in console:
  - ~~on `/explore`~~
  - ~~in `InstallExtensionButton`~~
  - `ShowcasesSelectedFilters`
- ~~different data fetched on server and client side on http://localhost:3000/explore page load~~
- components not working with Composition API script setup:
  - ~~`AnimatedNumber`: issue with `watch` and `this.$gsap.to(this.$data, { duration: 0.5, tweenedCount: newValue })`~~
  - `ShowcasesSorting`: issue with `:ref="option._sort"`, can't use as ref name?
- ~~not sure how to implement properly in Nuxt 3 `ExplorePage` fetching depending on `isModal`. This is how it worked before, with new API it's seems impossible~~

```js
async fetch() {
  if (this.isModal) return
  // ...fetch
}
watch: {
  isModal(value) {
    // performance improvement hack
    // do not fetch showcases when navigating from Landing slider
    // fetch after it's modal closed
    if (!value && !this.showcases.length) {
      this.$fetch()
    }
  }
}
```

- not sure how to implement properly `changelog` plugin

---

- `ListShowcaseCardsListing` not working Showcase modal open without URL change because e.preventDefault on NuxtLink does not work

---

- update `.twitter-like` to `.floating-view`
- rename `MobileModalWrapper` to `MobileSlideModalWrapper`
- `collections` to `lists` (as on Strapi)

- blocked by Content module
- blocked by broken Strapi auth
- blocked by CORS issues

- add fathom
