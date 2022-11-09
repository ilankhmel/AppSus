import { noteService } from '../services/note.service.js';

import noteList from '../cmps/note-list.cmp.js';

export default {
  name: 'keep-app',
  template: `
    <section v-if="notes" class="keep-app">
      <div class="">
        <note-list :notes="notes"/>   
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
      console.log();
    });
  },
  computed: {
    // notesToShow() {
    //   return this.notes;
    // },
  },
  components: {
    noteList,
  },
};
