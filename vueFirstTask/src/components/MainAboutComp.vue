<template>
  <main :class="mainClass">
    <h1 :class="h1Class">My FIRST task in VUE</h1>
  </main>
</template>

<script setup>

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
  width: 100%;
  height: 100vh;
  background-color: rgb(1, 144, 96);
  flex: 1 1 auto;
  font-family: 'Golos Text', sans-serif;
}

.mainDark{
  background-color: rgb(255, 111, 159);
  color: rgb(255, 207, 223) !important;
}

h1 {
  color: rgb(0, 48, 32) !important;
  margin: 0 auto;
  padding: 40px 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
