<template>
  <main :class="mainClass">
    <h1 :class="h1Class"> My PRODUCT list</h1>
    <MainProductInputComp />
    <MainProductListComp />
  </main>
</template>

<script setup>
import MainProductListComp from './MainProductListComp.vue'
import MainProductInputComp from './MainProductInputComp.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()
const LDMode = computed(() => store.getters.getLDMode);

const mainClass = computed(() => (LDMode.value ? 'main' : 'main mainDark'));
const h1Class = computed(() => (LDMode.value ? 'h1' : 'h1 mainDark'));
</script>

<style scoped>
@font-face {
  font-family: 'Golos Text';
  src: url(../assets/fonts/GolosText-VariableFont_wght.ttf);
}

main {
  font-family: 'Golos Text', sans-serif;

  width: 100%;
  background-color: rgb(1, 144, 96);
  flex: 1 1 auto;
}

h1 {
  color: rgb(0, 48, 32) !important;
  margin: 0 auto;
  padding: 40px 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.mainDark{
  background-color: rgb(255, 111, 159);
  color: rgb(255, 207, 223) !important;
}
</style>
