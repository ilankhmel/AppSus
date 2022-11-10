export default {
  name: 'note-video',
  template: `
      <div>
          <div v-if="!edit" class="note-desc">
              <iframe width="240" :src="formattedUrl" />
              </iframe>
              <div class="content-container">
                  <h2>{{info.title}}</h2>
                  <i class="fab fa-youtube note-type"></i>
              </div>
          </div>
          <div v-else class="note-edit flex column align-center">
               <input type="text" @keyup.enter="confirmEdit" v-model="url">
               <button @click="confirmEdit">confirm</button>
          </div>
      </div>
            `,
  props: ['info', 'edit'],
  data() {
    return {
      url: this.info.url || '',
    };
  },
  methods: {
    confirmEdit() {
      this.$emit('doneEditSrc', false, this.url);
    },
  },
  computed: {
    formattedUrl() {
      return this.url.replace('watch?v=', 'embed/');
    },
  },
};
