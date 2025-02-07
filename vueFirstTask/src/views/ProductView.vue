<script setup>
import { RouterView } from 'vue-router'
import HeaderComp from '@/components/HeaderComp.vue'
import MainProductComp from '@/components/product/MainProductComp.vue'
</script>

<template>
  <header>
    <HeaderComp />
  </header>
  <main>
    <MainProductComp />
  </main>
  <RouterView />
</template>
