<template>
  <div class="inToDo">
    <div class="block" :class="{ mainDarkBGC: LDMode, mainDarkB: LDMode }">
      <h2 :class="{ mainDarkC: LDMode }">In Process</h2>
    </div>
    <div class="newTasks">
      <div class="newTask" v-for="inProcessTask in inProcessTasks" :key="inProcessTask.id">
        <h3 :class="{ mainDarkC: LDMode }">{{ inProcessTask.newTask }}</h3>
        <div class="btns">
          <button
            class="button"
            :class="{ mainDarkBGCTD: LDMode, mainDarkBTD: LDMode }"
            @click="move(inProcessTask, $event)"
            type="button"
          >
            MOVE
          </button>
          <button
            class="button"
            :class="{ mainDarkBGCTD: LDMode, mainDarkBTD: LDMode }"
            @click="deleteTask(inProcessTask)"
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
        :newTaskProps="InProcessProps"
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

const inProcessTasks = computed(() => store.state.todoList.inProcessTasks)
const LDMode = computed(() => store.getters.getLDMode)

const ModalClick = ref(false)
const InProcessProps = ref({})
const mousePosition = ref({ x: 0, y: 0 })

function move(task, event) {
  mousePosition.value = {
    x: event.clientX,
    y: event.clientY,
  }

  if (InProcessProps.value.task && InProcessProps.value.task.id == task.id) {
    ModalClick.value = !ModalClick.value
  } else {
    ModalClick.value = true
  }

  InProcessProps.value = {
    task: task,
    buttonsName: {
      NewTask: 'tasks',
      Done: 'doneTasks',
    },
  }
}

function deleteTask(task) {
  ModalClick.value = false
  store.commit('deleteTask', task)
}
</script>

<style scoped>
.block {
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
}

h2,
h3 {
  color: rgb(0, 48, 32);
}

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

.inToDo {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
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
