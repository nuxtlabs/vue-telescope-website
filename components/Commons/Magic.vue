<template>
  <div class="relative pt-20" :class="'bg-' + color">
    <section class="magic">
      <header class="fixed top-0 left-0 w-full p-4 z-10" :class="'bg-' + color">
        <Container class="flex justify-between">
          <nuxt-link to="/">
            <Logo class="h-16 -ml-3" :light="colors.light" :dark="colors.dark"/>
          </nuxt-link>
          <div class="flex items-center">
            <ColorButton :color="colors.button">
              <Extensions google/>
              Google Chrome
            </ColorButton>
            <ColorButton :color="colors.button">
              <Extensions/>
              Mozilla Firefox
            </ColorButton>
          </div>
        </Container>
      </header>
    </section>
    <Container class="mt-4 py-12">
      <slot/>
    </Container>
  </div>
</template>

<script>
import ColorButton from '@/components/Commons/Button'
import Container from '@/components/Commons/Container'
import Logo from '@/components/Commons/Logo'
import Extensions from '@/components/Commons/Extensions'

export default {
  components: {
    ColorButton,
    Container,
    Logo,
    Extensions
  },
  props: {
    color: {
      type: String,
      required: true
    }
  },
  computed: {
    colors () {
      const colors = {
        white: {
          light: '#0BDCA0',
          dark: '#000',
          button: 'emerald'
        },
        emerald: {
          light: '#fff',
          dark: '#000',
          button: 'black'
        },
        black: {
          light: '#fff',
          dark: '#0BDCA0',
          button: 'white'
        }
      }
      return colors[this.color]
    }
  }
}
</script>

<style>
.magic {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  clip: rect(auto, auto, auto, auto);
}
</style>
