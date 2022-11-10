export default {
  name: 'note-filter',
  template: `
        <nav class="notes-filter flex align-center">
            <div class="search-notes">
                <button @click.stop="search" > <i class="fas fa-search"></i> </button>
                <input type="search" @keyup.enter.prevent="search" @change.stop="search" placeholder="Search Title" v-model="searchInput">
                <select @change="setFilterBy">
                        <option value=""> Show all </option>
                        <option value="noteImg"> Images </option>
                        <option value="noteText"> Text </option>
                        <option value="noteTodos"> Todos </option>
                        <option value="noteVideo"> Video </option>
                    </select>
            </div>
        </nav>
    `,
  data() {
    return {
      searchInput: '',
    };
  },
  methods: {
    search() {
      this.$emit('search', this.searchInput);
    },
    setFilterBy(event) {
      this.$emit('setFilterBy', event.target.value);
    },
  },
};
