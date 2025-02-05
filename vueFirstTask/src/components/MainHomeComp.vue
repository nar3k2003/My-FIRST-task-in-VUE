<template>
  <main :class="main">
    <h1 :class="h1class">My TO-DO list</h1>
    <div :class="toDo">
      <div class="blocks">
        <ToDoNewTask />
        <ToDoInprocess />
        <ToDoDone />
      </div>
    </div>
  </main>
  <RouterView />
</template>

<script setup>
import { RouterView } from 'vue-router'
import ToDoDone from './ToDoDone.vue'
import ToDoInprocess from './ToDoInProcess.vue'
import ToDoNewTask from './ToDoNewTask.vue'
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const LDMode = computed(() => store.getters.getLDMode);

const main = computed(() => (LDMode.value ? 'main' : 'main mainDarkBGC'));
const h1class = computed(() => (LDMode.value ? 'h1' : 'h1 mainDarkC '));
const toDo = computed(() => (LDMode.value ? 'toDo' : 'toDo mainDarkBGCN mainDarkB'));
</script>

<style scoped>
@font-face {
  font-family: 'Golos Text';
  src: url(../assets/fonts/GolosText-VariableFont_wght.ttf);
}

.mainDarkBGC{
  background-color: rgb(255, 111, 159) !important;
}

.mainDarkBGCN{
  background-color: rgb(255, 137, 176) !important;
}

.mainDarkBGCTD{
  background-color: rgb(255, 168, 197) !important;
}

.mainDarkC{
  color: rgb(255, 207, 223) !important;
}

.mainDarkB{
  border: 1px solid rgb(255, 147, 183) !important
}

.mainDarkBTD{
  border: 1px solid rgb(255, 207, 223) !important
}

main {
  font-family: 'Golos Text', sans-serif;
  width: 100%;
  height: 100vh;
  background-color: rgb(1, 144, 96);
  display: flex;
  flex-direction: column;
  align-items: center;
}

h1 {
  color: rgb(0, 48, 32) !important;
  margin: 0 auto;
  padding: 40px 70px;
}

.toDo {
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(0, 118, 79);
  border-radius: 15px;
  width: 80%;
  min-height: 70%;
  position: relative;
}

.addToDoBtn {
  font-family: 'Golos Text', sans-serif;
  position: absolute;
  top: 90%;
  left: 90%;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
}

.blocks {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  gap: 20px;
  /* height: 100%; */
}
</style>
