import notePreview from './note-preview.cmp.js';
// import drag from '../../../lib/v-drag.js';

export default {
  props: ['notes'],
  template: `
    <div v-if="notes">
        <!-- <div class="note-container" v-for="(note,idx) in notes" :key="idx"> -->
         
            <h3 :class="notesHeader"> {{ notesHeader }} </h3>
      
        <!-- <draggable v-bind="dragOptions" class="drag-zone" tag="div" :notes="notes"  @start="drag=true" @end="drag=false">
                    <transition-group class="transition-container flex wrap" type="transition"  :name="!drag ? 'flip-list' : null"> -->
          <div class="note-container" v-for="(note,idx) in notes" :key="idx">
               <note-preview :note="note"/>            
          </div>
                    <!-- </transition-group>
            </draggable>   -->
            <!-- <div v-drag> <h1>hiii</h1></div>   -->
         <!-- <{{note}}> -->
            <!-- <note-preview :note="note"/>  -->
        <!-- </div> -->
    </div>
  `,
  data() {
    return {
      drag: false,
      note: this.notes,
    };
  },
  computed: {
    notesHeader() {
      if (this.notes[0].isPinned) return 'pinned';
      else if (!this.notes[0].isPinned) return 'others';
      else return '';
    },
    // dragOptions() {
    //   return {
    //     animation: 300,
    //     group: 'description',
    //     disabled: false,
    //     ghostClass: 'ghost',
    //   };
    // },
  },
  components: {
    notePreview,
  },
};

// const drag = require('v-drag');
// Vue.use(drag, {
//   // global configuration
// });
