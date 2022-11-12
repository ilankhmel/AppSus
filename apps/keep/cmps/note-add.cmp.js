import { noteService } from '../services/note.service.js';

import noteImg from './note-types/note-img.cmp.js';
import noteText from './note-types/note-text.cmp.js';
import noteTodos from './note-types/note-todos.cmp.js';
import noteVideo from './note-types/note-video.cmp.js';
import todosEdit from './todos-edit.cmp.js';

export default {
  name: 'note-add',
  template: `
        <section class="flex" v-if="newNote">
            <div class="input-container flex wrap">
                <input  
                v-show="(note-type!=='note-todos')" :placeholder="PLACE_HOLDERS[note-type] || 'Take a note...' " @keyup.enter.prevent="addNote(newNote)"  v-model="txt"/>
                <todosEdit v-if="(note-type==='note-todos')"></todosEdit>
                <div class="btn-setters">
                    <button title="Text" @click="setType('note-text')">
                        <i class="fas fa-font"></i>
                    </button>
                    <button title="insert img address" @click="setType('note-img')"> 
                        <i class="far fa-image"></i>
                    </button>
                    <button title="insert video address" @click="setType('note-video')">
                    <i class="fab fa-youtube"></i>
                    </button>
                    <button title="List" @click="noteType='note-todos'">
                        <i class="fas fa-list"></i>
                    </button>
                </div>
            </div>
            
        </section>
    `,

  data() {
    return {
      txt:"",
      noteType: 'note-text',
      newNote: null,
      //   anotherLine: false,
      PLACE_HOLDERS: {
        noteImg: 'Insert an image url...',
        noteTodos: 'Insert a todo list...',
        noteVideo: 'Insert a Youtube Link...',
      },
    };
  },
  methods: {
    setType(type) {
      this.noteType = type;
      noteService.getEmptyNoteByType(type).then((note) => {
        this.newNote = note;
        this.newNote.info.url = this.txt
        this.addNote(this.note)
      });
    },
    addNote(newNote) {
      noteService.addNewNote(newNote).then((newNote) => {
        this.newNote = noteService.getEmptyNoteByType(this.noteType);
        console.log(this.newNote);
        this.$emit('onNewNotes');
        return newNote;
      });
    },
  },

  components: {
    noteImg,
    noteText,
    noteTodos,
    noteVideo,
    todosEdit,
  },

  created() {
    // this.newNote = noteService.getEmptyNoteByType('noteText');
    noteService.getEmptyNoteByType('note-text').then((note) => {
      this.newNote = note;
    });
    // console.log(this.newNote.info);
  },
};
