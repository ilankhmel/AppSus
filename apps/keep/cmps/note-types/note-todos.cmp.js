export default {
  name: 'note-todos',
  props: ['info', 'edit'],
  template: `
        <div>
            <ul v-if="!edit" class="clean-list todo-container note-desc">
              <li class="todo-task" v-for="(todo,idx) in info.todos" @click.prevent="addLinethrough(todo)"  :class="{done:todo.doneAt}">
                <p>{{todo.txt}}
                 </p>
                <input type="checkbox" @click.stop="addLinethrough(todo)" v-model="todo.doneAt">
              </li>
              <i class="fas fa-list note-type"></i> 
            </ul>
            <div v-else class="todo-edit flex column align-center">
              <input v-for="(todo,idx) in todos" type="text" v-model="todos[idx]">
              <button @click="addTodo">Add Todo</button>
              <button @click="confirmEdit" @keyup.enter="confirmEdit">confirm</button>
            </div>
        </div>
   `,

  data() {
    return {
      todos: '',
    };
  },
  computed: {
    formatTodosIntoTxts() {
      return this.info.todos.map((todo) => todo.txt);
    },
  },
  methods: {
    addLinethrough(todo) {
      todo.doneAt > 0 ? (todo.doneAt = null) : (todo.doneAt = true);
    },
    confirmEdit() {
      this.$emit('doneEditTodo', false, this.todos);
    },
    addTodo() {
      this.todos.push('');
    },
  },
  created() {
    this.todos = this.formatTodosIntoTxts;
  },
};
