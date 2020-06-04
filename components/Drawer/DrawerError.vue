<template>
  <div class="h-full flex flex-col">
    <div
      class="flex-1 text-nuxt-gray flex flex-col items-center justify-center"
    >
      <div class="text-6xl font-bold">
        <div v-if="code === 2">Ooh !</div>
        <div v-else>Oops !</div>
      </div>
      <div class="text-xl">
        <p v-if="code === 2">
          Vue detected, but we can’t analyze the site
        </p>
        <p v-else>
          The site doesn’t use the technologies analyzed <br />by Vue telemetry
        </p>
      </div>
    </div>
    <div class="flex justify-end items-end justify-end mr-4 mb-4 self-end">
      <GreyRobotIllustration v-if="code === 1" />
      <NotFoundRobotIllustration v-else />
    </div>
  </div>
</template>

<script>
import GreyRobotIllustration from '@/assets/illustrations/grey-robot.svg?inline'
import NotFoundRobotIllustration from '@/assets/illustrations/not-found-robot.svg?inline'

export default {
  name: 'Error',
  components: {
    GreyRobotIllustration,
    NotFoundRobotIllustration
  },
  props: {
    code: {
      type: Number,
      required: true
    }
  }
}
</script>
