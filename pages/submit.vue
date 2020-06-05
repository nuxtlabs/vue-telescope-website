<template>
  <div class="relative">
    <BgGradient klass="scan" />
    <div class="max-w-6xl px-8 py-40 mx-auto">
      <div class="flex">
        <div class="w-full lg:w-1/2">
          <div
            class="text-6xl leading-10 tracking-tight font-extrabold text-nuxt-lightgreen"
          >
            Take a look
          </div>
          <p class="text-sm text-nuxt-gray mt-4 mb-4">
            You're seconds away to find out if a website is using Vue and its
            ecosystem.
          </p>
          <WebsiteSubmit />
        </div>
      </div>
    </div>
  </div>
</template>
