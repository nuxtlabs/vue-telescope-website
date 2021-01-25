---
title: Changelog
updatedAt: 2021-01-25
---

<changelog-item project="analyzer" date="2020-01-25">

## Vue Telemetry Analyzer v0.9.0 release

- rename Vue Telemetry to Vue Telescope

</changelog-item>

<changelog-item project="extension" date="2020-01-25">

## Vue Telemetry extension 1.5.2 release

- `insafe-eval` directive was removed from Content Security Policy to improve security and performance
- rename Vue Telemetry to Vue Telescope to avoid a confusion from community 🙌

</changelog-item>

<changelog-item project="website" date="2020-01-25">

## Renaming Vue Telemetry to Vue Telescope and new Collections feature

After communicating with Vue.js community we decided to rename Vue Telemetry to Vue telescope to avoid unnecessary associations and concerns about privacy.

We also added a Collections feature, so now you can organize showcases into Collections and Lists. You can also share your Collections with community and use provided data in own apps.

<nuxt-link to="/changelog/collections" class="block pb-4">
  <img src="collections.gif" alt="vue telemetry collections" class="rounded-md shadow m-auto max-h-72" />
</nuxt-link>

</changelog-item>

<changelog-item project="extension" date="2020-10-20">

## Vue Telemetry extension v1.4.1 release

- fixes issues with login to phpMyAdmin, Cloudflare, Mailchimp etc

</changelog-item>

<changelog-item project="website" date="2020-09-24">

## Sort by popularity

You can now [sort websites by popularity](/explore?_sort=rank%3Aasc), we are using the [Alexa Rank](https://blog.alexa.com/marketing-research/alexa-rank/) for ranking.

<nuxt-link to="/explore?_sort=rank%3Aasc" class="block pb-4">
  <img src="https://res.cloudinary.com/nuxt/image/upload/remote/vt/changelog/vt-sorting.gif" alt="vue telemetry sorting" class="rounded-md shadow" />
</nuxt-link>

</changelog-item>

<changelog-item project="website" date="2020-09-18">

## Website improvements and fixes

- hide "Install extension" button if extension already installed
- fix the ENOMEM error on lookup input

</changelog-item>

<changelog-item project="extension" date="2020-09-18">

## Vue Telemetry extension v1.4.0 release

- URL's ignore list (localhost, IP's)
- fix SourceMap warning
- fix the ENOMEM error
- add `window.$vueTelemetryExtension` for extension installation detection

</changelog-item>

<changelog-item project="analyzer" date="2020-09-18">

## Vue Telemetry Analyzer v0.7.6 release

- use Puppeteer
- update Puppeteer configuration to fix the ENOMEM error
- add [vee-validate](https://github.com/logaretm/vee-validate) support

</changelog-item>

<changelog-item project="analyzer" date="2020-09-12">

## New Detectors 🤖

Vue Telemetry analyzer is [open source](https://github.com/nuxt-company/vue-telemetry-analyzer), allowing anyone to add new detectors for Vue frameworks, plugins, Nuxt modules and UI librairies.

We received 3 pull requests, adding support for:

- [Vue Tailwind](https://www.vue-tailwind.com) (PR [#17](https://github.com/nuxt-company/vue-telemetry-analyzer/pull/17) by [@alfonsobries](https://github.com/alfonsobries)) 👉 &nbsp;[Explore websites using Vue Tailwind](/explore?ui.slug=vue-tailwind)
- [@braid/vue-formulate](https://vueformulate.com) (PR [#19](https://github.com/nuxt-company/vue-telemetry-analyzer/pull/19) by [@justin-schroeder](https://github.com/justin-schroeder)) 👉 &nbsp;[Explore websites using @braid/vue-formulate](/explore?plugins.slug=vue-formulate)
- [Inertia.js](https://inertiajs.com) (PR [#20](https://github.com/nuxt-company/vue-telemetry-analyzer/pull/20) by [@KABBOUCHI](https://github.com/KABBOUCHI)) 👉 &nbsp;[Explore websites using Inertia.js](/explore?plugins.slug=inertia-vue)

Thank you to these awesome contributors! We are looking forward seing more detectors from the Vue community 💚

</changelog-item>

<changelog-item project="website" date="2020-09-08">

## VueTelemetry.com is live ✨

Afer multiple weeks of private beta to gather feedback, we are excited to officialy release Vue Telemetry.

Vue Telemetry is a website and a [browser extension](/extensions) revealing the Vue plugins and technology stack powering any website.

At [NuxtJS](https://nuxtjs.org), we are Vue developers and curious about what Vue plugins or Nuxt modules are used when looking at a website, this is why we created Vue Telemetry, a tool inspired by the [Vue Devtools](https://github.com/vuejs/vue-devtools) and [Wappalyzer](https://www.wappalyzer.com) for the Vue commmunity.

Vue Telemetry provides Vue developers a tool to explore Vue.js ecosystem for inspiration, research or analysis.

The website and extension are free to use, we do not track you and fully respect your privacy (we are developers too so we know how bad tracking is).

The [analyzer](https://github.com/nuxt-company/vue-telemetry-analyzer) and [browser extensions](https://github.com/nuxt-company/vue-telemetry-extensions) are open source and adding new detector is [super easy](https://github.com/nuxt-company/vue-telemetry-analyzer/blob/master/detectors/plugins.json)!

We would like to thank [Netlify](https://www.netlify.com) and [Cloudinary](https://cloudinary.com) for offering their service to the Vue community 💚

</changelog-item>

<changelog-item project="extension" date="2020-09-07">

## Vue Telemetry extension v1.2 release

The extension now analyze locally, making it as fast as Vue Devtools to detect Vue and its ecosystem ⚡️

</changelog-item>

<changelog-item project="extension" date="2020-08-18">

## Vue Telemetry extension 1.1.2 release

Handle fonts and remove basic auth.

</changelog-item>

<changelog-item project="website" date="2020-08-09">

## Private Beta release

Vue Telemetry website opens private access to beta testers from Vue.js community.

</changelog-item>

<changelog-item project="analyzer" date="2020-07-22">

## Bug Fixes

Change buefy icon

</changelog-item>
