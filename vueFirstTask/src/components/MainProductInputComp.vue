<template>
  <button :class="addNewProductClass" @click="openNewProdInput()" type="button">
    ADD NEW PRODUCT
  </button>
  <form :class="form" v-if="openClose" action="">
    <label for="img">Image path</label>
    <input v-model="image" name="img" type="text" placeholder="Enter your image path" />
    <label for="title">Title</label>
    <input v-model="title" type="text" name="title" placeholder="Enter your title" />
    <label for="price">Price</label>
    <input v-model="price" type="number" name="price" placeholder="Enter your price" />
    <label for="price">Category</label>
    <input
      v-model="category"
      type="text"
      name="category"
      placeholder="Enter your category"
    />
    <label for="description">Description</label>
    <input
      v-model="description"
      type="text"
      name="description"
      placeholder="Enter your description"
    />
    <div class="displayFlex">
      <button :class="btn" type="button" @click="closeNewProdInput()">Close</button>
      <button
        :class="btn"
        type="button"
        @click="updateProductFunc"
        v-if="store.getters.getEditProduct"
      >
        Edit
      </button>
      <button :class="btn" type="button" @click="addNewProduct" v-else>Add</button>
    </div>
  </form>
</template>

<script setup>
import { onMounted, ref, computed, watch } from "vue";
import { useStore } from "vuex";
const store = useStore();

const LDMode = computed(() => store.getters.getLDMode);

//Ligt Dark Mode
const addNewProductClass = computed(() =>
  LDMode.value ? "addNewProduct" : "addNewProduct mainDark"
);
const form = computed(() => (LDMode.value ? "form" : "form mainDark"));
const btn = computed(() => (LDMode.value ? "button" : "button mainDark"));

const openClose = ref(false);

const image = ref("");
const title = ref("");
const price = ref("");
const category = ref("");
const description = ref("");

watch(
  () => store.getters.getEditProduct,
  (product) => {
    if (product) {
      title.value = product.title;
      price.value = product.price;
      description.value = product.description;
      image.value = product.image;
      category.value = product.category;
      openClose.value = true;
    }
  }
);

const addNewProduct = async () => {
  const newProduct = {
    title: title.value,
    price: Number(price.value),
    description: description.value,
    image: image.value,
    category: category.value,
  };

  await store.dispatch("addProduct", newProduct);
  resetForm();
};

const updateProductFunc = async () => {
  const editedProduct = store.getters.getEditProduct;

  const updatedProduct = {
    id: editedProduct.id,
    title: title.value,
    price: Number(price.value),
    description: description.value,
    image: image.value,
    category: category.value,
  };

  await store.dispatch("updateProduct", updatedProduct);
  console.log("Product updated successfully");

  store.commit("CHANGE_EDIT_MODE", null);
  resetForm();
};

const resetForm = () => {
  title.value = "";
  price.value = "";
  description.value = "";
  image.value = "";
  category.value = "";
  openClose.value = false;
};

function openNewProdInput() {
  store.commit("CHANGE_EDIT_MODE", null);
  openClose.value = true;
}

function closeNewProdInput() {
  openClose.value = false;
  store.commit("CHANGE_EDIT_MODE", null);
  resetForm();
}

onMounted(() => {
  store.dispatch("getProducts");
});
</script>

<style scoped>
@font-face {
  font-family: "Golos Text";
  src: url(../assets/fonts/GolosText-VariableFont_wght.ttf);
}

main {
  font-family: "Golos Text", sans-serif;

  width: 100%;
  background-color: rgb(1, 144, 96);
  flex: 1 1 auto;
}

.products {
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

.product {
  width: 20%;
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  color: rgb(0, 48, 32);
  display: flex;
  flex-direction: column;
  padding: 20px;
}

.product img {
  width: 100%;
  height: 300px;
  border-radius: 12px;
  border: 1px solid rgb(0, 108, 72);
}

.product h2 {
  min-height: 100px;
}

.product button {
  font-family: "Golos Text", sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
  width: 100%;
  height: 40px;
}

.addNewProduct {
  font-family: "Golos Text", sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 4px;
  /* padding: 0 70px; */
  margin: 0 40px 40px 40px;
  color: white;
  /* width: 100%; */
  height: 40px;
}

.mainDark {
  background-color: rgb(255, 111, 159);
  color: rgb(255, 207, 223) !important;
  border: 1px solid rgb(255, 207, 223);
}

h1 {
  color: rgb(0, 48, 32) !important;
  margin: 0 auto;
  padding: 40px 70px;
  display: flex;
  justify-content: center;
  align-items: center;
}

form {
  width: 20%;
  border: 1px solid rgb(0, 108, 72);
  background-color: rgb(1 144 96);
  border-radius: 15px;
  color: rgb(0, 48, 32);
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  margin: 0 40px 40px 40px;
}

form button {
  font-family: "Golos Text", sans-serif;
  border: 1px solid rgb(0, 48, 32);
  background-color: rgb(0, 87, 58);
  border-radius: 4px;
  padding: 5px 10px;
  color: white;
  width: 100%;
  height: 40px;
}

form input {
  font-family: "Golos Text", sans-serif;
  border: 1px solid rgb(0, 48, 32);
  /* background-color: rgb(0, 87, 58); */
  border-radius: 4px;
  padding: 5px 10px;
  color: rgb(0, 87, 58);
  /* width: 100%; */
  height: 20px;
  text-decoration: none;
}

.displayFlex {
  display: flex;
  gap: 20px;
}
</style>
