import { noteService } from '../services/note.service.js';

import noteList from '../cmps/note-list.cmp.js';
import noteFilter from '../cmps/note-filter.cmp.js';
import noteAdd from '../cmps/note-add.cmp.js';

export default {
  name: 'keep-app',
  template: `
    <section v-if="notes" class="keep-app">
      <div class="filter-container flex">
        <note-filter @search="setSearchBy" @setFilterBy="setFilter"/>
      </div>
      <div class="add-note-container">
        <note-add class="add-note" @onNewNotes="updateNotes"/>
      </div>
      <div class="notes-preview-container">
    
        <div class="pinned-group-header">
          <h4>PINNED</h4>
          <div class="columns pinned" >
            <note-list v-if="pinnedNotesToShow" :notes="pinnedNotesToShow"  @onNewNotes="updateNotes"/>  
          </div>
        </div>
        <div class="pinned-group-header">
          <h4>OTHER</h4>
          <div class="columns pinned" >
            <note-list v-if="unpinnedNotesToShow" :notes="unpinnedNotesToShow" @onNewNotes="updateNotes" />  
            </div>
        </div>
          
      </div>
    </section>
  `,
  data() {
    return {
      notes: null,
      filterBy: null,
      searchBy: '',
      editMode: false,
    };
  },
  created() {
    noteService.query().then((notes) => {
      this.notes = notes;
    });
  },
  methods: {
    loadNotes() {
      noteService.query().then((notes) => {
        this.notes = notes;
        console.log('we got notes');
      });
    },
    setFilter(filterBy) {
      this.filterBy = filterBy;
    },
    setSearchBy(searchBy) {
      console.log('searchBy:', searchBy);
      this.searchBy = searchBy;
    },
    onEdit(yes) {
      this.editMode = yes;
    },
    updateNotes() {
      console.log('hi, saba');
      this.loadNotes();
    },
  },
  computed: {
    pinnedNotesToShow() {
      if (!this.filterBy || !this.searchBy)
        return this.notes.filter((note) => note.isPinned);
      if (this.searchBy)
        return this.notes.filter((note) => {
          if (note.type === 'note-text')
            return note.info.txt
              .toLowerCase()
              .contains(this.searchBy.toLowerCase());
          if (note.type === 'note-img' || note.type === 'note-video')
            return note.info.title
              .toLowerCase()
              .contains(this.searchBy.toLowerCase());
          if (note.type === 'note-todos')
            return note.info.todos.forEach((todo) =>
              todo.txt.toLowerCase().contains(this.searchBy.toLowerCase())
            );
        });
      var fiilterdNotes = this.notes.filter(
        (note) => note.type === this.filterBy
      );
      return fiilterdNotes.filter((note) => note.isPinned);
    },
    unpinnedNotesToShow() {
      if (!this.filterBy || !this.searchBy)
        return this.notes.filter((note) => !note.isPinned);
      if (this.searchBy)
        return this.notes.filter((note) => {
          if (note.type === 'note-text')
            return note.info.txt
              .toLowerCase()
              .contains(this.searchBy.toLowerCase());
          if (note.type === 'note-img' || note.type === 'note-video')
            return note.info.title
              .toLowerCase()
              .contains(this.searchBy.toLowerCase());
          if (note.type === 'note-todos')
            return note.info.todos.forEach((todo) =>
              todo.txt.toLowerCase().contains(this.searchBy.toLowerCase())
            );
        });
      var fiilterdNotes = this.notes.filter(
        (note) => note.type === this.filterBy
      );
      return fiilterdNotes.filter((note) => !note.isPinned);
    },
    // notesToShow() {
    //   return this.notes;
    // },
  },
  components: {
    noteList,
    noteFilter,
    noteAdd,
  },
};
