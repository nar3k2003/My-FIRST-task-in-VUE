<template>
  <header :class="headerClass" >
    <div class="headerContainer">
      <div class="headerLogo">
        <RouterLink to="/">
          <img src="../assets/img/logo.svg" alt="VueLogo" />
        </RouterLink>
      </div>
      <div class="headerMain">
        <ul class="headerNav">
          <li>
            <RouterLink to="/">HOME</RouterLink>
          </li>
          <li>
            <RouterLink to="/about">ABOUT US</RouterLink>
          </li>
          <li>
            <RouterLink to="/product">PRODUCTS</RouterLink>
          </li>
        </ul>
      </div>
      <div class="headerLightDarkMode">
        <button type="button" class="btnMode" @click="changeLDmode()">
          <img v-if="LDMode" src="../assets/img/switch-off.png" alt="ligkt" />
          <img v-else src="../assets/img/switch-on.png" alt="dark" />
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const LDMode = computed(() => store.getters.getLDMode)

const headerClass = computed(() => (LDMode.value ? 'header' : 'header headerDark'))

function changeLDmode() {
  console.log("LDMode", LDMode);
  store.commit('TOGGLE_THEME')
}
</script>

<style scoped>
@font-face {
  font-family: 'Golos Text';
  src: url(../assets/fonts/GolosText-VariableFont_wght.ttf);
}


body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow-y: auto;
}

.router-link-active {
  color: rgb(0, 48, 32) !important;
}

.headerLogo img {
  width: 40px;
  height: 40px;
}

ul {
  padding: 0;
}

.header {
  font-family: 'Golos Text', sans-serif;

  background-color: rgb(0 118 79);
  padding: 44px 70px;
  position: block;
  top: 0;
  left: 0;
  right: 0;
}

.headerDark{
  background-color: rgb(255 137 176);
}

.headerContainer {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  z-index: 1;
}

.headerMenuNav li {
  list-style: none;
  font-size: 200%;
}

.headerNav {
  display: flex;
  gap: 30px;
  color: white;
  list-style: none;
}

.headerNav li a {
  color: white;
  text-decoration: none;
  font-size: 19px;
}

.btnMode {
  background-color: transparent;
  background: none;
  border: none;
  outline: none;
  box-shadow: none;
}

.btnMode img {
  width: 40px;
  height: 40px;
}
</style>

