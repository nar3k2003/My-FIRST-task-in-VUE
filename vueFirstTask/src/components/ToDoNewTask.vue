<template>
  <div class="newToDo">
    <div :class="block">
      <h2 :class="h2class">New Tasks</h2>
    </div>
    <div class="newToDoInput">
      <input type="text" v-model="newTask">
      <button :class="addToDoBtn" type="button" @click="addNewToDo">ADD</button>
    </div>
    <div class="newTasks">
      <div class="newTask" v-for="task in tasks" :key="task.id">
        <h3 :class="h2class">{{ task.newTask }}</h3>
        <div class="btns">
          <button :class="btn" @click="inProcessTask(task)" type="button">IN PROCESS</button>
          <button :class="btn" @click="deleteTask(task.id)" type="button">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed,  ref } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const LDMode = computed(() => store.getters.getLDMode);

const block = computed(() => (LDMode.value ? 'block' : 'block mainDarkBGC mainDarkB'));
const h2class = computed(() => (LDMode.value ? 'h2' : 'h2 mainDarkC'));
const addToDoBtn = computed(() => (LDMode.value ? 'addToDoBtn' : 'addToDoBtn mainDarkBGCTD mainDarkBTD'));
const btn = computed(() => (LDMode.value ? 'button' : 'button mainDarkBGCTD mainDarkBTD'))

const newTask = ref(null)
const id = ref(0)

function deleteTask(taskId) {
  console.log('deleteTask', taskId);
  store.dispatch('deleteTask', taskId)
}

function inProcessTask(task) {
  task.stage = 'inProcess'
  console.log('inProcessTask', task);
  store.dispatch('addinProcessTask', task)
}

const addNewToDo = async () => {
  console.log("addNewToDo");

  if (newTask.value !== '') {
    id.value++
    const newToDoTask = {
      id: id.value,
      newTask: newTask.value,
      stage: 'newTask'
    }
    console.log(newToDoTask);

    await store.dispatch('addNewTask', newToDoTask)
    resetForm()
  }

};

const resetForm = () => {
  newTask.value = ''
};

const tasks = computed(() => {
  return store.state.todoList.tasks
});
</script>

<style scoped>
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

.newToDo{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.block{
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2{
  color: rgb(0, 48, 32);
}

.addToDoBtn {
  font-family: 'Golos Text', sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 7px;
  padding: 5px 10px;
  color: white;
}

.newToDoInput{
  display: flex;
  justify-content: space-between;
  padding: 12px;
  height: 30px;
  gap: 12px;
}

.newToDoInput input{
  width: 79%;
  border-radius: 5px;
  padding: 12px;
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
