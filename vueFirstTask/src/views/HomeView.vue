<script setup>
import { RouterView } from 'vue-router'
import HeaderComp from '@/components/HeaderComp.vue'
import MainHomeComp from '@/components/MainHomeComp.vue'
</script>

<template>
  <header>
    <HeaderComp />
  </header>
  <main>
    <MainHomeComp />
  </main>

  <RouterView />
</template>
