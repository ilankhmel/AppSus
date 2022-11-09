import notePreview from './note-preview.cmp.js';

export default {
  props: ['notes'],
  template: `
    <div v-if="notes">
        <div class="note-container" v-for="(note,idx) in notes" :key="idx">
            <note-preview :note="note"/> 
        </div>
    </div>
  `,
  data() {
    return {
      notes: this.notes,
    };
  },
  components: notePreview,
};
