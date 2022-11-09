import { noteService } from '../services/note.service';

export default {
  name: 'note-preview',
  props: ['note'],
  template: `
        <section class="note-preview-container" @mouseover="showControlers" @mouseour="hideControlers">
            <component :is="note.type" :info="note.info" :edit="editMode" :key="note.key"></component>
            <div v-if="colorMenu" class="colors-container" title="Background options">
            <span :style="{backgroundColor:'#f28B82'}" title="Red" @click.stop="setBgc('#f28B82')"></span>
            <span :style="{backgroundColor:'#FBBC04'}" title="Orange" @click.stop="setBgc('#FBBC04')"></span>
            <span :style="{backgroundColor:'#fff475'}" title="Yellow" @click.stop="setBgc('#fff475')"></span>
            <span :style="{backgroundColor:'#CCFF90'}" title="Green" @click.stop="setBgc('#CCFF90')"></span>
            <span :style="{backgroundColor:'#A7FFEB'}" title="Teal" @click.stop="setBgc('#A7FFEB')"></span>
            <span :style="{backgroundColor:'#CBF0F8'}" title="Blue" @click.stop="setBgc('#CBF0F8')"></span>
            <span :style="{backgroundColor:'#AECBFA'}" title="Dark Blue" @click.stop="setBgc('#AECBFA')"></span>
            <span :style="{backgroundColor:'#D7AEFB'}" title="Purple" @click.stop="setBgc('#D7AEFB')"></span>
            <span :style="{backgroundColor:'#FDCFE8'}" title="Pink" @click.stop="setBgc('#FDCFE8')"></span>
            <span :style="{backgroundColor:'#E6C9A8'}" title="Brown" @click.stop="setBgc('#E6C9A8')"></span>
            <span :style="{backgroundColor:'#E8EAED'}" title="Dfault" @click.stop="setBgc('#E8EAED')"></span>
            </div>
            <div v-show="controlers" class="note-controlers">
                <button title="Pin note" @click.stop="TogglePin">
                    <i></i>
                </button>
                <button title="Background options" @click.stop="toggleColorMenu">
                    <i></i>
                </button>
                <button title="Make a copy" @click.stop="makeNoteCopy">
                    <i></i>
                </button>
                <button title="Delete note" @click.stop="deleteNote(note.id)"></button>
                    <i></i>
            </div>
        </section>
    `,
  data() {
    return {
      controlers: false,
      ColorMenu: false,
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
      this.ColorMenu = !this.ColorMenu;
    },
    setBcg(color) {
      this.noteBcg.BackgroundColor = color;
      this.colorMenu = false;
      noteService.updateNoteElement(this.note.id, 'BackgRoundColor', color);
    },
    deleteNote(noteId) {
      noteService.deleteNote(noteId);
    },
    togglePin() {
      this.note.isPinned = !this.note.isPinned;
      noteService.updateNoteElement(
        this.note.id,
        'isPinned',
        this.note.isPinned
      );
    },
    makeNoteCopy() {
      noteService.copyNote(this.note);
    },
    computed: {},
  },
};
