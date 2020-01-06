import axios from "axios";
const store = Vuex.Store({
  state: {
    loadingStatus: "loading",
    todos: []
  },
  mutations: {
    SET_LOADING_STATUS(state, status) {
      state.loadingStatus = status;
    },
    SET_TODOS(state, todos) {
      state.todos = todos;
    }
  },
  actions: {
    fetchTodos(context) {
      context.commit("SET_LOADING_STATUS", "loading");
      axios.get("/api/todos").then(response => {
        context.commit("SET_LOADING_STATUS", "notLoading");
        context.commit("SET_TODOS", response.data.todos);
      });
    }
  },
  getters: {
    doneTodos(state) {
      return state.todos.filter(todo => todo.done);
    }
  }
});
