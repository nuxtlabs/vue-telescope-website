## TODO

- duplication of `setFilterKey` call, to repro:
  - got to `/explore`
  - select Nuxt in Framework filter (see duplicate `setFilterKey` output in devtools)
  - select Tailwind in UI (same)
  - now select Pinia in Plugins and it completely fails to work properly because of double call: in devtools it says `setFilterKey plugins.slug ['pinia']` first and `setFilterKey plugins.slug []` second, so filters are broken. Check working vuetelescope.com for example of working filters.
- lot's of SSR hydration issues in console on `/explore` and in `InstallExtensionButton`
- ShowcaseSelectedFilters appear animation and adding second filter animation is broken
- components not working with Composition API script setup:
  - AnimatedNumber: issue with `watch` and `this.$gsap.to(this.$data, { duration: 0.5, tweenedCount: newValue })`
  - ShowcasesSorting: issue with `:ref="option._sort"`

---

- update `.twitter-like` to `.floating-view`

- blocked by Content module
- blocked by broken auth
- blocked by CORS issues
