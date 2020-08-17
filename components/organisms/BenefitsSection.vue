<template>
  <section class="py-24">
    <div
      v-for="benefit in benefits"
      :key="benefit.id"
      class="flex flex-wrap mb-12 md:mb-24 max-w-pretty-wide m-auto"
      :class="[!(benefit.id % 2) && 'flex-row-reverse']"
    >
      <div class="w-full md:w-1/2 px-4 flex flex-col justify-center">
        <h3
          :class="[benefit.styles && benefit.styles.text]"
          class="text-four leading-four font-display-weight mb-4 md:mb-2 text-center md:text-left"
        >
          {{ benefit.title }}
        </h3>
        <p class="text-center md:text-left text-eight leading-eight mb-4">
          {{ benefit.description }}
        </p>
        <div class="flex flex-col mb-4 text-center md:text-left">
          <template v-for="(link, i) in benefit.links">
            <a
              v-if="link.type === 'external'"
              :key="i"
              :class="[benefit.styles && benefit.styles.text]"
              :href="link.href"
              class="font-bold-body-weight hover:opacity-50"
              rel="noopener nofollow noreferrer"
              target="_blank"
            >
              {{ link.text }} →
            </a>
            <NuxtLink
              v-else
              :key="i"
              :class="[benefit.styles && benefit.styles.text]"
              :to="link.route"
              class="font-bold-body-weight hover:opacity-50"
            >
              {{ link.text }} →
            </NuxtLink>
          </template>
        </div>
      </div>
      <div class="w-full md:w-1/2 px-4">
        <img
          :src="benefit.image"
          alt=""
          class="w-full max-w-sm md:max-w-full m-auto"
        />
      </div>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      showcasesCount: (state) => state.showcasesCount
    }),
    benefits() {
      return [
        {
          id: 1,
          title: 'Free To Use',
          description:
            'Made for the Vue community by the Vue community! Join other Vue.js devs and explore websites for free.',
          links: [
            {
              type: 'internal',
              text: 'Explore for free',
              route: {
                name: 'explore'
              }
            }
          ],
          styles: {
            text: 'text-red-500'
          },
          image: '/images/benefits/free.png'
        },
        {
          id: 2,
          title: 'Browser Extension',
          description:
            'With the Vue Telemetry Browser extension available for both Firefox and Chrome you can see information about the website without leaving the page! Just by clicking on the extention icon and you will see what framework the page is using, what UI/CSS library and so much more.',
          links: [
            {
              type: 'external',
              href:
                'https://github.com/nuxt-company/vue-telemetry-extensions/blob/master/README.md#chrome',
              text: 'Check on Chrome Web Store'
            }
          ],
          styles: {
            text: 'text-orange-500'
          },
          image: '/images/benefits/extension.png'
        },
        {
          id: 3,
          title: 'Open Source',
          description:
            'Vue Telemetry is open source which means anyone can contribute as well as add new plugins.',
          links: [
            {
              type: 'external',
              href: 'https://github.com/nuxt-company/vue-telemetry-analyzer',
              text: 'Vue Telemetry Analyzer on Github'
            },
            {
              type: 'external',
              href: 'https://github.com/nuxt-company/vue-telemetry-extensions',
              text: 'Browser extension on Github'
            }
          ],
          styles: {
            text: 'text-blue-500'
          },
          image: '/images/benefits/open-source.png'
        },
        {
          id: 4,
          title: 'Respect Privacy',
          description:
            // eslint-disable-next-line
            `We highly respect your privacy and we don't collect any personal data.`,
          links: [
            {
              type: 'internal',
              text: 'Check Our Terms',
              route: {
                name: 'terms'
              }
            }
          ],
          styles: {
            text: 'text-purple-500'
          },
          image: '/images/benefits/privacy.png'
        },
        {
          id: 5,
          title: 'Huge Database',
          description:
            // eslint-disable-next-line
            `Wonder what other sites are using Vue.js and it's ecosystem? You can use our database, that already has ${this.showcasesCount} websites and counting!`,
          links: [
            {
              type: 'internal',
              text: 'Check our database',
              route: {
                name: 'explore'
              }
            }
          ],
          styles: {
            text: 'text-primary-500'
          },
          image: '/images/benefits/database.png'
        }
      ]
    }
  }
}
</script>

<style></style>
