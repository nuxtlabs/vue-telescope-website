<template>
  <section class="py-24">
    <div
      v-for="benefit in benefits"
      ref="benefitRef"
      :key="benefit.id"
      class="flex flex-wrap m-auto mb-12 md:mb-24 max-w-pretty-wide"
      :class="[!(benefit.id % 2) && 'flex-row-reverse']"
    >
      <div class="flex flex-col justify-center w-full px-4 md:w-1/2">
        <h3
          :class="[benefit.styles?.text]"
          class="mb-4 text-center text-four leading-four font-display-weight md:mb-2 md:text-left"
        >
          {{ benefit.title }}
        </h3>
        <p class="mb-4 text-center md:text-left text-eight leading-eight">
          {{ benefit.description }}
        </p>
        <div class="flex flex-col mb-4 text-center md:text-left">
          <template v-for="(link, i) in benefit.links">
            <a
              v-if="link.type === 'external'"
              :key="link.text"
              :class="[benefit.styles?.text]"
              :href="link.href"
              class="font-bold-body-weight has-hover:hover:opacity-50"
              rel="noopener nofollow noreferrer"
              target="_blank"
            >
              {{ link.text }} →
            </a>
            <NuxtLink
              v-else
              :key="link.text + i"
              :class="[benefit.styles?.text]"
              :to="link.route"
              class="font-bold-body-weight has-hover:hover:opacity-50"
            >
              {{ link.text }} →
            </NuxtLink>
          </template>
        </div>
      </div>
      <div class="w-full px-4 md:w-1/2">
        <img
          width="1200"
          height="800"
          loading="lazy"
          :src="`https://res.cloudinary.com/nuxt/image/upload/f_auto,q_auto/remote/vt${benefit.image}`"
          alt=""
          class="w-full max-w-sm m-auto md:max-w-full"
        >
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { animate, scroll } from 'motion'

const showcasesCount = useShowcasesCount()

type BenefitLink = {
  type: 'external' | 'internal',
  text: string,
  href?: string,
  route?: {
    name: string
  }
}

type Benefit = {
  id: number,
  title: string,
  description: string,
  links: BenefitLink[],
  styles: {
    text: string
  },
  image: string
}

const benefits: Benefit[] = [
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
      'With the Vue Telescope Browser extension available for both Firefox and Chrome you can see information about the website without leaving the page! Just by clicking on the extention icon and you will see what framework the page is using, what UI/CSS library and so much more.',
    links: [
      {
        type: 'external',
        href: 'https://github.com/nuxt-company/vue-telescope-extensions/blob/master/README.md#chrome',
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
      'Vue Telescope is open source which means anyone can contribute as well as add new plugins.',
    links: [
      {
        type: 'external',
        href: 'https://github.com/nuxt-company/vue-telescope-analyzer',
        text: 'Vue Telescope Analyzer on Github'
      },
      {
        type: 'external',
        href: 'https://github.com/nuxt-company/vue-telescope-extensions',
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
        text: 'Check Our Privacy Policy',
        route: {
          name: 'privacy'
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
      `Wonder what other sites are using Vue.js and it's ecosystem? You can use our database, that already has ${showcasesCount.value} websites and counting!`,
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

const benefitRef = ref([])

onMounted(() => {
  benefitRef.value.forEach((item, i) => {
    scroll(animate(item, { opacity: [0, 1], x: [i % 2 ? 25 : -25, 0], scale: [0.9, 1], filter: ['blur(20px)', 'blur(0px)'] }), {
      target: item,
      // offset: ['start end', 'end end']
      offset: ['0% 100%', '75% 100%']
    })
  })
})
</script>
