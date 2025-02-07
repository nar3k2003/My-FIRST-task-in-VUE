<template>
  <div class="productsClass" :class="{mainDarkBGCN: LDMode, mainDarkB:LDMode}">
    <div class="productClass" :class="{mainDarkBGC: LDMode, mainDarkC: LDMode, mainDarkB: LDMode}"  v-for="product in products" :key="product.id">
      <div>
        <img class="productClassimg" :class="{mainDarkB: LDMode}" :src="product.image" />
      </div>
      <div style="flex-grow: 1;">
        <h2 :class="{mainDarkC: LDMode}">{{ product.title }}</h2>
        <h3 :class="{mainDarkC: LDMode}">${{ product.price }}</h3>
        <h4 :class="{mainDarkC: LDMode}">{{ product.category }}</h4>
        <p :class="{mainDarkC: LDMode}">{{ product.description }}</p>
      </div>
      <div class="displayFlex">
        <button class="productClassButton" :class="{mainDarkBGCN:LDMode, mainDarkB:LDMode}" @click="deleteProduct(product.id)">DELETE</button>
        <button class="productClassButton" :class="{mainDarkBGCN:LDMode, mainDarkB:LDMode}" @click="updateProduct(product)">EDIT</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
const store = useStore()

const LDMode = computed(() => store.getters.getLDMode);

function deleteProduct(productId) {
  store.dispatch('deleteProduct', productId)
}

function updateProduct(product) {
  store.commit('CHANGE_EDIT_MODE', product)
}

onMounted(() => {
  store.dispatch('getProducts')
})

const products = computed(() => {
  return store.state.product.products
});
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

.mainDarkC{
  color: rgb(255, 207, 223) !important;
}

.mainDarkB{
  border: 1px solid rgb(255, 147, 183) !important
}

.productsClass {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 30px;
  justify-content: space-around;
  padding: 40px 40px;
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(0 118 79);
  border-radius: 25px;
  margin: 0 40px;
}

.productClass {
  width: 20%;
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  color: rgb(0, 48, 32);
  display: flex;
  flex-direction: column;
  padding: 20px;
  justify-content: space-between;
}

.productClassimg {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  border: 1px solid rgb(0, 108, 72);
}

.productClassButton {
  font-family: 'Golos Text', sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
  width: 100%;
  height: 40px;
  cursor: pointer;
}

.displayFlex {
  display: flex;
  gap: 20px;
  margin-top: auto;
}
</style>
