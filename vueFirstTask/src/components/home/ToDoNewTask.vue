<template>
  <div class="newToDo">
    <div class="block" :class="{ mainDarkBGC: LDMode, mainDarkB: LDMode }">
      <h2 :class="{ mainDarkC: LDMode }">New Tasks</h2>
    </div>
    <div class="newToDoInput">
      <input type="text" v-model="newTask" />
      <button
        class="addToDoBtn"
        :class="{ addToDoBtn: LDMode, mainDarkBGCTD: LDMode, mainDarkBTD: LDMode }"
        type="button"
        @click="addNewToDo"
      >
        ADD
      </button>
    </div>
    <div class="newTasks">
      <div class="newTask" v-for="task in tasks" :key="task.id">
        <h3 :class="{ mainDarkC: LDMode }">{{ task.newTask }}</h3>
        <div class="btns">
          <button
            class="button"
            :class="{ mainDarkBGCTD: LDMode, mainDarkBTD: LDMode }"
            @click="move(task, $event)"
            type="button"
          >
            MOVE
          </button>
          <button
            class="button"
            :class="{ mainDarkBGCTD: LDMode, mainDarkBTD: LDMode }"
            @click="deleteTask(task)"
            type="button"
          >
            DELETE
          </button>
        </div>
      </div>
      <ToDoMoveButton
      v-if="ModalClick"
      :x="mousePosition.x"
      :y="mousePosition.y"
      :newTaskProps="newTaskProps"
      v-model:ModalClick="ModalClick"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
import ToDoMoveButton from './ToDoMoveButton.vue'

const store = useStore()

const LDMode = computed(() => store.getters.getLDMode)
const tasks = computed(() => store.state.todoList.tasks)

const newTask = ref('')
const id = ref(0)

const ModalClick = ref(false)
const newTaskProps = ref({})
const mousePosition = ref({ x: 0, y: 0 })

function move(task, event) {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY,
  }

  if (newTaskProps.value.task && newTaskProps.value.task.id == task.id) {
    ModalClick.value = !ModalClick.value
  }else {
    ModalClick.value = true
  }

  newTaskProps.value = {
    task: task,
    buttonsName:
    {
      InProcess: 'inProcessTasks',
      Done:'doneTasks'
    }
  }
}

function deleteTask(task) {
  ModalClick.value = false
  store.commit('deleteTask', task)
}

function addNewToDo() {
  if (newTask.value !== '') {
    id.value++
    const newToDoTask = {
      id: id.value,
      newTask: newTask.value,
      stage: 'tasks',
    }
    store.commit('addNewTask', newToDoTask)
    resetForm()
  }
}

const resetForm = () => {
  newTask.value = ''
};
</script>



<style scoped>
.mainDarkBGC {
  background-color: rgb(255, 111, 159) !important;
}

.mainDarkBGCN {
  background-color: rgb(255, 137, 176) !important;
}

.mainDarkBGCTD {
  background-color: rgb(255, 168, 197) !important;
}

.mainDarkC {
  color: rgb(255, 207, 223) !important;
}

.mainDarkB {
  border: 1px solid rgb(255, 147, 183) !important;
}

.mainDarkBTD {
  border: 1px solid rgb(255, 207, 223) !important;
}

.newToDo {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.block {
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h2,
h3 {
  color: rgb(0, 48, 32);
}

.addToDoBtn {
  font-family: 'Golos Text', sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 7px;
  padding: 5px 10px;
  color: white;
  cursor: pointer;
}

.newToDoInput {
  display: flex;
  justify-content: space-between;
  padding: 12px;
  height: 30px;
  gap: 12px;
}

.newToDoInput input {
  width: 79%;
  border-radius: 5px;
  padding: 12px;
}

.newTasks {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 12px;
  padding: 12px;
}

.newTask {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}

.btns {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.button {
  font-family: 'Golos Text', sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 5px;
  padding: 5px 5px;
  color: white;
  cursor: pointer;
}
</style>
