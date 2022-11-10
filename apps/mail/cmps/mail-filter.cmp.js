export default {
    template: `
        <section class="mail-filter">
            <img class="logo" src="https://upload.wikimedia.org/wikipedia/commons/a/ab/Gmail2020.logo.png" alt="" />
            <button @click="" class="hamburger"><i class="fa-solid fa-bars"></i></button>
            <input 
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search" />
                <div class="sort-container" :class="dropStyle">
                    <button @click="setIsRead(true)">Read</button>
                    <button @click="setIsRead(false)">Unread</button>
                    <button @click="setIsRead('')">All</button>
                    <!-- <pre>{{ filterBy }}</pre> -->
        
                    <label for="sort">Sort By:</label>
                    <select @change="setSort" name="sort" id="sort">
                        <option value="subject">Subject</option>
                        <option value="date">Date</option>
                    </select>
                </div>
            <button @click="isShown = !isShown" class="drop-down"><i class="fa-solid fa-gear"></i></button>
            </section>
    `,
    data(){
        return {
            filterBy:{
                name: '',
                isRead: '',
                sort: "",
            },
            isShown: false,
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy) 
        },

        setIsRead(boolean){
            this.filterBy.isRead = boolean
            this.filter()
        },

        setSort(ev){
            var value = ev.target.options[ev.target.options.selectedIndex].text
            this.filterBy.sort = value
            this.filter()
        }
    },

    computed: {
        dropStyle(){
           return (this.isShown) ? 'shown' : ''
        }
    }


}