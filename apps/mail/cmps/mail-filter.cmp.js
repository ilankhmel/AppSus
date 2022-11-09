export default {
    template: `
        <section class="mail-filter">
            <input 
                @input="filter"
                v-model="filterBy.name" 
                type="text" 
                placeholder="Search" />
                
            <button @click="setIsRead(true)">Read</button>
            <button @click="setIsRead(false)">Unread</button>
            <button @click="setIsRead('')">All</button>
            <!-- <pre>{{ filterBy }}</pre> -->

        </section>
    `,
    data(){
        return {
            filterBy:{
                name: '',
                isRead: '',
            }
        }
    },
    methods: {
        filter(){
            this.$emit('filter', this.filterBy) 
        },

        setIsRead(boolean){
            this.filterBy.isRead = boolean
            this.filter()
        }
    }


}