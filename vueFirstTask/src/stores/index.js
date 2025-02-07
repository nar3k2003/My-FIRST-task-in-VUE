import { createStore } from 'vuex'

const theme = {
  state: {
    LDMode: localStorage.getItem('LDMode') === 'true',
  },
  mutations: {
    toggleTheme(state) {
      state.LDMode = !state.LDMode
      localStorage.setItem('LDMode', state.LDMode)
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
    addNewTask: (state, newTask) => {
      state.tasks.push(newTask)
    },
    deleteTask: (state, task) => {
      state[task.stage] = state[task.stage].filter((task1) => task1.id !== task.id)
    },
    addinProcessTask: (state, IPtask) => {
      state.inProcessTasks.push(IPtask)
      state.tasks = state.tasks.filter((task) => task.stage !== 'inProcessTasks')
    },
    addDoneTask:( state, Dtask) => {
      state.doneTasks.push(Dtask)
      state.inProcessTasks = state.inProcessTasks.filter((inProcessTask) => inProcessTask.stage !== 'doneTasks')
    },
    moveTask: (state, { from, to, task }) => {
      task.stage = to;
      state[to].push(task);
      state[from] = state[from].filter((t) => t.stage !== to);
    }
  }
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
