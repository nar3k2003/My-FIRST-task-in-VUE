<template>
  <div
    ref="target"
    class="modal"
    :class="{ mainDarkBGC: LDMode, mainDarkB: LDMode }"
    :style="{ top: `${y - 200}px`, left: `${x - 120}px`, position: 'absolute' }"
  >
    <button
      :class="{ mainDarkBGCTD: LDMode, mainDarkBTD: LDMode }"
      v-for="(btn, key) in newTaskProps.buttonsName"
      :key="btn"
      @click="move(newTaskProps.task.stage, btn, newTaskProps.task)"
    >
      {{ key }}
    </button>
  </div>
</template>


<script setup>
import { defineProps, computed, defineEmits } from 'vue'
import { useStore } from 'vuex'

const store = useStore()
const LDMode = computed(() => store.getters.getLDMode)

const props = defineProps({
  x: Number,
  y: Number,
  newTaskProps: Object,
  ModalClick: Boolean,
})

const emit = defineEmits(['update:ModalClick'])

function move(from, to, task) {
  store.commit('moveTask', { from, to, task })
  emit('update:ModalClick', false)
}

console.log(props);

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

button {
  font-family: 'Golos Text', sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 5px;
  padding: 5px 5px;
  color: white;
  cursor: pointer;
  width: 100%;
}

.modal {
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px;
  gap: 10px;
}
</style>
