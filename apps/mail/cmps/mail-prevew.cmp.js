export default {
    props:['mail'],
    template: `
        <article class="mail-preview"  @click="mailOpened" :style="prevStyle">
            <!-- <pre>{{ mail }}</pre> -->
            <h2>{{ mail.from }}</h2>
            <h3>{{ mail.body }}</h3>
            <p>{{ formatDate }}</p>
        </article>
    `,

    computed:{
        prevStyle(){
            return (this.mail.isRead) ? {backgroundColor: '#D3D3D3'} : {backgroundColor: 'white'}
        },
      
        formatDate(){
            return new Date(this.mail.sentAt).toLocaleDateString()
        },
    
    }
    
}