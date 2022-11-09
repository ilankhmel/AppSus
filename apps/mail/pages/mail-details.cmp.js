import { mailService } from '../../mail/services/mail.service.js'
export default {
    template: `
      <section v-if="mail" class="mail-details">
          <button v-if="!mail.trashed" @click="trashMail" class="delete-mail-btn">Trash</button>
          <div v-else>
            <button @click="untrashMail">Untrash</button>
            <button @click="deleteMail">Delete Permanently</button>
          </div>
          <router-link to="/mail">Back</router-link>
            <!-- <hr /> -->
            <!-- <h1>Detals</h1> -->
            <!-- <pre>{{ mail }}</pre> -->
            <h1>Messege from: {{ mail.from }}</h1>
            <h2>Subject: {{ mail.subject }}</h2>
            <p>{{ mail.body }}</p>
            <!-- <h2>{{ car.vendor }}</h2>
            <h3>{{ car.maxSpeed }}</h3>
            <img :src="imgUrl" alt="" @error="imgValid=false" /> -->
            <!-- <button @click="$emit('close')">Close</button> -->
            
            <!-- <hr /> -->
            <!-- <router-link to="/car">Back</router-link> -->
        </section>
        <h3 v-else>Loading...</h3>
    `,
    data(){
        return {
            mail: null,
        }
    },
    created() {
        this.loadMail()
    },
    methods: {
        loadMail() {
            mailService.get(this.mailId)
                .then(mail => {
                    this.mail = mail
                    console.log(mail);
                })
        },

        trashMail(){
            
            mailService.get(this.mail.id)
            .then(mail => {
                console.log(mail);      
                this.mail.trashed = true
                this.$emit('trashed', mail)
            }) 
        },
        untrashMail(){
            mailService.get(this.mail.id)
            .then(mail => {
                this.mail.trashed = false
                this.$emit('untrashed', mail)
            }) 
        },

        deleteMail(){
            this.$emit('deleted', this.mail.id)

            // mailService.remove(this.mail.id)
            //     .then(mail => {
                    
            //         this.$router.push('/mail')
            //     })
        }
    },
    computed: {
        mailId() {
            return this.$route.params.id
        }
    },

    watch: {
        mail:{
            handler(){
                this.loadMail()
            }
        }
    }
}