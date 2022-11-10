import { noteService } from '../services/note.service.js';
import noteTodos from './note-types/note-todos.cmp.js';

export default {
  template: `
    <div class="todos-input-container flex column">
        <input placeholder="Add Todo..."
        @keyup.enter="nextTodo" :key="idx" v-for="(input,idx) in inputAmount" ref="todo" type="text" v-model="todos[idx]"/>
        <button class="save-todo-btn" @click="addNote(todos)">Save</button>
    </div>
    
    `,
  data() {
    return {
      inputAmount: 1,
      todos: [],
    };
  },
  methods: {
    addNote(todos) {
      noteService.addTodoNote(todos);
      this.todos = [];
      this.inputAmount = 1;
    },
    nextTodo() {
      this.inputAmount++;
      setTimeout(() => {
        this.$refs.todo[this.todos.length].focus();
      }, 1);
    },
  },

  components: {
    noteTodos,
  },
};
