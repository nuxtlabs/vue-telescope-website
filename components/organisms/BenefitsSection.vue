<template>
  <section class="py-12">
    <div
      v-for="benefit in benefits"
      :key="benefit.id"
      class="flex flex-wrap mb-24 max-w-pretty-wide m-auto"
      :class="[!(benefit.id % 2) && 'flex-row-reverse']"
    >
      <div class="w-full md:w-1/2 px-4">
        <h3 class="text-four leading-four font-display-weight mb-4">
          {{ benefit.title }}
        </h3>
        <p class="text-eight leading-eight">{{ benefit.description }}</p>
      </div>
      <div class="w-full md:w-1/2 h-24 px-4">
        <div class="bg-grey-300 w-full h-full"></div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      benefits: [
        {
          id: 1,
          title: 'Free',
          description:
            'The application and the showcase are available online and access is free for everyone.'
        },
        {
          id: 2,
          title: 'Browser extension',
          description:
            'The application and the showcase are available online and access is free for everyone.'
        },
        {
          id: 3,
          title: 'Open source',
          description:
            'The application and the showcase are available online and access is free for everyone.'
        },
        {
          id: 4,
          title: 'Huge database',
          description:
            'The application and the showcase are available online and access is free for everyone.'
        }
      ]
    }
  }
}
</script>

<style></style>
