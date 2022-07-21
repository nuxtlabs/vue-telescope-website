<template>
  <div class="el relative flex flex-col items-center justify-center px-4">
    <h2 class="text-center text-four leading-four font-bold-body-weight mb-2">
      You don't have any Lists
    </h2>
    <p class="text-center text-seven leading-seven mb-8">
      Create a List to start saving websites into Groups
    </p>

    <div class="relative w-full h-16 mb-24 flex items-center justify-center">
      <transition :css="false" @enter="enter" @leave="leave">
        <button
          v-if="!creatingList"
          ref="buttonEl"
          class="absolute top-0 focus:outline-none text-seven leading-seven flex items-center py-4 px-8 rounded-xl border-2 border-transparent has-hover:hover:border-primary-500 bg-primary-50 text-primary-500 font-bold-body-weight transition-colors duration-200 truncate"
          @click="initListCreation"
        >
          <div class="mr-2">
            <PlusIcon class="w-5 h-5" style="stroke-width: 2.5px" />
          </div>
          <span>Create Your First List</span>
        </button>

        <div
          v-else
          class="absolute top-0 w-full"
          :style="{ maxWidth: maxWidthStyles + 'px' }"
        >
          <AppAutosizeTextarea
            v-if="creatingList"
            ref="inputEl"
            v-model="newListName"
            v-click-outside="() => (creatingList = false)"
            placeholder="Type List name"
            class="w-full text-seven leading-seven font-bold-body-weight flex py-4 px-8 rounded-xl border-2 border-transparent text-grey-900 transition-colors duration-200 placeholder-grey-400"
            @submit="createList"
            @keydown.esc.native="clearActions"
            @click.stop.native
          />
          <div
            v-if="creatingList && newListName"
            class="absolute top-0 right-0 p-3"
          >
            <button
              title="Save"
              class="focus:outline-none bg-grey-50 border-2 border-grey-200 rounded-3lg p-2 has-hover:hover:text-grey-700"
              @click.stop="createList"
            >
              <SaveIcon class="w-5 h-5" />
            </button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlusIcon from '@/assets/icons/plus-circle.svg'
import SaveIcon from '@/assets/icons/save.svg'

const emit = defineEmits(['cleanup'])

const inputEl = ref(null)
const buttonEl = ref(null)

const { createRemoteList } = useLists()
const { $gsap } = useNuxtApp()

const newListName = ref('')
const creatingList = ref(false)
const maxWidthStyles = ref('')

function clearActions () {
  newListName.value = ''
  emit('cleanup')
}

function initListCreation () {
  maxWidthStyles.value = buttonEl.value.getBoundingClientRect().width
  creatingList.value = true
  nextTick(() => {
    inputEl.value.$el.focus()
  })
}

async function createList () {
  try {
    if (!newListName.value) { return }
    await createRemoteList({
      name: newListName.value
    })
    clearActions()
    creatingList.value = false
  } catch (e) {
    console.log(e)
  }
}

function enter (el, done) {
  inputEl.value && inputEl.value.$el.focus()
  nextTick(() => {
    $gsap.set(el, { position: 'absolute', transformOrigin: 'center' })
    $gsap.from(el, {
      scale: 0.9,
      autoAlpha: 0,
      clearProps: true,
      // y: -5,
      duration: 0.25,
      ease: 'power1.out',
      onComplete: () => {
        $gsap.set(el, {
          // position: 'relative',
          maxWidth: maxWidthStyles.value + 'px'
        })
        inputEl.value && inputEl.value.$el.focus()
        done()
      }
    })
  })
}

function leave (el, done) {
  $gsap.set(el, { position: 'absolute', transformOrigin: 'center' })
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

<style lang="postcss" scoped>
.el {
  height: calc(100vh - calc(theme('spacing.16') + theme('spacing.8')));
}
</style>
