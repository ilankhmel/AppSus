import { noteService } from '../services/note.service.js';
import noteText from './note-types/note-text.cmp.js';
import noteTodos from './note-types/note-todos.cmp.js';
import noteImg from './note-types/note-img.cmp.js';
import noteVideo from './note-types/note-video.cmp.js';

export default {
  name: 'note-preview',
  props: ['note'],
  template: `
        <section class="note-preview-container" @mouseover="showControlers" @mouseout="hideControlers" :style="note.style" >
            <component :is="note.type" :info="note.info" :edit="editMode" @doneEditTodo="onDoneEditTodo" @doneEditText="onDoneEditText" @doneEditSrc="onDoneEditSrc" :key="note.key"></component>
            <div v-if="colorMenu" class="colors-container" title="Background options">
            <span :style="{backgroundColor:'#f28B82'}" title="Red" @click.stop="setBcg('#f28B82')"></span>
            <span :style="{backgroundColor:'#FBBC04'}" title="Orange" @click.stop="setBcg('#FBBC04')"></span>
            <span :style="{backgroundColor:'#fff475'}" title="Yellow" @click.stop="setBcg('#fff475')"></span>
            <span :style="{backgroundColor:'#CCFF90'}" title="Green" @click.stop="setBcg('#CCFF90')"></span>
            <span :style="{backgroundColor:'#A7FFEB'}" title="Teal" @click.stop="setBcg('#A7FFEB')"></span>
            <span :style="{backgroundColor:'#CBF0F8'}" title="Blue" @click.stop="setBcg('#CBF0F8')"></span>
            <span :style="{backgroundColor:'#AECBFA'}" title="Dark Blue" @click.stop="setBcg('#AECBFA')"></span>
            <span :style="{backgroundColor:'#D7AEFB'}" title="Purple" @click.stop="setBcg('#D7AEFB')"></span>
            <span :style="{backgroundColor:'#FDCFE8'}" title="Pink" @click.stop="setBcg('#FDCFE8')"></span>
            <span :style="{backgroundColor:'#E6C9A8'}" title="Brown" @click.stop="setBcg('#E6C9A8')"></span>
            <span :style="{backgroundColor:'#E8EAED'}" title="White" @click.stop="setBcg('#E8EAED')"></span>
            </div>
            <div v-show="controlers" class="note-controlers">
                <button title="Pin note" @click.stop="togglePin">
                    <i class="fas fa-thumbtack"></i>
                </button>
                <button title="Background options" @click.stop="toggleColorMenu">
                    <i class="fas fa-palette"></i>
                </button>
                <button title="Edit Note" @click.stop="toggleEdit"> 
                      <i class="fas fa-edit"></i>
                  </button> 
                <button title="Make a copy" @click.stop="makeNoteCopy">
                    <i class="fas fa-clone"></i>
                </button>
                <button title="Delete note" @click.stop="deleteNote(note.id)">
                  <i class="fas fa-trash"></i>
                </button>
            </div>
        </section>
    `,
  data() {
    return {
      controlers: false,
      colorMenu: false,
      editMode: false,
      noteBcg: { backgroundColor: '#E8EAED' },
    };
  },
  methods: {
    showControlers() {
      this.controlers = true;
    },
    hideControlers() {
      this.controlers = false;
    },
    toggleColorMenu() {
      this.colorMenu = !this.colorMenu;
      console.log(this.colorMenu);
    },
    setBcg(color) {
      console.log(color);
      console.log(this.note.style);
      this.note.style.backgroundColor = color;
      console.log(color);
      this.colorMenu = false;
      noteService
        .updateNoteElement(this.note.id, 'backgroundColor', color)
        .then((notes) => {
          this.notes = notes;
        });
    },
    deleteNote(noteId) {
      noteService.deleteNote(noteId).then((notes) => {
        this.notes = notes;
      });
    },
    toggleEdit() {
      this.toggleEdit = !this.toggleEdit;
    },
    togglePin() {
      this.note.isPinned = !this.note.isPinned;
      noteService
        .updateNoteElement(this.note.id, 'isPinned', this.note.isPinned)
        .then((notes) => {
          this.notes = notes;
        });
    },
    makeNoteCopy() {
      noteService.copyNote(this.note).then((notes) => {
        this.notes = notes;
      });
    },
    onDoneEditSrc(done, newUrl) {
      this.editMode = done;
      this.note.info.url = newUrl;
      noteService
        .updateNoteElement(this.note.id, `[info][url]`, newUrl)
        .then((notes) => {
          this.notes = notes;
        });
    },
    onDoneEditText(done, txt) {
      this.editMode = done;
      this.note.info.txt = txt;
      noteService
        .updateNoteElement(this.note.id, '[info][txt]', txt)
        .then((notes) => {
          this.notes = notes;
        });
    },
    onDoneEditTodo(done, todosTxt) {
      this.editMode = done;
      const todoArr = JSON.parse(JSON.stringify(todosTxt));
      noteService.updateTodoNote(this.note.id, todoArr);
    },
  },
  computed: {
    currNotes() {
      return this.notes;
    },
  },
  watch: {
    currNotes() {
      this.notes = notes;
    },
  },

  components: {
    noteTodos,
    noteText,
    noteImg,
    noteVideo,
  },
};
