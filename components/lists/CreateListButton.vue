<template>
  <div class="h-10 flex items-center mx-2 relative">
    <div class="h-full flex flex-1 items-center relative mr-1 truncate">
      <transition :css="false" @enter="enter" @leave="leave">
        <div v-if="creatingList" class="w-full h-full absolute z-10">
          <AppAutosizeTextarea
            ref="inputEl"
            v-model="name"
            v-click-outside="() => (creatingList = false)"
            placeholder="Name Your List"
            class="rounded-2lg py-2 px-4 text-base leading-base font-bold-body-weight placeholder-grey-500"
            @submit="createList"
            @keydown.esc.native="clearActions"
            @click.stop.native
          />
        </div>
        <button
          v-else
          class="group focus:outline-none w-full h-10 flex items-center py-1 px-4 text-base leading-base font-bold-body-weight bg-primary-50 border-2 border-transparent hover:border-primary-500 rounded-2lg text-primary-500 transition-colors duration-200 truncate"
          @click="initListCreation"
        >
          <PlusIcon
            class="w-4 h-4 mr-2 opacity-100 has-hover:group-hover:opacity-100"
            style="stroke-width: 2.5px"
          />
          <span
            class="tracking-1 opacity-100 has-hover:group-hover:opacity-100 truncate"
          >
            Create List
          </span>
        </button>
      </transition>

      <button
        v-if="name"
        class="focus:outline-none absolute top-0 right-0 z-10 p-1 m-1 bg-grey-100 rounded-md border-2 border-transparent"
        @click="clearInput"
      >
        <XmarkIcon class="w-5 h-5" />
      </button>
    </div>

    <div class="w-10 h-10">
      <button
        v-if="creatingList && name"
        title="Save"
        class="focus:outline-none border-2 border-transparent bg-grey-50 rounded-lg p-2"
        @click.stop="createList"
      >
        <AppLoader
          v-if="loading"
          class="w-5 h-5"
          background="text-grey-400"
          path="text-grey-200"
        />
        <SaveIcon v-else class="w-5 h-5" />
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/icons/plus-circle.svg'
import SaveIcon from '@/assets/icons/save.svg'
import XmarkIcon from '@/assets/icons/xmark.svg'

const { createRemoteList } = useLists()
const { $gsap } = useNuxtApp()

const inputEl = ref(null)

const emit = defineEmits(['cleanup'])

const name = ref('')
const loading = ref(false)
const creatingList = ref(false)

watch(creatingList, (value) => {
  if (!value) { name.value = '' }
})

function clearActions () {
  name.value = ''
  emit('cleanup')
}

function initListCreation () {
  creatingList.value = true
  nextTick(() => {
    inputEl.value?.$el.focus()
  })
}

function clearInput () {
  name.value = ''
  inputEl.value?.$el.focus()
}

async function createList () {
  if (!name.value || loading.value) { return }
  try {
    loading.value = true
    await createRemoteList({
      name: name.value
    })
    name.value = ''
    clearActions()
    loading.value = false
    creatingList.value = false
  } catch (e) {
    loading.value = false
    // TODO: display toast with error
  }
}

function enter (el, done) {
  inputEl.value?.$el.focus()
  nextTick(() => {
    $gsap.set(el, { position: 'absolute', transformOrigin: 'left' })
    $gsap.from(el, {
      scale: 0.9,
      autoAlpha: 0,
      clearProps: true,
      // y: -5,
      duration: 0.25,
      ease: 'power1.out',
      onComplete: () => {
        $gsap.set(el, { position: 'relative' })
        inputEl.value?.$el.focus()
        done()
      }
    })
  })
}

function leave (el, done) {
  $gsap.set(el, { transformOrigin: 'left' })
  $gsap.to(el, {
    // position: 'absolute',
    scale: 0.9,
    autoAlpha: 0,
    // y: -5,
    clearProps: true,
    duration: 0.25,
    ease: 'power1.out',
    onComplete: done
  })
}
</script>
