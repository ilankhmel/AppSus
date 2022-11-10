import { eventBus } from "../../../services/event-bus.service.js"
export default {
    props:['mail'],
    template: `
        <article class="mail-preview"  @click="mailOpened" :style="prevStyle">
            <!-- <pre>{{ mail }}</pre> -->
            <span @click.stop.prevent="starMail" :style="starStyle"><i class="fa-solid fa-star"></i></span>
            <span @click.stop.prevent="toggleRead"><i :class="envelopeType"></i></i></span>
            <h2>{{ mail.name }}</h2>
            <!-- <h3>{{ mail.subject }}</h3> -->
            <p>{{ mail.body }}</p>
            <p>{{ formatDate }}</p>
        </article>
    `,
    data(){
       return{
         isStarred: false,
        }
    },

    computed:{
        prevStyle(){
            return (this.mail.isRead) ? {backgroundColor: '#EAF1FB'} : {backgroundColor: 'white'}
        },
      
        formatDate(){
            return new Date(this.mail.sentAt).toLocaleDateString()
        },

        starStyle(){
            return (this.mail.isStarred) ? {color: 'orange'} : {color: 'black'}
        },

        envelopeType(){
           return (this.mail.isRead) ? "fa-solid fa-envelope-open" : "fa-solid fa-envelope"
        },
    
    },
    methods: {
        starMail(){
            // this.isStarred = !this.isStarred
            this.mail.isStarred = !this.mail.isStarred
            eventBus.emit('saveRefresh', this.mail)

        },

        toggleRead(){
            this.mail.isRead = !this.mail.isRead
            eventBus.emit('saveRefresh')
        }
    },

    
}