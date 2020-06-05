<template>
  <section id="explain" class="relative mt-36 sm:mt-72 mb-28">
    <BgGradient klass="explain" />
    <div class="max-w-6xl mx-auto h-full px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 mb-14">
        <div class="flex items-center justify-center">
          <h5
            class="mb-6 sm:mb-0 text-4xl leading-8 font-bold tracking-tighter text-nuxt-gray sm:leading-10"
          >
            What’s
            <span class="text-emerald">Vue Telemetry ?</span>
          </h5>
        </div>
      </div>
      <div class="flex flex-col-reverse sm:grid sm:grid-cols-2 sm:gap-16 mb-14">
        <div class="flex items-center">
          <p class="text-gray-500">
            We've developed Vue Telemetry to track down websites built with
            VueJS and its ecosystem. The Vue Telemetry browser extension is able
            to detect Vue on each and every url you visit.
          </p>
        </div>
        <div class="mb-8 sm:mb-0 flex items-center justify-center">
          <img src="/img/ecosystem.svg" alt="vue telemetry ecosystem" />
        </div>
      </div>
      <div class="flex flex-col-reverse sm:grid sm:grid-cols-2 sm:gap-16 mb-14">
        <div class>
          <div class="flex flex-row mb-4">
            <div
              class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-emerald"
            >
              <ScalesIcon class="h-6 w-6" />
            </div>
            <div class="ml-4">
              <p class="text-base leading-6 text-gray-500">
                The application and the showcase are available online and access
                is
                <span class="text-emerald font-semibold">free</span>
                for everyone.
              </p>
            </div>
          </div>
          <div class="flex flex-row mb-4">
            <div
              class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100"
            >
              <FingerprintIcon class="h-6 w-6" />
            </div>
            <div class="ml-4">
              <p class="text-base leading-6 text-gray-500">
                No personal data is collected, only the submitted url is scanned
                and saved.
              </p>
            </div>
          </div>
          <div class="flex flex-row">
            <div
              class="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-green-100 text-emerald"
            >
              <GitBranchIcon class="h-6 w-6" />
            </div>
            <div class="ml-4">
              <p class="text-base leading-6 text-gray-500">
                The analyzer is
                <a
                  href="https://github.com/nuxt-company/vue-telemetry-analyzer"
                  target="_blank"
                  rel="noopener"
                  class="text-emerald font-semibold"
                  >open source</a
                >, which means that anyone can add new technologies.
              </p>
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center">
          <h5
            class="mb-8 sm:mb-0 text-4xl leading-8 font-bold tracking-tighter text-nuxt-gray"
          >
            <span class="text-emerald">Why use</span> Vue Telemetry ?
          </h5>
        </div>
      </div>
      <div class="flex flex-col sm:grid sm:grid-cols-2 sm:gap-16">
        <div class="mb-6 sm:mb-0">
          <h5
            class="mb-6 text-center text-4xl font-bold tracking-tighter text-nuxt-gray"
          >
            How to
            <span class="text-emerald">install it ?</span>
          </h5>
          <p class="mb-8 text-gray-500">
            Vue Telemetry is also available on Google Chrome and Mozilla
            Firefox. Quickly see when a website uses Vue and reveal the
            ecosystem used inside with one click.
            <br />Start now and download Vue Telemetry for your favourite
            browser.
          </p>
          <div class="text-center">
            <NuxtLink
              to="/download"
              class="inline-flex items-center px-6 py-3 border border-transparent text-base leading-6 capitalize font-semibold rounded-full shadow-md text-white bg-emerald hover:shadow-xl focus:outline-none focus:border-green-400 focus:shadow-outline-green-400 active:bg-green-200 transition ease-in-out duration-150"
            >
              Browser Extensions
            </NuxtLink>
          </div>
        </div>
        <div class="hidden sm:block">
          <img src="/img/extension.svg" alt="vue telemetry extension" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import ScalesIcon from '@/assets/icons/scales.svg?inline'
import FingerprintIcon from '@/assets/icons/fingerprint.svg?inline'
import GitBranchIcon from '@/assets/icons/git-branch.svg?inline'

export default {
  components: {
    ScalesIcon,
    FingerprintIcon,
    GitBranchIcon
  }
}
</script>

<style></style>
