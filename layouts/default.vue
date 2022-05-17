<template>
  <div class="h-screen flex flex-col">
    <AppHeader />
    <main class="pt-16 flex-1">
      <slot />
    </main>
    <AppFooter />
  </div>
</template>
