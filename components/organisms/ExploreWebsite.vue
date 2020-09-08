<template>
  <div v-if="website" class="pointer-events-auto">
    <header class="relative pt-14 pb-6 flex justify-between items-center">
      <div class="relative">
        <h1
          class="truncate-multiline-2 pr-4 mb-2 text-five leading-five md:text-five md:leading-five font-display-weight"
        >
          {{ website.siteName || website.title }}
        </h1>
        <div class="description">
          <p class="text-eight leading-eight">{{ website.description }}</p>
        </div>
        <a
          v-if="!website.isAdultContent"
          :href="website.url"
          target="_blank"
          class="h-6 absolute top-0 left-0 flex -mt-7 text-primary-300 hover:opacity-50 font-bold-body-weight"
        >
          <LinkIcon class="w-3 mr-2" />
          <span class style="width: max-content;">{{ website.hostname }}</span>
        </a>
      </div>

      <div
        v-if="website.isAdultContent"
        class="flex items-center font-display-weight text-orange-500"
      >
        <ExclamationIcon class="w-5 h-5 mr-2" />18+
      </div>
    </header>

    <div class="flex flex-wrap">
      <div class="w-full xl:w-1/2 mb-8">
        <div class="image relative rounded-xl overflow-hidden">
          <AppResponsiveCloudinaryImage
            :url="website.screenshotUrl"
            :pixelate="website.isAdultContent"
            ratio="4:3"
            sizes="100vw"
            class=""
          />
          <div
            v-if="localPreview && !website.isPublic"
            style="
              background-color: rgba(0, 0, 0, 0.1);
              backdrop-filter: blur(6px);
            "
            class="xl:rounded-xl top-0 left-0 absolute w-full h-full flex items-center justify-center"
          >
            <AppButton
              appearance="primary"
              size="large"
              class="flex items-center justify-center"
              @click.native="submitWebsite"
            >
              <div
                :class="[
                  !pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                ]"
                class="transition duration-200 transform ease-in-out"
              >
                Save
              </div>
              <div
                :class="[
                  pending ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                ]"
                class="absolute transition duration-200 transform ease-in-out"
              >
                <AppLoader
                  class="w-6 h-6"
                  background="text-primary-400"
                  path="text-primary-300"
                />
              </div>
            </AppButton>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-1/2">
        <WebsiteInfo :website="website" />
      </div>
    </div>
  </div>
</template>

<script>
import ExclamationIcon from '@/assets/icons/exclamation.svg?inline'
import LinkIcon from '@/assets/icons/link.svg?inline'

export default {
  components: {
    ExclamationIcon,
    LinkIcon
  },
  props: {
    website: {
      type: Object,
      default: () => {}
    },
    preview: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      pending: false,
      localPreview: this.preview
    }
  },
  methods: {
    async submitWebsite() {
      this.pending = true
      const res = await fetch(
        `/api/analyze?url=${this.website.hostname}&isPublic=true&force=true`,
        {
          method: 'GET'
        }
      )
        .then((response) => {
          this.pending = false
          return response.json()
        })
        .catch((err) => {
          this.pending = false
          throw new Error(err)
        })
      if (res.statusCode === 200 && !res.body.isAdultContent) {
        this.$store.commit('SET_MODAL', true)
        history.pushState({}, null, `/explore/${res.body.slug}`)
        // history.replaceState({}, null, `/explore/${res.body.slug}`)
        this.localPreview = false
        // window.location.replace(`/explore/${res.body.slug}`)
        // this.$router.replace({
        //   name: 'explore-website',
        //   params: {
        //     website: res.body.slug
        //   }
        // })
      }
    }
  }
}
</script>

<style scoped lang="postcss">
.hero-image {
  padding-bottom: 56.25%;
}
.hero-image:after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.hero-image img {
  object-fit: cover;
  object-position: top;
}

.hero-info {
  position: absolute;
  top: 0;
  left: 50%;
  z-index: 1;
  transform: translateX(-50%);
  width: 100%;
}

.twitter-like header {
  @apply px-8;
}
/* .twitter-like .description {
  @apply px-8;
} */

.twitter-like .image {
  @apply rounded-none;
  @screen xl {
    @apply rounded-xl ml-8;
  }
}
</style>
