export default {
  name: 'note-text',
  props: ['info', 'edit'],
  template: `
      <div class="text-container">
              <div v-if="!edit">
                  <h3>{{info.txt}}</h3>
                  <i class="fas fa-font note-type"></i>
              </div>
              <div v-else class="note-edit flex column align-center">
                  <input v-model="txt" @keyup.enter="confirmEdit" type="text" />
                  <button @click.stop="confirmEdit"> Confirm </button>
              </div>
      </div>
        `,
  data() {
    return {
      txt: this.info.txt || '',
    };
  },
  methods: {
    confirmEdit() {
      this.$emit('doneEditText', false, this.txt);
    },
  },
  computed: {},
};
