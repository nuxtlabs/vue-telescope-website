<template>
  <div class="flex justify-between bg-grey-50 p-4 text-sm rounded">
    <div class="flex items-center">
      <span class="mr-1">You are connected as</span>
      <a
        :href="`https://github.com/${$strapi.user.username}`"
        target="_blank"
        rel="noopener"
        class="flex items-center hover:underline"
      >
        <img
          :src="`https://github.com/${$strapi.user.username}.png?size=24`"
          class="w-6 h-6 rounded-full mr-1"
        />
        {{ $strapi.user.username }}</a
      >
    </div>
    <LogOutButton />
  </div>
</template>
