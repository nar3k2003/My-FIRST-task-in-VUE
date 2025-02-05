import { createStore } from 'vuex'

const theme = {
  state: {
    LDMode: true,
  },
  mutations: {
    TOGGLE_THEME(state) {
      state.LDMode = !state.LDMode
    },
  },
  getters: {
    getLDMode: (state) => state.LDMode,
  },
}

const todoList = {
  state: {
    tasks: [],
    inProcessTasks: [],
    doneTasks: [],
  },
  mutations: {
    ADD_NEW_TASK: (state, newTask) => {
      state.tasks.push(newTask)
    },
    DEL_TASK: (state, taskId) => {
      state.tasks = state.tasks.filter((task) => task.id !== taskId)
    },
    ADD_IN_PROCESS_TASK: (state, IPtask) => {
      state.inProcessTasks.push(IPtask)
      state.tasks = state.tasks.filter((task) => task.stage !== 'inProcess')
    },
    DEL_IN_TASK: (state, IntaskId) => {
      state.inProcessTasks = state.inProcessTasks.filter((inProcessTask) => inProcessTask.id !== IntaskId)
    },
    DONE_TASK:( state, Dtask) => {
      state.doneTasks.push(Dtask)
      state.inProcessTasks = state.inProcessTasks.filter((inProcessTask) => inProcessTask.stage !== 'done')
    },
    DEL_DONE_TASK: (state, DtaskId) => {
      state.doneTasks = state.doneTasks.filter((doneTask) => doneTask.id !== DtaskId)
    },
  },
  actions: {
    addNewTask: ({ commit }, newTask) => {
      commit('ADD_NEW_TASK', newTask)
    },
    deleteTask: ({ commit }, taskId) => {
      commit('DEL_TASK', taskId)
    },
    deleteINTask: ({ commit }, IntaskId) => {
      commit('DEL_IN_TASK', IntaskId)
    },
    addinProcessTask: ({ commit }, IPtask) => {
      commit('ADD_IN_PROCESS_TASK', IPtask)
    },
    addDoneTask: ({ commit }, Dtask ) => {
      commit('DONE_TASK', Dtask)
    },
    deleteDTask: ({ commit }, DtaskId) => {
      commit('DEL_DONE_TASK', DtaskId)
    },
  },
}

const product = {
  state: {
    products: [],
    EditProduct: null,
    EditMode: false,
    openClose: false,
  },
  mutations: {
    SET_PRODUCTS: (state, products) => {
      state.products = products
    },
    ADD_PRODUCT: (state, product) => {
      state.products.unshift(product)
    },
    DEL_PRODUCT: (state, productId) => {
      state.products = state.products.filter((product) => product.id !== productId)
    },
    UPD_PRODUCT: (state, updatedProduct) => {
      state.products = state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product,
      )
    },
    CHANGE_EDIT_MODE: (state, product) => {
      state.EditProduct = product
      state.openClose = !!product
    },
  },

  getters: {
    getEditProduct: (state) => {
      return state.EditProduct
    },
    getEditMode: (state) => {
      return { editMode: state.EditMode, openClose: state.openClose }
    },
  },

  actions: {
    getProducts: ({ commit }) => {
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((data) => {
          commit('SET_PRODUCTS', data)
        })
        .catch((error) => console.error('Error fetching products:', error))
    },

    addProduct: ({ commit }, addNewProduct) => {
      fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(addNewProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          commit('ADD_PRODUCT', data)
        })
        .catch((error) => console.error('Error adding product:', error))
    },

    deleteProduct: ({ commit }, productId) => {
      fetch(`https://fakestoreapi.com/products/${productId}`, {
        method: 'DELETE',
      })
        .then((response) => response.json())
        .then(() => {
          commit('DEL_PRODUCT', productId)
        })
        .catch((error) => console.error('Error deleting product:', error))
    },

    updateProduct: ({ commit }, updateProduct) => {
      fetch(`https://fakestoreapi.com/products/${updateProduct.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateProduct),
      })
        .then((response) => response.json())
        .then((data) => {
          commit('UPD_PRODUCT', data)
        })
        .catch((error) => console.error('Error updating product:', error))
    },
  },
}

export default createStore({
  modules: {
    todoList,
    product,
    theme,
  },
})
