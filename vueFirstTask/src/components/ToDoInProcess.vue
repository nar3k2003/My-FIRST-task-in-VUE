<template>
  <div class="inToDo">
    <div :class="block">
      <h2 :class="h2class">In Process</h2>
    </div>
    <div class="newTasks">
      <div class="newTask" v-for="inProcessTask in inProcessTasks" :key="inProcessTask.id">
        <h3 :class="h2class">{{ inProcessTask.newTask }}</h3>
        <div class="btns">
          <button :class="btn" @click="doneTask(inProcessTask)" type="button">DONE</button>
          <button :class="btn" @click="deleteTask(inProcessTask.id)" type="button">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const inProcessTasks = computed(() => store.state.todoList.inProcessTasks);
const LDMode = computed(() => store.getters.getLDMode);

const btn = computed(() => (LDMode.value ? 'button' : 'button mainDarkBGCTD mainDarkBTD'))
const block = computed(() => (LDMode.value ? 'block' : 'block mainDarkBGC mainDarkB'));
const h2class = computed(() => (LDMode.value ? 'h2' : 'h2 mainDarkC'));

function doneTask(inProcTask) {
  inProcTask.stage = 'done'
  console.log('addDoneTask', inProcTask);
  store.dispatch('addDoneTask', inProcTask)
}

function deleteTask(inProcessTaskId) {
  console.log('deleteINTask', inProcessTaskId);
  store.dispatch('deleteINTask', inProcessTaskId)
}

console.log(inProcessTasks);

</script>

<style scoped>
.block {
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  width: 100%;
  /* position: relative; */
  display: flex;
  justify-content: center;
}

h2{
  color: rgb(0, 48, 32);
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

.inToDo{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.newTasks{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;

}

.newTask{
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.btns{
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.button{
  font-family: 'Golos Text', sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 5px;
  padding: 5px 5px;
  color: white;
}
</style>
