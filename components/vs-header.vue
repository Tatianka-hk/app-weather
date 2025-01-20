<template>
  <header
    :class="['fixed top-0 left-0 right-0 h-[80px] backdrop-blur-md border-b border-gray-200 z-50' , isDay ? 'bg-white/80 text-black' : 'bg-gray-800 text-gray-100']"
  >
    <nav class="mx-2 px-4 h-full w-full">
      <div class="flex items-center justify-between h-full">
        <div class="flex items-center space-x-2">
          <Logo />
        </div>
        <div class="flex items-center space-x-6">
          <VsLanguageSwitcher />
          <VsThemeSwitcher />
        </div>
      </div>
    </nav>
  </header>
</template>
<script setup>
  import { Logo } from "../assets/icons"
  import { VsThemeSwitcher, VsLanguageSwitcher } from "../ui"
  import {inject} from 'vue';

  const {isDay} = inject('theme')
</script>
