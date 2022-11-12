import mailCompose from './mail-compose.cmp.js'
import { eventBus } from '../../../services/event-bus.service.js'
export default {
    template: `
    <section class="folder-filter" :class="hamburgerClass">
        <mail-compose></mail-compose>
        <button @click="setFolder('inbox')"><i class="fa-solid fa-inbox"></i> Inbox</button>
        <button @click="setFolder('trash')"><i class="fa-solid fa-trash"></i> Trash</button>
        <button @click="setFolder('draft')"><i class="fa-solid fa-ruler"></i> Draft</button>
        <button @click="setFolder('sent')"><i class="fa-solid fa-paper-plane"></i> Sent</button>
        <button @click="setFolder('star')"><i class="fa-solid fa-star"></i></i> Starred</button>
    </section>
    `,
    data(){
        return{
            folder: null,
            isShown: false,
        }
    },

    created(){
        eventBus.on('toggleStyle', this.toggleStyle)
    },

    methods:{
        toggleStyle(){
            this.isShown = !this.isShown
            console.log(this.isShown);
        },

        setFolder(str){
            this.folder = str
            console.log(this.folder);
            this.$emit('setfolder', this.folder)
            this.$router.push('/mail')
        },

    },
    computed: {
        hamburgerClass(){
            return (this.isShown) ? 'shown' : ''
        }

    },

    components: {
        mailCompose,
    }

}