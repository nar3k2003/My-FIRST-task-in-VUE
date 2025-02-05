<script setup>
import { RouterView } from 'vue-router'
import HeaderComp from '@/components/HeaderComp.vue'
import MainAboutComp from '@/components/MainAboutComp.vue'
</script>

<template>
  <header>
    <HeaderComp />
  </header>
  <main>
    <MainAboutComp />
  </main>
  <RouterView />
</template>
