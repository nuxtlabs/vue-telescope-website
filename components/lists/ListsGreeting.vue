<template>
  <section
    style="min-height: 50vh"
    class="w-full text-center flex flex-col items-center justify-center"
  >
    <h1
      class="mx-auto text-four leading-four max-w-readable md:text-three md:leading-three text-center mt-8 md:mt-16 px-12 font-bold-body-weight mb-6"
    >
      Create <br>
      your own Lists <br>and bookmark any website!
    </h1>
    <p
      class="mx-auto text-eight leading-eight text-center mb-10 md:w-3/4 text-grey-700 px-8"
    >
      Login with GitHub to start using Vue Telescope Lists.
    </p>
    <GithubLoginButton class="mb-8" />
    <div class="text-sm leading-sm px-4">
      By signing up, you agree to the
      <a target="_blank" href="/terms" class="underline">Terms of Service</a>
      and
      <a target="_blank" href="/privacy" class="underline">Privacy Policy</a>.
    </div>
  </section>
</template>
